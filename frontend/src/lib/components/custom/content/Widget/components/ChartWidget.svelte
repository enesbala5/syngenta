<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Card from '$lib/components/ui/card';

	import type { BackendSchema } from '$lib/types/generic';
	import client from '$lib/services/api';
	import Plot from 'svelte-plotly.js';
	import { AlertTriangleIcon } from 'lucide-svelte';
	import type { BaseWidgetComponentProps } from '../types';

	interface Props extends BaseWidgetComponentProps {
		content: BackendSchema['ChartContent'];
	}

	const { content, prefix, suffix }: Props = $props();

	const parseChartData = async (data?: string | null) => {
		if (!data) {
			throw new Error('No data provided');
		}

		// No parsing is actually needed turns out
		return data;
	};
</script>

<Card.Root
	class="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-background p-3 "
>
	{#await parseChartData(content?.data)}
		<Spinner />
	{:then data}
		<Plot
			{data}
			class=""
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
</Card.Root>
