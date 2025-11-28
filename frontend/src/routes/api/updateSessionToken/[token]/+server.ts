import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params, cookies, url }) => {
	// if (!params.token) {
	// 	error(400, 'params.token is required');
	// }

	cookies.set('session', String(params.token), {
		path: url.pathname,
		// httpOnly: true,
		// sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30
	});

	// return new Response('Success');
	return redirect(302, '/');
};