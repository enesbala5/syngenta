<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	// Prop type definition
	interface ChatInputProps extends HTMLTextareaAttributes {
		ref: HTMLTextAreaElement | null;
	}

	// Default props

	// Spread the rest of the props
	let { ref = $bindable(), value = $bindable(), placeholder, ...props }: ChatInputProps = $props();
</script>

<!-- {...props} -->
<textarea
	bind:this={ref}
	bind:value
	name="message"
	autocomplete="off"
	{placeholder}
	class={cn(
		'focus-visible:!ring-0-visible:ring-0 flex h-16 max-h-12 w-full resize-none items-center rounded-md bg-background px-4 py-3 text-sm !outline-none placeholder:text-muted-foreground focus-visible:!outline-none focus-visible:outline-transparent disabled:cursor-not-allowed disabled:opacity-50',
		props.class
	)}
>
</textarea>
