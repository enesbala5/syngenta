<script lang="ts">
	import type { BackendSchema } from '$lib/types/generic';

	interface Props {
		content: BackendSchema['ImageContent'];
	}

	const { content }: Props = $props();
</script>

<div class="relative size-full bg-teal-500">
	{#if content.src}
		<div class="absolute inset-0 rounded-md mix-blend-multiply">
			<img src={content.src} alt={content.title || 'Image'} class="size-full object-cover" />
		</div>
	{:else}
		<div class="mt-2 flex h-40 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
			<span class="text-gray-500 dark:text-gray-400">No image available</span>
		</div>
	{/if}

	<div class="absolute bottom-0 left-0 flex flex-col gap-y-2 p-4">
		<h3 class="text-2xl font-semibold leading-none text-white empty:hidden">{content.title}</h3>
		<p class="text-base leading-none text-white opacity-75 empty:hidden">
			{String(content.subtitle).trim()}
		</p>
	</div>
</div>
