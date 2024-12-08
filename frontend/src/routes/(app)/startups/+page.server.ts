import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import client from '$lib/services/api';
import type { TableResponse } from '$lib/components/ui/types';

const getStartups = async (pageNumber: number, filters: string | null): Promise<TableResponse> => {

	try {
		const parsedFilters: Record<string, any> = JSON.parse(filters ?? '{}')

		const { data, error } = await client.POST('/startups/', {
			body: {
				pageNumber,
				pageSize: 10000,
				filters: parsedFilters as any
			}
		})

		if (error || !data) throw error

		return data as any
	}
	catch (error) {
		throw error;
	}
}

export const load: PageServerLoad = async ({ url, locals }) => {
	const pageNumber = url.searchParams.get('pageNumber')
	const filters = url.searchParams.get('filters');

	return {
		startups: await getStartups(pageNumber ? Number(pageNumber) : 1, filters),
		user: locals?.user,
	}
	// if (locals?.user) redirect(302, '/');
}
