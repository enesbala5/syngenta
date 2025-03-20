<script lang="ts">
	import { directionStyles } from '../data';

	interface Props {
		content: any;
	}

	const { content }: Props = $props();
	const directionStyle = $derived(directionStyles[content.direction ?? 'neutral']);
</script>

<div class="expected-yield-widget">
	<h3 class="mb-2 text-xl font-medium">{content.title || 'Expected Yield'}</h3>

	{#if content.subtitle}
		<p class="text-sm text-muted-foreground">{content.subtitle}</p>
	{/if}

	{#if content.value}
		<div class="mt-3 flex items-center gap-2">
			<span class="text-2xl font-bold">{content.value}</span>
			{#if content.unit}
				<span class="text-sm text-muted-foreground">{content.unit}</span>
			{/if}
		</div>
	{/if}

	{#if content.change}
		<div class="mt-3 flex items-center gap-2">
			<span class="text-lg font-semibold">Yield Forecast:</span>
			<span class={`text-lg font-bold ${directionStyle.text}`}>
				{content.change}{content.symbol || ''}
			</span>
			<span class={`inline-block ${directionStyle.iconClass}`}>
				<!-- Icon would go here -->
			</span>
		</div>
	{/if}

	<!-- Yield visualization placeholder -->
	<div class="mt-3 rounded-md bg-lime-100 p-3 dark:bg-lime-900/30">
		<div
			class="h-4 rounded-full bg-lime-300 dark:bg-lime-600"
			style="width: {content.progress || 50}%"
		></div>
	</div>
</div>