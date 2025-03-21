<script lang="ts">
	import WeatherDisplay from '$lib/components/custom/general/WeatherDisplay/WeatherDisplay.svelte';
	import * as Card from '$lib/components/ui/card';

	import type { BackendSchema } from '$lib/types/generic';
	import { cn } from '$lib/utils';

	interface Props {
		content: BackendSchema['WeatherContent'];
	}

	const { content }: Props = $props();
</script>

<div
	class={cn(
		'flex size-full flex-col items-start rounded-md bg-gradient-to-tr from-neutral-50 to-neutral-100 p-4'
	)}
>
	{#if content?.subtitle}
		<p class="mb-2 text-sm text-muted-foreground">{content?.subtitle}</p>
	{/if}

	<div class="flex items-center gap-4">
		{#if content.icon}
			<Card.Root class="h-24 w-24 !p-2">
				<WeatherDisplay icon={content.icon} class="object-fill " />
			</Card.Root>
		{/if}

		<div class="text-left">
			{#if content.temperature !== undefined && content.temperature !== null}
				<div class="weather-temp text-4xl font-bold">
					{content.temperature.toFixed(1)}°C
				</div>
			{/if}

			{#if content.location}
				<p class="text-sm text-muted-foreground">{content.location}</p>
			{/if}
		</div>
	</div>

	{#if content?.title}
		<div class="mt-3 flex w-full flex-col items-start gap-1 pb-2">
			<p class="font-mono text-xs text-muted-foreground">Title:</p>
			<p class=" text-sm">{content?.title}</p>
		</div>
	{/if}

	{#if content.description}
		<div class="mt-3 flex w-full flex-col items-start gap-1">
			<p class="font-mono text-xs text-muted-foreground">Description:</p>
			<p class=" text-sm">{content.description}</p>
		</div>
	{/if}

	<div class="mt-4 grid w-full grid-cols-2 gap-4">
		{#if content.humidity !== undefined && content.humidity !== null}
			<div class="rounded-md bg-neutral-100 p-2">
				<p class="text-xs text-muted-foreground">Humidity</p>
				<p class="text-lg font-medium">{content.humidity}%</p>
			</div>
		{/if}

		{#if content.wind_speed !== undefined && content.wind_speed !== null}
			<div class="rounded-md bg-neutral-100 p-2">
				<p class="text-xs text-muted-foreground">Wind Speed</p>
				<p class="text-lg font-medium">{content.wind_speed} km/h</p>
			</div>
		{/if}
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
