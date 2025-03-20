import type { ServerInit } from '@sveltejs/kit';
import { authRedirects, initialRedirects } from '$lib/data/redirects';
import { building } from '$app/environment';
import type { FetchFunction, PageUser } from '$lib/types/generic';
import { redirect, type Handle } from '@sveltejs/kit';
import type { Middleware } from 'openapi-fetch';
import client from '$lib/services/api';
import { route } from '$lib/services/routeHandler';


export const fetchUserInfo = async (session: string, fetchFn: FetchFunction): Promise<PageUser | undefined> => {
	// Fetch User Info
	// If the JWT Tokens are not set correctly (or at all), this will return a 401 error

	let currentUser: PageUser | undefined = undefined;

	try {
		if (building) return;

		const { data, error } = await client.GET('/api/User/userDetails', {
			headers: {
				'Content-Type': 'application/json',
			},
			// cache: 'reload',
		});

		if (!data || error) {
			throw new Error("Failed to login. Please try again." + error);
		}

		currentUser = data
	}
	finally {
		// console.log("currentUser", currentUser)
		return currentUser;
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	// Skip auth logic on Build to prevent infinite redirection in production mode
	if (building) return resolve(event);

	const session = event.cookies.get('session');
	const pathname = event.url.pathname;

	event.locals.session = session;

	const openAPIMiddleware: Middleware = {
		async onRequest({ request }) {
			request.headers.set('Authorization', `Bearer ${session}`);
			return request;
		},
	};

	client.use(openAPIMiddleware)

	// Initial redirect will occur if the route matches
	const initialRedirect = initialRedirects.find((redirect) => redirect.rule(pathname))

	// Eg: If there is a misspelled route, redirect to the correct one
	if (initialRedirect) {
		redirect(300, initialRedirect.redirect)
	}

	var labelWithTime = "fetchUserInfo - HOOKS" + Date.now();

	console.time(labelWithTime)
	const user = session ? await fetchUserInfo(session, event?.fetch) : undefined
	console.timeEnd(labelWithTime)

	// If user is signed in and the current path exists in the authRedirects.signedIn -> Redirect user to page
	if (user) {
		// Get redirect - if rule matches
		let redirectForSignedInUser = authRedirects.signedIn.find((redirect) => redirect.rule(pathname));

		// If there is a redirect -> Redirect user
		if (redirectForSignedInUser) {
			console.log('redirectForSignedInUser', redirectForSignedInUser)

			redirect(300, redirectForSignedInUser.redirect)
		}

		// TODO: Update types once they are generated from the OpenAPI spec
		event.locals.user = user

		const response = await resolve(event);
		response.headers.set('Authorization', `Bearer ${session}`);

		return response;
	}

	// If user is signed out and the current path exists in the authRedirects.signedOUt -> Redirect user to page
	const redirectForSignedOutUser = authRedirects.signedOut.find((redirect) => redirect.rule(pathname))

	// If there is a redirect for signed out user -> Redirect user
	if (!user && redirectForSignedOutUser) {
		redirect(300, redirectForSignedOutUser.redirect)
	}

	return await resolve(event)
};

// export const init: ServerInit = async () => {

// }