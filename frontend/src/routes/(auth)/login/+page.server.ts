import { fail, redirect, type Action } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/services/db';
import { lucia } from '$lib/services/auth';
import { Argon2id } from 'oslo/password';
import { AuthProvider, type User } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals?.user) redirect(302, '/');
}

const getUser = async (emailProvided: boolean, emailOrUsername: string) => {
	try {

		if (emailProvided) {
			const user: User | null = await db.user.findUnique({
				where: {
					email: emailOrUsername,
					provider: AuthProvider.Email
				},
			});
			return user;
		}

		const user: User | null = await db.user.findUnique({
			where: {
				username: emailOrUsername,
				provider: AuthProvider.Email
			},
		});
		return user;
	}
	catch (e) {
		return null;
	}
};

const login: Action = async ({ cookies, request, fetch }) => {
	const data = await request.formData();

	const emailOrUsername = data.get('username');
	const password = data.get('password');

	let emailProvided: boolean = emailOrUsername?.toString().includes('@') ?? false;

	if (typeof emailOrUsername !== 'string' || typeof password !== 'string' || !emailOrUsername || !password) {
		const message = 'Invalid username / email or password'

		console.error(message)
		return fail(400, { message });
	}

	const user: User | null = await getUser(emailProvided, emailOrUsername);

	if (!user || !user.password) {
		const message = 'Invalid username / email or password'

		console.error(message)
		return fail(400, { message: message })
	}

	const validPassword = await new Argon2id().verify(user.password, password);

	if (!validPassword) {
		return fail(400, { message: "Incorrect email or password" })
	}
	const session = await lucia.createSession(user.id, [])
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes
	})
 
	if (!session) {
		return fail(400, { message: 'Invalid email or password' });
	}

	redirect(300, '/');
}

export const actions: Actions = { login };
