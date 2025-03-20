<script lang="ts">
	import type { WidgetContent, WidgetInterface } from '../data';

	interface Props {
		content: WidgetContent;
	}

	const { content }: Props = $props();
</script>

<div class="image-widget">
	{#if content.title}
		<h3 class="mb-2 text-xl font-medium">{content.title}</h3>
	{/if}

	{#if content.subtitle}
		<p class="mb-3 text-sm text-muted-foreground">{content.subtitle}</p>
	{/if}

	{#if content.imageUrl}
		<div class="mt-2 overflow-hidden rounded-md">
			<img
				src={content.imageUrl}
				alt={content.title || 'Image'}
				class="h-auto w-full object-cover"
			/>
		</div>
	{:else}
		<div class="mt-2 flex h-40 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
			<span class="text-gray-500 dark:text-gray-400">No image available</span>
		</div>
	{/if}
</div>
