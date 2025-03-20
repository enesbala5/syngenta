<script lang="ts">
	import WeatherDisplay from '$lib/components/custom/general/WeatherDisplay/WeatherDisplay.svelte';
	import type { BackendSchema } from '$lib/types/generic';
	import { cn } from '$lib/utils';

	interface Props {
		content: BackendSchema['WeatherContent'];
	}

	const { content }: Props = $props();
</script>

<div class={cn('size-full rounded-md bg-gradient-to-tr from-neutral-50 to-neutral-100')}>
	<h3 class="mb-2 text-xl font-medium">{content.title || 'Weather'}</h3>

	<WeatherDisplay icon={'moonrise'} class="object-fit h-48 w-48" />

	{#if content.location}
		<p class="text-sm text-muted-foreground">{content.location}</p>
	{/if}

	<div class="mt-3 flex items-center justify-between">
		<div class="weather-temp text-3xl font-bold">
			{content.temperature || '--'}°C
		</div>
	</div>

	<!-- {#if content.forecast}
		<div class="mt-4 grid grid-cols-5 gap-2">
			{#each content.forecast as forecast}
				<div class="forecast-day flex flex-col items-center">
					<span class="text-xs">{forecast.date.toLocaleDateString()}</span>
					<WeatherDisplay {...forecast} />
					<span class="text-xs font-medium">{forecast.temperature}°</span>
				</div>
			{/each}
		</div>
	{/if} -->
</div>
