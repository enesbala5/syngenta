<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	// Variant and size types to match Button component
	type Variant = 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
	type Size = 'default' | 'sm' | 'lg' | 'icon';

	// Props interface
	interface ChatBubbleActionProps extends HTMLButtonAttributes {
		children?: Snippet;
		variant?: Variant;
		size?: Size;
	}

	// Default props
	let {
		children,
		onclick,
		class: className,
		variant = 'ghost',
		size = 'icon',
		...restProps
	}: ChatBubbleActionProps = $props();
</script>

<Button {variant} {size} class={className} onclick={(e) => onclick?.(e as any)}>
	{@render children?.()}
</Button>
