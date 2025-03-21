<script lang="ts">
	import { directionStyles } from '../data';
	import { cn } from '$lib/utils';
	
	interface Props {
		content: any;
	}

	const { content }: Props = $props();
	const directionStyle = $derived(directionStyles[content.direction ?? 'neutral']);
</script>

<div class="harvest-widget">
	<h3 class="mb-2 text-xl font-medium">{content?.title || 'Harvest'}</h3>

	{#if content?.subtitle}
		<p class="text-sm text-muted-foreground">{content?.subtitle}</p>
	{/if}

	{#if content.change}
		<div class="mt-3 flex items-center gap-2">
			<span class="text-lg font-semibold">Harvest Forecast:</span>
			<span class={cn("text-lg font-bold", directionStyle?.text)}>
				{content.change}{content.symbol || ''}
			</span>
			<span class={cn("inline-block", directionStyle?.iconClass)}>
				<!-- Icon would go here -->
			</span>
		</div>
	{/if}

	<!-- Harvest visualization placeholder -->
	<div class="mt-3 rounded-md bg-amber-100 p-3 dark:bg-amber-900/30">
		<div
			class="h-4 rounded-full bg-amber-300 dark:bg-amber-600"
			style="width: {content.progress || 50}%"
		></div>
	</div>
</div>
