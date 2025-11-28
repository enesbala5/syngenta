
import type { PageServerLoad } from "./$types.js";
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import client from '$lib/services/api/index.js';
import { authToken } from '$lib/index.js';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: widgets, error } = await client.GET('/widgets/', {
		headers: {
			'Authorization': `Bearer ${authToken}`
		}
	})

	return {
		widgets,
		user: locals?.user
	};
};

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});
