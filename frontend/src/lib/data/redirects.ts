// This array contains the redirects that will be applied to the initial request
// For example when user writes a character wrong it will make sure that the user is redirected to the correct path

import { route } from '$lib/services/routeHandler';
import type { RedirectInterface } from '$lib/types/generic';

// ---
export const initialRedirects: RedirectInterface[] = [
	{
		rule: ((pathname) => pathname.toLowerCase().startsWith("/signin")),
		redirect: route('/(auth)/login'),
	},
	{
		rule: ((pathname) => pathname.toLowerCase().startsWith("/signup")),
		redirect: route('/(auth)/register'),
	},
];

// Redirects depending on whether the user is signed in or not
// ---

interface AuthDependantRedirects {
	signedIn: RedirectInterface[];
	signedOut: RedirectInterface[];
}

// Redirects based on authentication status
export const authRedirects: AuthDependantRedirects = {
	signedOut: [
		{
			rule: ((pathname) => pathname !== route('/(auth)/login') && pathname !== route('/(auth)/register') && pathname !== route('/(app)/(homepage)')),
			redirect: route('/(auth)/login'),
		},
	],
	signedIn: [
		{
			rule: ((pathname) => pathname === route('/(auth)/login') && pathname === route('/(auth)/register')),
			redirect: route('/(app)/(homepage)'),
		},
	],
};
