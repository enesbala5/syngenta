// See https://svelte.dev/docs/kit/types#app.d.ts

import type { PageUser } from '$lib/types/generic';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			language: string;
			user: PageUser
			session: string | undefined;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
