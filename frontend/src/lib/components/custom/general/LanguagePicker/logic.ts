import type { CountryCode } from '$lib/data/countries';
import { route } from '$lib/services/routeHandler';
import { RequestMethod } from '$lib/data/generic';

export interface LanguageOption {
	name: string;
	countryCode: CountryCode;
	value: string;
	enabled?: boolean;
}

// Define the language options
export const languageOptions: LanguageOption[] = [
	{
		name: 'English',
		countryCode: 'US',
		value: 'en',
	},
	{
		name: 'German',
		countryCode: 'DE',
		value: 'de',
		enabled: false
	},
	{
		name: 'Italian',
		countryCode: 'IT',
		value: 'it',
		enabled: false
	},
	{
		name: 'Albanian',
		countryCode: 'AL',
		value: 'sq',
		enabled: false
	},
];

export const handleLanguageChange = async (countryValue: string) => {
	fetch(route('/(app)/post/[id]'), {
		method: RequestMethod.PUT,
		body: JSON.stringify({
			language: countryValue
		}),
	});
};
