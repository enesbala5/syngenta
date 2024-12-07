<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import type { Preview } from '../types';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	interface Props {
		preview: Preview;
		children: Snippet;
		outer: Snippet;
		class?: string;
		style?: string;
		innerContainer?: string;
		badge?: string;
	}

	const {
		children,
		outer,
		preview,
		class: className,
		style,
		innerContainer,
		badge
	}: Props = $props();
	const { name, type } = preview;
</script>

<Card.Root
	class={cn(
		'group/previewCard flex h-full w-44 flex-col border bg-white shadow-sm  dark:bg-neutral-950 dark:!shadow-xl lg:w-48',

		className
	)}
	{style}
>
	<Card.Content class="h-full w-full grow overflow-hidden rounded-lg p-0.5">
		<AspectRatio
			ratio={1 / 1.2}
			class={cn(
				'flex h-full w-full items-center justify-center overflow-hidden rounded-md border',
				innerContainer
			)}
		>
			{@render children?.()}
		</AspectRatio>
	</Card.Content>
	<Card.Footer class="z-10 flex items-center gap-2 px-2 py-3 text-lg">
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={15}>
				<Tooltip.Trigger
					class="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold"
				>
					{name}
				</Tooltip.Trigger>
				<Tooltip.Content>
					{name}
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
		<p></p>
		<Badge class={cn('ml-auto whitespace-nowrap border text-xs', badge)}>{type}</Badge>
	</Card.Footer>
	{@render outer?.()}
</Card.Root>
