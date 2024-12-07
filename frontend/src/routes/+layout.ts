import { loadTranslations, locale } from '$lib/lang';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data }) => {
	// ----------------------------------
	// i18n
	// ----------------------------------
	if (data !== null && data !== undefined) {
		const { pathname } = url;

		const defaultLocale = data?.language;
		const initLocale = locale.get() || defaultLocale; // set default if no locale already set

		await loadTranslations(initLocale, pathname); // keep this just before the `return`

		return {
			user: data?.user,
			url: url.pathname,
			language: data.language
		};
	}
};
