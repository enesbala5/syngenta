<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import client from '$lib/services/api';
	import Plot from 'svelte-plotly.js';

	interface Props {
		id: string;
	}

	let { id } = $props();

	const getChartById = async (id: string) => {
		try {
			const { data, error } = await client.GET('/charts/{chart_id}', {
				params: {
					path: { chart_id: id }
				},
				headers: {
					'ngrok-skip-browser-warning': true
				}
			});

			if (error || !data) throw error;

			// const el: HTMLFrameElement = document.getElementById(id);
			// if (el) el?.contentDocument.write(data);

			// el?.appendChild(document?.createElement(data));

			return JSON.parse(data);
		} catch (e) {
			console.log(e);
			throw e;
		}
	};
</script>

{#await getChartById(id)}
	<div class="flex flex-col items-center justify-center gap-1.5 text-xs text-muted-foreground">
		<Spinner class="size-6" />
		<p>Loading Chart...</p>
	</div>
{:then data}
	<!-- <p>{dat}</p> -->
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
{:catch e}
	<p class="bg-destructive/5 py-4 text-center text-sm text-destructive">Something went wrong</p>
{/await}
