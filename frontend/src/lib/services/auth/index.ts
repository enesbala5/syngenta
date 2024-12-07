import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient, type User } from "@prisma/client";
import type { PageUser } from '$lib/types/generic';
import { dev } from "$app/environment";
import { Lucia } from "lucia";


const client = new PrismaClient();

const adapter = new PrismaAdapter(client?.session, client?.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes: Partial<User>) => {
		return {
			email: attributes?.email,
			firstName: attributes?.firstName,
			lastName: attributes?.lastName,
			username: attributes?.username,
			baseCreditAmount: attributes?.baseCreditAmount
		} satisfies Partial<PageUser>
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	email: string
	username: string
}