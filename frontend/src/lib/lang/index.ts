import i18n, { type Config, type Parser } from 'sveltekit-i18n';
import lang from './lang.json';
import { route } from '$lib/services/routeHandler';

export const config: Config = {
	translations: {
		en: { lang },
		sq: { lang },
	},
	fallbackLocale: 'en',
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default,
		},
		{
			locale: 'sq',
			key: 'common',
			loader: async () => (await import('./sq/common.json')).default,
		},
		{
			locale: 'en',
			key: 'home',
			routes: [route('/(app)/(homepage)')],
			loader: async () => (await import('./en/home.json')).default,
		},
		{
			locale: 'sq',
			key: 'home',
			routes: [route('/(app)/(homepage)')],
			loader: async () => (await import('./sq/home.json')).default,
		},
		{
			locale: 'en',
			key: 'contact',
			routes: [route('/(app)/contact')],
			loader: async () => (await import('./en/contact.json')).default,
		},
		{
			locale: 'sq',
			key: 'contact',
			routes: [route('/(app)/contact')],
			loader: async () => (await import('./sq/contact.json')).default,
		},
	],
};

export const { t, loading, locales, locale, loadTranslations, setLocale } = new i18n<Parser.Params<{ item?: string }>>(
	config
);

loading.subscribe(($loading: boolean | undefined) => $loading);
