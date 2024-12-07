import { authRedirects, initialRedirects } from '$lib/data/redirects';
import { lucia } from '$lib/services/auth';
import { db } from '$lib/services/db';
import { TokenBucket } from '$lib/services/rate-limit';
import type { FetchFunction, PageUser } from '$lib/types/generic';
import type { User } from '@prisma/client';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const bucket = new TokenBucket<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
	// Note: Assumes X-Forwarded-For will always be defined.
	const clientIP = event.request.headers.get("X-Forwarded-For");
	if (clientIP === null) {
		return resolve(event);
	}
	let cost: number;
	if (event.request.method === "GET" || event.request.method === "OPTIONS") {
		cost = 1;
	} else {
		cost = 3;
	}
	if (!bucket.consume(clientIP, cost)) {
		return new Response("Too many requests", {
			status: 429
		});
	}
	return resolve(event);
};

export const fetchUserInfo = async (session: string, fetchFn: FetchFunction): Promise<PageUser | undefined> => {
	// Fetch User Info
	// Request Example: user/list?PageNumber=1&PageSize=1&id=fdfasdfadfasdfas423342fdsf

	// // If the JWT Tokens are not set correctly (or at all), this will return a 401 error
	let currentUser: PageUser | undefined = await db.user.findFirst({
		where: {
			sessions: {
				some: {
					AND: [{
						id: session
					}, {
						expiresAt: {
							lt: new Date().getUTCDate().toString()
						}
					}]
				}
			}
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			username: true,
			baseCreditAmount: true
		}
	}) ?? undefined


	return currentUser
};


const authHandle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	const pathname = event.url.pathname;

	// Initial redirect will occur if the route matches
	const initialRedirect = initialRedirects.find((redirect) => redirect.rule(pathname))

	// Eg: If there is a misspelled route, redirect to the correct one
	if (initialRedirect) redirect(301, initialRedirect.redirect)

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	try {
		const { session, user } = await lucia.validateSession(sessionId);

		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		}

		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		}

		event.locals.session = session;

		// If user is signed in and the current path exists in the authRedirects.signedIn -> Redirect user to page
		if (user) {
			// Get redirect - if rule matches
			let redirectForSignedInUser = authRedirects.signedIn.find((redirect) => redirect.rule(pathname));

			// If there is a redirect -> Redirect user
			if (redirectForSignedInUser) {
				redirect(301, redirectForSignedInUser.redirect)
			}

			event.locals.user = user;

			const response = await resolve(event);
			return response;
		}
		else {
			// If user is signed out and the current path exists in the authRedirects.signedOUt -> Redirect user to page
			const redirectForSignedOutUser = authRedirects.signedOut.find((redirect) => redirect.rule(pathname))

			// If there is a redirect for signed out user -> Redirect user
			if (!user && redirectForSignedOutUser) {
				redirect(301, redirectForSignedOutUser.redirect)
			}
		}
	}
	catch (e) {
		console.error("Error", e)
	}


	return await resolve(event)
};

export const handle = sequence(rateLimitHandle, authHandle);