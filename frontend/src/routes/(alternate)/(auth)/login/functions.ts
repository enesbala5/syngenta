import client from '$lib/services/api';
import type { FetchFunction } from '$lib/types/generic';

export const loginToAccount = async (
	username: string,
	password: string,
	fetchFn: FetchFunction
): Promise<string | undefined> => {
	// Fetch User Info
	// If the JWT Tokens are not set correctly (or at all), this will return a 401 error
	let session: string | undefined = undefined;

	try {
		const { data, error, response } = await client.POST('/api/Auth/login', {
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'reload',
			body: {
				username: username,
				password
			},
			fetch: fetchFn,
			mode: 'no-cors',
			signal: AbortSignal.timeout(10000),
		});

		if (error) throw error;

		console.log(data, error, response)

		if (typeof (data as any)?.token === 'string') session = (data as any)?.token
	} catch (error) {
		console.error(error);
		session = undefined;
	}

	return session;
};
