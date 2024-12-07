import { RequestMethod } from '$lib/data/generic';
import { route } from '$lib/services/routeHandler';
import type { RequestHandler } from '@sveltejs/kit';

type EmailSubscriptionAction = 'unsubscribe' | 'resubscribe';

type Actions = {
	[key in EmailSubscriptionAction]: (email: string, fetch: Fetch) => Promise<boolean>;
};

type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

const actions: Actions = {
	unsubscribe: async (email: string, fetch: Fetch) => {
		console.log({ email });

		await fetch(route('/api/actions/emailSubscription'), {
			method: RequestMethod.DELETE,
			body: JSON.stringify({ email }),
		});
		return true;
	},
	resubscribe: async (email: string, fetch) => {
		await fetch(route('/api/actions/emailSubscription'), {
			method: RequestMethod.POST,
			body: JSON.stringify({ email }),
		});
		return true;
	},
};

export const GET: RequestHandler = async ({ params, url, fetch }) => {
	const email = params.email;
	// check if "unsubscribe" param exists
	url.searchParams.forEach(async (value, key) => {
		if (value === 'true' && actions[key as EmailSubscriptionAction] && email) {
			const response: boolean = await actions[key as EmailSubscriptionAction](email, fetch);
		}
	});

	return new Response('true');
};
