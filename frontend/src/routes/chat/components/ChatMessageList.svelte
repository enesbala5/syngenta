<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	// Prop type definition
	interface ChatMessageListProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		ref: HTMLDivElement | undefined | null;
	}

	let { children, ref = $bindable(), ...props }: ChatMessageListProps = $props();
</script>

<div
	bind:this={ref}
	class={cn('flex h-full w-full flex-col gap-6 overflow-y-auto p-4', props.class)}
	{...props}
>
	{@render children?.()}
</div>
