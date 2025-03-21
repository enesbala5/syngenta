<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { BackendSchema } from '$lib/types/generic';
	import { MapPinIcon } from 'lucide-svelte';

	interface Props {
		content: BackendSchema['LocationContent'];
		class?: string;
	}

	const { content }: Props = $props();

	const lat = content?.location[0];
	const lng = content?.location[1];
</script>

<div class="flex size-full flex-col items-start absolute inset-0">
	<!-- <h3 class="mb-2 text-xl font-medium">{content?.title || 'Location'}</h3> -->

	{#if content.location}
		<div
			class="flex w-full items-start gap-2 rounded-t-md bg-gradient-to-tr from-neutral-50 via-transparent to-neutral-100 px-1 pb-2.5 pt-2"
		>
			<span class="inline-block -translate-y-0.5 text-base">📍</span>

			<div class="mt-0.5 flex w-full flex-col items-start gap-2">
				<span class="text-sm font-semibold leading-none">{content?.title}</span>
				<p class="text-xs leading-none text-muted-foreground">{content?.subtitle.trim()}</p>
			</div>
			<Button href={'#'} size="xs" variant="outline">
				<MapPinIcon class="size-4" />
				Get Directions
			</Button>
		</div>
	{/if}

	<!-- Map placeholder - would be replaced with actual map component -->
	{#if lat !== 0 && lng !== 0}
		<div
			class="relative flex h-full w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700"
		>
			<iframe
				title="Location Map"
				width="100%"
				height="100%"
				style="border:0"
				loading="lazy"
				allowfullscreen
				referrerpolicy="no-referrer-when-downgrade"
				src={`https://maps.google.com/maps?q=${lat}, ${lng}&z=15&output=embed`}
			>
			</iframe>
		</div>
	{/if}
</div>
