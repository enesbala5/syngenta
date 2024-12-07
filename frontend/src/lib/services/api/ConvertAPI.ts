import { PUBLIC_CONVERTAPI_URL } from '$env/static/public';
import type { paths } from '$lib/types/api/ConvertAPI';
import createClient from "openapi-fetch";

const ConvertAPI = createClient<paths>({ baseUrl: PUBLIC_CONVERTAPI_URL });
export default ConvertAPI;