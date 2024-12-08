
import type { PageServerLoad } from "./$types.js";
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import client from '$lib/services/api/index.js';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: dashboardData, error } = await client.GET('/metrics')

	return {
		dashboardData,
		user: locals?.user
	};
};

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

