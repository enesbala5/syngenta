import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { route } from '$lib/services/routeHandler';

export const GET: RequestHandler = async () => {
	redirect(307, route('/'));
};