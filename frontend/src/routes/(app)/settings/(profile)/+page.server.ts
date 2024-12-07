import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, error, fail, redirect } from "@sveltejs/kit";
import { profileFormSchema } from "./profile-form.svelte";
import type { PageServerLoad } from "./$types.js";
import type { z } from 'zod';
import { db } from '$lib/services/db';
import { route } from '$lib/services/routeHandler';

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user

	if (!user) redirect(300, route('/(auth)/login'))

	const data: ProfileFormSchema = {
		firstName: user.firstName ?? undefined,
		lastName: user.lastName ?? undefined,
		username: user.username ?? undefined,
		email: user.email,
	}

	return {
		form: await superValidate(data, zod(profileFormSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { fetch, locals } = event
		const form = await superValidate(event, zod(profileFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const user = await db.user.update({
			where: {
				id: locals.user?.id
			},
			data: {
				...form.data
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				username: true,
			}
		})

		if (!user) {
			setError(form, "User update went wrong")
			return { form }
		}

		form.data = {
			firstName: user.firstName ?? undefined,
			lastName: user.lastName ?? undefined,
			username: user.username ?? undefined,
			email: user.email ?? undefined
		};

		return { form };
	},
};
