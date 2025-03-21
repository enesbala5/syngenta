<script lang="ts">
	import { directionStyles, getRiskStyle } from '../data';
	import { cn } from '$lib/utils';

	interface Props {
		content: any;
	}

	const { content }: Props = $props();
	const directionStyle = $derived(directionStyles[content.direction ?? 'neutral']);
</script>

<p>content.direction: {content.direction}</p>

<div class="flex w-full flex-col items-start">
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

	<div class="h-5 rounded-full bg-gray-200 dark:bg-gray-700">
		<div
			class={cn('h-5 rounded-full bg-gradient-to-r', getRiskStyle(content.progress).gradient)}
			style="width: {Math.min(content.progress, 100)}%"
		></div>
	</div>

	<div class="flex w-full items-center bg-red-500 justify-between">
		<p class="text-sm text-neutral-800 opacity-70">{Math.min(content.progress, 0)}$</p>
		<p class="text-sm text-neutral-800 opacity-70">100%</p>
	</div>
</div>
