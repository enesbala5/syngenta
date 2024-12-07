import { company } from '$lib/data/generic';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const name = `Developed by: ${company.staff.cofounder} & ${company.staff.ceo}`;
	return new Response(String(name));
};
