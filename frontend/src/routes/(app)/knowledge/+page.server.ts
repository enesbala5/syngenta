import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const key = 'temporaryId'

	let temporaryId = cookies.get(key)
	const fallbackValue = crypto.randomUUID();

	if (!temporaryId) {
		cookies.set(key, fallbackValue, {
			path: '/',
			// 1 Month
			maxAge: 60 * 60 * 24 * 30,
		})

		temporaryId = fallbackValue
	}

	return {
		user: locals?.user,
		temporaryId: temporaryId
	};
};
