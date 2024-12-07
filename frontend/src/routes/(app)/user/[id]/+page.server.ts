import { db } from '$lib/services/db';
import type { PageUser } from '$lib/types/generic';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = await db.user.findFirst({
		where: {
			OR: [
				{
					id: params.id,
				},
				{
					username: params.id,
				}
			]
		},
		include: {
			coverLetters: true
		},
	}) ?? undefined

	return {
		user
	};
};