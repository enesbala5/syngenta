import { fail, redirect, type Action } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loginToAccount } from './functions';

export function load({ locals }) {
	if (locals?.user) redirect(300, '/');
}

const login: Action = async ({ cookies, request, fetch }) => {
	const data = await request.formData();

	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		console.error('Invalid email or password')
		
		return fail(400, { message: 'Invalid email or password' });
	}

	const session: string | undefined = await loginToAccount(username, password, fetch);

	if (!session) {
		return fail(400, { message: 'Invalid email or password' });
	}

	cookies.set('session', session, {
		path: '/',
		// httpOnly: true,
		// sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30
	});

	redirect(300, '/');
}

export const actions: Actions = { login };
