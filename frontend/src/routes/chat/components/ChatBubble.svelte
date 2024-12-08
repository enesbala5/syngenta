<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

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
			return cn(baseClass, variantClass, layoutClass, className, 'relative group');
		};
	}

	// ChatBubble Variants
	const chatBubbleVariant = createVariants(
		'flex gap-2 max-w-[60%] items-end relative group',
		{
			variant: {
				received: 'self-start',
				sent: 'self-end flex-row-reverse'
			},
			layout: {
				default: '',
				ai: 'max-w-full w-full items-start'
			}
		},
		{
			variant: 'received',
			layout: 'default'
		}
	);

	// Props interface
	interface ChatBubbleProps {
		variant?: 'received' | 'sent';
		layout?: 'default' | 'ai';
		className?: string;
		children?: Snippet;
	}

	// Prop defaults
	let {
		variant = 'received',
		layout = 'default',
		className = '',
		children
	}: ChatBubbleProps = $props();

	// Child propagation logic
	function propagateChildProps(children: Snippet) {
		return children;
		// ((child: any) => {
		// 	// Check if child is a Svelte component with a type
		// 	if (child && typeof child.type === 'function') {
		// 		// Spread variant and layout props to child
		// 		return { ...child, props: { ...child.props, variant, layout } };
		// 	}
		// 	return child;
		// });
	}
</script>

<div class={chatBubbleVariant({ variant, layout, className })}>
	<!-- {#each propagateChildProps(children) as child} -->
	{@render children?.()}
	<!-- {/each} -->
</div>
