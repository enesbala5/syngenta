import { db } from '$lib/services/db';
import type { RequestHandler } from './$types';

const checkIfEmailSubscribed = async (email: string) => {
	const emailSubscription = await db.emailSubscription.findUnique({
		where: {
			email: email,
		},
	});

	if (emailSubscription === null) {
		return false;
	} else {
		return true;
	}
};

export const GET: RequestHandler = async ({ url }) => {
	const email = url.searchParams.get('email');
	if (!email) return new Response('false');

	const response = await checkIfEmailSubscribed(email);

	return new Response(String(response));
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const email = data.email;

	// Check that the email is not already subscribed
	const isSubscribed = await checkIfEmailSubscribed(email);

	if (isSubscribed) {
		return new Response(
			JSON.stringify({
				status: 500,
				message: 'Email already subscribed',
			}),
			{
				status: 200,
			},
		);
	}

	await db.emailSubscription.create({
		data: {
			email: email,
		},
	});

	return new Response('true');
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const email = data.email;

	// Check that the email is not already subscribed
	const isSubscribed = await checkIfEmailSubscribed(email);

	if (!isSubscribed) {
		return new Response(
			JSON.stringify({
				status: 500,
				message: 'Email is not subscribed',
			}),
			{
				status: 200,
			},
		);
	}

	await db.emailSubscription.delete({
		where: {
			email: email,
		},
	});

	return new Response('true');
};
