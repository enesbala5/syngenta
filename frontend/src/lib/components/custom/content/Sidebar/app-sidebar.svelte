<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import { route } from '$lib/services/routeHandler';
	import type { ComponentProps } from 'svelte';
	import { cn } from '$lib/utils';
	import { page } from '$app/state';
	import { routes } from '$lib/data/routes';
	import LoginCallToAction from './LoginCallToAction/LoginCallToAction.svelte';
	import PostCallToAction from './PostCallToAction/PostCallToAction.svelte';
	import Logo from '../../general/Logo/Logo.svelte';
	import Icon from '../../general/Logo/Icon.svelte';
	import NavSecondary from './nav-secondary.svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const sidebar = Sidebar.useSidebar();

	const parsed = $derived(routes({ user: page?.data?.user }));
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					size="lg"
					class={cn(sidebar.open && '!h-14 bg-background !py-2 hover:bg-background/50')}
				>
					{#snippet child({ props })}
						{#if sidebar.open}
							<a href={route('/(app)/(homepage)')} {...props}>
								<Logo class="!h-full !w-auto" />
							</a>
						{:else}
							<a href={route('/(app)/(homepage)')} {...props}>
								<Icon class="!w-full" />
							</a>
						{/if}
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={parsed.navMain} />

		{#if !page?.data?.user}
			<LoginCallToAction />
		{:else}
			<PostCallToAction user={page?.data?.user} />
		{/if}

		<!-- Bottom Links -->
		<NavSecondary items={parsed.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if parsed?.user}
			<NavUser user={parsed?.user} />
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>
