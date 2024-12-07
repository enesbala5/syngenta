import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		language: locals.language,
		user: locals.user,
	};
};
