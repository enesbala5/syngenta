import { languageOptions } from '$lib/components/custom/general/LanguagePicker/logic';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const preloadImageUrls = languageOptions.map(
		(languageOption) => `https://flagcdn.com/${languageOption.countryCode.toLowerCase()}.svg`
	);

	return {
		language: locals.language,
		preloadImageUrls,
		user: locals.user,
	};
};
