import { GitHub, Google } from "arctic";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_PAGE_URL } from '$env/static/public';
import { route } from '../routeHandler';

const urls = {
	github: route('/(auth)/login/github/callback', {
		baseUrl: PUBLIC_PAGE_URL
	}),
	google: route('/(auth)/login/google/callback', {
		baseUrl: PUBLIC_PAGE_URL
	}),
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, urls.github);
export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, urls.google);