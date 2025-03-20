<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import type { BackendSchema } from '$lib/types/generic';
	import client from '$lib/services/api';
	import Plot from 'svelte-plotly.js';
	import { AlertTriangleIcon } from 'lucide-svelte';

	interface Props {
		content: BackendSchema['ChartContent'];
	}

	const { content }: Props = $props();

	const parseChartData = async (data: string | null) => {
		if (!data) {
			throw new Error('No data provided');
		}

		return JSON.parse(data);
	};
</script>

{#await parseChartData(content.data)}
	<Spinner />
{:then data}
	<Plot
		{data}
		config={{
			showAxisRangeEntryBoxes: false,
			showAxisDragHandles: false,
			showSendToCloud: false,
			showEditInChartStudio: false,
			showLink: false,
			showSources: false,
			showTips: false,
			displaylogo: false,
			displayModeBar: false // this is the line that hides the bar.
		}}
	/>
{:catch error}
	<AlertTriangleIcon class="size-6" />
	<p class="text-sm text-muted-foreground">Loading widget...</p>
{/await}

{#if content.data}{:else}{/if}
