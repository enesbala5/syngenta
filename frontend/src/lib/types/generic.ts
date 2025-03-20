export type FetchFunction = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

export interface RedirectInterface {
	rule: (pathname: string) => boolean;
	redirect: string;
}

export type PageUser = Pick<User, 'id' | 'name' | 'username' | 'email'>
