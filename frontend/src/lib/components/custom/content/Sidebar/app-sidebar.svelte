<script lang="ts" module>
	import {
		BrainCircuitIcon,
		CompassIcon,
		HomeIcon,
		ListOrderedIcon,
		MessageCircleIcon,
		MessagesSquareIcon,
		SparklesIcon,
		UserIcon,
		UsersIcon,
		VideoIcon
	} from 'lucide-svelte';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import Send from 'lucide-svelte/icons/send';

	const data = ({ user }: { user: PageUser }) => {
		return {
			user,
			navMain: [
				{
					title: 'Home',
					url: route('/(app)/(homepage)'),
					icon: HomeIcon,
					isActive: true
				},
				{
					title: 'Startups',
					url: route('/(app)/startups'),
					icon: ListOrderedIcon
				},
				{
					title: 'Conversations',
					url: route('/(app)/conversations'),
					icon: MessagesSquareIcon
				},
				{
					title: 'Knowledge Base',
					url: route('/(app)/knowledge'),
					icon: BrainCircuitIcon
				}
			],
			navSecondary: [
				{
					title: 'Contact Support',
					url: route('/(app)/contact'),
					icon: Send
				}
				// {
				// 	title: 'Terms & Conditions',
				// 	url: route('/(app)/terms'),
				// 	icon: LifeBuoy
				// },
			]
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { route } from '$lib/services/routeHandler';
	import type { PageUser } from '$lib/types/generic';
	import type { ComponentProps } from 'svelte';
	import { company } from '$lib/data/generic';
	import NavMain from './nav-main.svelte';
	import { Button } from '$lib/components/ui/button';
	import NavSecondary from './nav-secondary.svelte';
	import NavUser from './nav-user.svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const parsed = data({ user: $page.data.user });
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg" class="!h-14 bg-background !py-2 hover:bg-background/50">
					{#snippet child({ props })}
						<a href={route('/(app)/(homepage)')} class="w-fit" {...props}>
							<img
								src={company.brand.main.white.svg}
								alt={company.brand.main.alt}
								class="hidden dark:block md:h-6 lg:h-7 xl:h-8 object-contain"
							/>
							<img
								src={company.brand.main.primary.svg}
								alt={company.brand.main.alt}
								class="block dark:hidden md:h-6 lg:h-7 xl:h-8 object-contain"
							/>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={parsed.navMain} />

		{#if !$page.data.user}
			<Sidebar.Group>
				<Card.Root>
					<Card.Header class="p-3">
						<!-- <Card.Title class="text-base">Card Title</Card.Title> -->
						<Card.Description
							>Log in to follow creators, like videos, and view comments.</Card.Description
						>
					</Card.Header>
					<Card.Content class="p-3">
						<Button size="lg" class="w-full" variant="default" href={route('/(auth)/login')}>
							Log In
						</Button>
					</Card.Content>
				</Card.Root>
			</Sidebar.Group>
		{:else}
			<Sidebar.Group>
				<Card.Root>
					<Card.Header class="p-3">
						<Card.Description>Access key resouces and Startup & Conversation Data</Card.Description>
					</Card.Header>
					<Card.Content class="p-3">
						<Button
							size="lg"
							class="w-full"
							variant="default"
							href={route('/(app)/knowledge')}> <SparklesIcon/>
							Dell Assistant</Button
						>
					</Card.Content>
				</Card.Root>
			</Sidebar.Group>
		{/if}

		<!-- Bottom Links -->
		<NavSecondary items={parsed.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if parsed.user}
			<NavUser user={parsed.user} />
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>
