<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { BackendSchema } from '$lib/types/generic';
	import { CopyIcon, PlayIcon } from 'lucide-svelte';

	interface Props {
		content: BackendSchema['ImageContent'];
	}

	const { content }: Props = $props();
</script>

<div class="grid size-full grid-cols-1 grid-rows-1 overflow-hidden bg-yellow-500  max-h-[40vh]">
	<div class="z-10 col-start-1 row-start-1 flex w-full flex-col justify-between p-4">
		<div class="mb-auto flex w-full items-center justify-between">
			<p class="mr-auto font-mono text-xs text-white opacity-60">{content.title}</p>
			<Button variant="ghost" class="w-fit text-white backdrop-blur-sm" size="default">
				<CopyIcon class="size-4" />
				<span>Copy URL</span>
			</Button>
			<Button variant="ghost" class="w-fit text-white backdrop-blur-sm" size="default">
				<PlayIcon class="size-4" />
				<span>Read Aloud</span>
			</Button>
		</div>

		<div class="z-10 mt-auto flex w-full flex-col text-left gap-2">
			<h3 class="text-2xl font-semibold leading-none text-white empty:hidden">{content?.title}</h3>
			<p class="text-base leading-none text-white opacity-75 empty:hidden">
				{String(content?.subtitle).trim()}
			</p>
		</div>
	</div>
	{#if content.src}
		<div class="col-start-1 row-start-1 size-full overflow-hidden rounded-md mix-blend-multiply">
			<img src={content.src} class="pointer-events-none size-full object-cover" />
		</div>
	{:else}
		<div
			class="z col-start-1 row-start-1 mt-2 flex h-40 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700"
		>
			<span class="text-gray-500 dark:text-gray-400">No video available</span>
		</div>
	{/if}
</div>
