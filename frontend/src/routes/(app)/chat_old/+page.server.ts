
import type { PageServerLoad } from "./$types.js";
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		user: locals?.user
	};
};

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

