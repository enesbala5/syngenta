import type { Action, Actions, PageServerLoad } from './$types';
import { route } from '$lib/services/routeHandler';
import { fail, json, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { db } from '$lib/services/db';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/services/auth';
import { AuthProvider } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals?.user) redirect(301, route('/'))
};

const register: Action = async ({ request, cookies, fetch }) => {
	// Get form data and convert to object
	const formData = await request.formData();
	const { email, password } = Object.fromEntries(formData) as Record<string, string>

	if (!email || !password) {
		return fail(500, { message: 'Invalid email or password' });
	}

	const userId = generateId(15)
	const hashedPassword = await new Argon2id().hash(password)

	const existingUser = await db.user.findFirst({ where: { email } })

	if (existingUser && existingUser?.password) {
		const validPassword = await new Argon2id().verify(existingUser.password, password);
		if (!validPassword) {
			return fail(400, { message: "Incorrect email or password" })
		}
		const session = await lucia.createSession(existingUser.id, [])
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

	const user = await db.user.create({
		data: {
			id: userId,
			email: email,
			password: hashedPassword,
			provider: AuthProvider.Email
		}
	})

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes
	});

	redirect(300, route('/'))
};

export const actions: Actions = { register };
