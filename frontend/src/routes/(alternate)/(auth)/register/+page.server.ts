import type { Action, Actions, PageServerLoad } from './$types';
import { route } from '$lib/services/routeHandler';
import { fail, json, redirect } from '@sveltejs/kit';
import client from '$lib/services/api';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals?.user) redirect(300, route('/'))
};

const register: Action = async ({ request, cookies, fetch }) => {
	let session: string | undefined;

	// Get form data and convert to object
	const formData = await request.formData();

	console.log({ formData })

	try {
		// Make API request
		const response = await client.POST('/api/Auth/register', {
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'reload',
			// mode: 'no-cors',
			body: {
				...Object.fromEntries(formData) as any,
				isCreator: true
			},
			fetch,
			signal: AbortSignal.timeout(10000),
		})

		const { data, error, response: res } = response;

		console.log(data, error, res)

		// @ts-ignore
		if (error || !data || !data?.token) {
			const message = 'Nuk arritem të krijonim llogarine tuaj. Ju lutem provoni përsëri.'

			console.error(message)

			if (error) {
				delete error?.['$id'];
				delete error?.['status'];

				return fail(400, { message: error })
			}
			return fail(400, { message })
		}

		session = (data as any)?.token;

		if (!session) {
			const message = "Failed to register your account.Please try again."
			console.error(message)

			return fail(400, { message })
		}

		cookies.set('session', session, {
			path: '/',
			// httpOnly: true,
			// sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		});

		redirect(300, route('/'))
	}
	catch (e) {
		return fail(400, { message: "Something went wrong. Please try again." + e })
	}
};

export const actions: Actions = { register };
