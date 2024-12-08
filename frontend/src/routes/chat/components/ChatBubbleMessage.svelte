<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import MessageLoading from './MessageLoading.svelte';

	// Variant creation function (similar to cva)
	function createVariants(
		baseClass: string,
		variants: Record<string, Record<string, string>>,
		defaultVariants: Record<string, string> = {}
	) {
		return ({
			variant = defaultVariants.variant,
			layout = defaultVariants.layout,
			className = ''
		}) => {
			const variantClass = variants.variant?.[variant || ''] || '';
			const layoutClass = variants.layout?.[layout || ''] || '';
			return cn(
				baseClass,
				variantClass,
				layoutClass,
				className,
				'break-words max-w-full whitespace-pre-wrap'
			);
		};
	}

	// ChatBubbleMessage Variants
	const chatBubbleMessageVariants = createVariants(
		'p-4',
		{
			variant: {
				received: 'bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg',
				sent: 'bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg'
			},
			layout: {
				default: '',
				ai: 'border-t w-full rounded-none bg-transparent'
			}
		},
		{
			variant: 'received',
			layout: 'default'
		}
	);

	// Props interface
	interface ChatBubbleMessageProps {
		variant?: 'received' | 'sent';
		layout?: 'default' | 'ai';
		className?: string;
		isLoading?: boolean;
		children?: Snippet;
	}

	// Prop defaults
	let {
		variant = 'received',
		layout = 'default',
		className = '',
		isLoading = false,
		children
	}: ChatBubbleMessageProps = $props();
</script>

<div class={chatBubbleMessageVariants({ variant, layout, className })}>
	{#if isLoading}
		<div class="flex items-center space-x-2">
			<MessageLoading />
		</div>
	{:else if children}
		{@render children()}
	{/if}
</div>
