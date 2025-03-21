import { route } from '$lib/services/routeHandler';
import { RequestMethod } from '$lib/data/generic';
import { toast } from 'svelte-sonner';

export interface LanguageOption {
	name: string;
	countryCode: string;
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
		name: 'Hindi',
		countryCode: 'IN',
		value: 'hi',
		enabled: false
	},
	{
		name: 'Portuguese',
		countryCode: 'PT',
		value: 'pt',
		enabled: false
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
	toast.message("Feature is coming soon. Thanks for your patience.")
	// fetch(route('/(app)/post/[id]'), {
	// 	method: RequestMethod.PUT,
	// 	body: JSON.stringify({
	// 		language: countryValue
	// 	}),
	// });
};
