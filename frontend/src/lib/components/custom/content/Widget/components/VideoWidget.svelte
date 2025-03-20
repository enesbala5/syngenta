<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { BackendSchema } from '$lib/types/generic';
	import { PlayIcon } from 'lucide-svelte';

	interface Props {
		content: BackendSchema['VideoContent'];
	}

	const { content }: Props = $props();
</script>

<pre>{JSON.stringify(content, null, 2)}</pre>

<div class="relative size-full bg-yellow-500">
	{#if content.videoUrl}
		<div class="size-full rounded-md mix-blend-multiply">
			<video
				src={content.videoUrl}
				autoplay={content.autoplay !== false}
				muted={content.muted !== false}
				loop={content.loop !== false}
				controls={content.controls !== false}
				class="pointer-events-none size-full object-cover"
			></video>
		</div>
	{:else}
		<div class="mt-2 flex h-40 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
			<span class="text-gray-500 dark:text-gray-400">No video available</span>
		</div>
	{/if}

	<div class="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
		<p>Test</p>
		<Button variant="ghost" class="w-fit text-white" size="xs">
			<PlayIcon class="size-4" />
			<span>Read Aloud</span>
		</Button>
	</div>

	<div class="absolute bottom-0 left-0 flex flex-col gap-y-2 p-4">
		<h3 class="text-2xl font-semibold leading-none text-white empty:hidden">{content.title}</h3>
		<p class="text-base leading-none text-white opacity-75 empty:hidden">
			{String(content.subtitle).trim()}
		</p>
	</div>
</div>
