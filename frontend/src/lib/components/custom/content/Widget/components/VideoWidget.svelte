<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { BackendSchema } from '$lib/types/generic';
	import { PlayIcon } from 'lucide-svelte';

	interface Props {
		content: BackendSchema['VideoContent'];
	}

	const { content }: Props = $props();
</script>

<div class="relative overflow-hidden size-full bg-yellow-500">
	<div class="absolute inset-0 z-10 flex w-full flex-col items-center justify-between p-4">
		<div class="flex size-full items-center justify-between">
			<p class="mr-auto">{content.title}</p>
			<Button variant="ghost" class="w-fit text-white" size="xs">
				<PlayIcon class="size-4" />
				<span>Copy URL</span>
			</Button>
			<Button variant="ghost" class="w-fit text-white" size="xs">
				<PlayIcon class="size-4" />
				<span>Read Aloud</span>
			</Button>
		</div>

		<div class="flex flex-col z-10">
			<h3 class="text-2xl font-semibold leading-none text-white empty:hidden">{content?.title}</h3>
			<p class="text-base leading-none text-white opacity-75 empty:hidden">
				{String(content?.subtitle).trim()}
			</p>
		</div>
	</div>
	{#if content.videoUrl}
		<div class="size-full overflow-hidden rounded-2xl rounded-md mix-blend-multiply">
			<video
				src={content.videoUrl}
				autoplay={content.autoplay !== false}
				muted={content.muted !== false}
				loop={content.loop !== false}
				controls={content.controls !== false}
				class="pointer-events-none size-full object-cover "
			></video>
		</div>
	{:else}
		<div
			class="z mt-2 flex h-40 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700"
		>
			<span class="text-gray-500 dark:text-gray-400">No video available</span>
		</div>
	{/if}
</div>
