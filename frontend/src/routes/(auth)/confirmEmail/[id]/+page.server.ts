import { db } from '$lib/fetching/db';
import { route } from '$lib/services/routeHandler';
import type { Error, UserActionResponse } from '$lib/types/generic';

import type { User } from '@prisma/client';
import { error } from '@sveltejs/kit';


export const load = async ({ params, fetch }: any) => {
	// Get resetPassword details from params
	const { id } = params;

	// Get details from database
	let response: Error | UserActionResponse;

	const userAction = await db.userAction.findUnique({
		where: {
			id: id,
		},
		include: {
			user: true,
		},
	});

	if (!userAction || !userAction?.actionExpiryTime) {
		error(404, 'Confirm Email link not valid');
	}

	// Check that user action is not expired
	// -> Get current epoch time
	const now = new Date().getTime();
	// -> Compare to expiry
	const valid = userAction?.actionExpiryTime > now;

	if (!valid) {
		error(404, 'Confirm Email link is expired');
	}

	await fetch(route('/api/user/confirmEmail'), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			uid: userAction.user.uid,
			userActionId: userAction.id,
		}),
	})

	response = {
		userActionId: userAction.id,
		// ---
		email: userAction.user.email,
		uid: userAction.user.uid,
		valid: valid,
		user: userAction.user,
	};

	return response;
};
