<script lang="ts">
	import { directionStyles, getRiskStyle } from '../data';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';
	import WeatherDisplay from '$lib/components/custom/general/WeatherDisplay/WeatherDisplay.svelte';
	import type { BackendSchema } from '$lib/types/generic';

	interface Props {
		content: BackendSchema['HarvestContent'];
	}

	const { content }: Props = $props();
	const directionStyle = $derived(directionStyles[content.direction ?? 'neutral']);

	// Function to get appropriate icon based on progress score
	function getHarvestIcon(progress: number): string {
		if (progress >= 90) return 'code-green';
		if (progress >= 75) return 'code-green';
		if (progress >= 50) return 'code-yellow';
		if (progress >= 25) return 'code-orange';
		return 'code-red';
	}

	const harvestIcon = $derived(getHarvestIcon(content.progress || 0));
</script>

<div
	class="flex w-full grow flex-col items-center bg-gradient-to-tr from-red-50 to-red-100 p-4 text-center"
>
	{#if harvestIcon}
		<Card.Root class="mb-4 size-28 !p-2">
			<WeatherDisplay icon={harvestIcon} class="object-fill " />
		</Card.Root>
	{/if}

	<h3 class="mb-2 text-xl font-medium">{content?.title || 'Harvest'}</h3>

	{#if content?.subtitle}
		<p class="text-sm text-muted-foreground">{content?.subtitle}</p>
	{/if}

	{#if content.change}
		<div class="mt-3 flex items-center gap-2">
			<span class="text-lg font-semibold">Harvest Forecast:</span>
			<span class={cn('text-lg font-bold', directionStyle?.text)}>
				{content.change?.amount}{content.change?.unit || ''}
			</span>
			<span class={cn('inline-block', directionStyle?.iconClass)}>
				<!-- Icon would go here -->
			</span>
		</div>
	{/if}

	<div class="mt-4 flex items-center gap-2">
		<div class="h-5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
			<div
				class={cn(
					'h-5 rounded-full bg-gradient-to-r',
					getRiskStyle(content.progress.amount).gradient
				)}
				style="width: {Math.min(content.progress.amount, 100)}%"
			></div>
		</div>
		<span class={cn('text-2xl', getRiskStyle(content.progress.amount).text)}>
			<!-- <i class={`wi wi-${harvestIcon}`}></i> -->
			<p>{content.progress.amount}{content.progress.unit}</p>
		</span>
	</div>

	<div class="h-5 rounded-full bg-gray-200 dark:bg-gray-700">
		<div
			class={cn(
				'h-5 rounded-full bg-gradient-to-r',
				getRiskStyle(content.progress.amount).gradient
			)}
			style="width: {Math.min(100, 100)}%"
		></div>
	</div>
	<div class="flex w-full items-center justify-between">
		<p class="text-sm text-neutral-800 opacity-70 dark:text-neutral-200">
			{Math.min(content.progress.amount, 100)}%
		</p>
		<p class="text-sm text-neutral-800 opacity-70 dark:text-neutral-200">100%</p>
	</div>
</div>
