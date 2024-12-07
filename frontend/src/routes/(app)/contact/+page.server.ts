import type { PageServerLoad } from "./$types.js";
import { fail, superValidate } from "sveltekit-superforms";
import { formSchema, type FormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import type { z } from 'zod';
import { returnNameOrPlaceholder } from '$lib/utils.js';
import { EmailHandler } from '$lib/services/emailService/index.js';
import type { Actions } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;
	const data: Partial<z.infer<FormSchema>> = {
		fullName: returnNameOrPlaceholder(user?.firstName, user?.lastName),
		email: user?.email,
	}

	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const data = form.data;

		const emailService = new EmailHandler(data.email);

		await emailService.sendEmail('emailSubscribed');

		return {
			form,
		};
	},
};