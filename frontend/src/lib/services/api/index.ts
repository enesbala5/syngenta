import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { paths } from '$lib/types/backend';
import createClient from "openapi-fetch";

const client = createClient<paths>({ baseUrl: PUBLIC_BACKEND_URL });
export default client;