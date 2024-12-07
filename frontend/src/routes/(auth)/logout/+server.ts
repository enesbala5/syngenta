import { fail, json, redirect } from '@sveltejs/kit';
import { route } from '$lib/services/routeHandler';
import { invalidateAll } from '$app/navigation';
import type { RequestHandler } from './$types';
import { lucia } from '$lib/services/auth';


export const GET: RequestHandler = async ({ locals, cookies }) => {
	console.log("LKFJLKADJFLKDA")
	if (!locals.session) {
		throw fail(401);
	}

	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes
	});

	redirect(302, route('/(app)/(homepage)'));
};