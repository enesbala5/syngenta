<script lang="ts">
	import DataTable from '$lib/components/ui/data-table.svelte';
	import type { TableResponse } from '$lib/components/ui/types';
	import { columns } from './columns';

	interface Props {
		data: TableResponse;
	}

	let { data }: Props = $props();
</script>

<DataTable
	{columns}
	
	data={data}
	filters={data.filters}
	pageNumber={data.pageNumber}
	totalItems={data.totalItems}
/>
<pre>{JSON.stringify(data.data, null, 2)}</pre>
