<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	let className: string | undefined | null = undefined;
	export let items: { href: string; title: string }[];
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<nav class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2', className)}>
	{#each items as item}
		{@const isActive = $page.url.pathname === item.href}

		<Button
			href={item.href}
			variant="outline"
			size="sm"
			class={cn(
				'relative justify-start hover:bg-transparent',
				isActive ? 'border-primary text-primary ' : ''
			)}
			data-sveltekit-noscroll
		>
			{#if isActive}
				<div
					class={cn('absolute inset-0 rounded-md bg-primary/10')}
					in:send={{ key: 'active-sidebar-tab' }}
					out:receive={{ key: 'active-sidebar-tab' }}
				></div>
			{/if}
			<div class="relative">
				{item.title}
			</div>
		</Button>
	{/each}
</nav>
