<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'ring-offset-background group focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border-input dark:border-input/15 bg-card/70 dark:bg-card/5 backdrop-blur-md hover:bg-card/100  dark:hover:bg-card/[15%] hover:text-accent-foreground border',
				secondary:
					'hover:bg-neutral-200/90 border border-input dark:border-input/15 hover:text-neutral-800 dark:hover:text-neutral-200 bg-card dark:bg-card/[12%] dark:hover:bg-card/20',
				ghost: 'hover:bg-white hover:text-neutral-800',
				ghostSecondary:
					'hover:bg-neutral-100/90 border border-transparent dark:border-transparent dark:hover:border-input/5 hover:border-input/50 hover:text-neutral-800 dark:hover:text-neutral-200 bg-transparent dark:hover:bg-card/10',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				xs: 'h-7 rounded-full px-2.5 text-sm',
				default: 'h-9 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a bind:this={ref} class={cn(buttonVariants({ variant, size, className }))} {href} {...restProps}>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size, className }))}
		{type}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
