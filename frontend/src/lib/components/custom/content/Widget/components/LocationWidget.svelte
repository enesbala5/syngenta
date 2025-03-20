<script lang="ts">
	import type { BackendSchema } from '$lib/types/generic';

	interface Props {
		content: BackendSchema['LocationContent'];
	}
	
	const { content }: Props = $props();
</script>

<div class="location-widget">
	<h3 class="mb-2 text-xl font-medium">{content.title || 'Location'}</h3>

	{#if content.location}
		<div class="mt-2 flex items-center gap-2">
			<span class="inline-block">📍</span>
			<span class="text-lg">{content.location}</span>
		</div>
	{/if}

	{#if content.subtitle}
		<p class="mt-2 text-sm text-muted-foreground">{content.subtitle}</p>
	{/if}

	<!-- Map placeholder - would be replaced with actual map component -->
	<div class="mt-3 flex h-32 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
		<span class="text-gray-500 dark:text-gray-400">Map View</span>
	</div>
</div>
