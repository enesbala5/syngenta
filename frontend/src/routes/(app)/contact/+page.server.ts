import type { PageServerLoad } from "./$types.js";
import { fail, superValidate } from "sveltekit-superforms";
import { formSchema, type FormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import type { z } from 'zod';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;
	
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

		return {
			form,
		};
	},
};