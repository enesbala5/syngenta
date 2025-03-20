import { json, redirect } from '@sveltejs/kit';
import { route } from '$lib/services/routeHandler';
import { invalidateAll } from '$app/navigation';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('session', { path: '/' })

	return json({ success: true })
};