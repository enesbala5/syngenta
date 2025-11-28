<script lang="ts" module>
	import { tv } from 'tailwind-variants';
	import type { VariantProps } from 'tailwind-variants';

	export const actionVariants = tv({
		base: 'flex items-center font-medium [&>svg]:!shrink-0 [&>svg]:!h-full [&>svg]:!w-fit group last:!mr-0 text-muted-foreground',
		variants: {
			size: {
				sm: 'h-5 md:h-6 p-0.5 gap-0.5 md:gap-1 lg:gap-1.5 text-xs md:text-sm lg:text-base',
				md: 'h-6.6 md:h-6.5 p-0.5 gap-1 lg:h-7 lg:gap-1.5 text-sm lg:text-base',
				lg: 'h-8 p-0.5 gap-0.5 lg:h-10 lg:gap-1.5 text-base'
			},
			text: {
				visible: '',
				hidden: '[&>p]:hidden'
			},
			backdrop: {
				visible: 'group/action-backdrop',
				hidden: ''
			}
		},
		defaultVariants: {
			size: 'md',
			text: 'visible',
			backdrop: 'visible'
		}
	});

	export type ActionProps = VariantProps<typeof actionVariants>;
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { Sidebar, useSidebar } from '$lib/components/ui/sidebar';
	import { routes } from '$lib/data/routes';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';
	import { EllipsisIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	interface BottomBarProps {
		minimized?: boolean;
		preferMinimized?: boolean;
	}

	let { preferMinimized, minimized = $bindable(false), ...props }: BottomBarProps = $props();

	const parsed = $derived(routes({ user: page?.data?.user }));
	let sidebar = useSidebar();

	$effect(() => {
		if (preferMinimized)
			setTimeout(() => {
				minimized = true;
			}, 3000);
	});

	const handleClick = () => {
		if (minimized) {
			minimized = false;
			setTimeout(() => (minimized = !!preferMinimized), 3000);
		}
	};
</script>

<div
	class={cn(
		'fixed inset-x-0 bottom-0 z-50 flex h-12 w-full items-center justify-around border-t px-2 transition-all duration-300 ease-in-out md:hidden',
		// scrollY < 100 ? 'bg-background' : 'bg-background/30'
		minimized ? 'translate-y-9 bg-muted' : 'translate-y-0 bg-background'
	)}
	role="button"
	tabindex={1}
	onclick={handleClick}
	onkeydown={handleClick}
	id="wrapper"
>
	{#if minimized}
		<div
			in:fly={{ duration: 200, easing: quartInOut, y: 10 }}
			class="absolute mb-9 flex h-6 w-screen items-center justify-center opacity-50"
		>
			<EllipsisIcon class="h-full text-muted-foreground" />
		</div>
	{/if}
	{#each parsed.navMain as item}
		{@const isActive = page.url.pathname === item.url}
		{@const id = String(item?.title).toLowerCase()}
		<a
			href={item.url}
			{id}
			class={cn(actionVariants({ size: 'lg' }), isActive ? 'text-primary ' : 'active:text-primary')}
			onfocus={(e) =>
				setTimeout(() => {
					console.log('blur');
					const element = document?.getElementById(id);
					if (element) {
						console.log('blur', element);

						element?.blur();
					}
				}, 500)}
		>
			<div class="relative">
				<item.icon class="action-icon group-hover:text-primary " />
				<div class="action-icon-backdrop bg-primary/20"></div>
			</div>
		</a>
	{/each}
</div>
