<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { route } from '$lib/services/routeHandler';
	import type { PageUser } from '$lib/types/generic';
	import { RequestMethod } from '$lib/data/generic';
	import { invalidateAll } from '$app/navigation';
	import {
		BellIcon,
		ChevronsUpDownIcon,
		CreditCardIcon,
		LogOutIcon,
		SettingsIcon,
		SparklesIcon,
		UserIcon
	} from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import Logout from '../../general/Logout/Logout.svelte';
	import { returnNameOrPlaceholder } from '$lib/utils';

	let {
		user
	}: {
		user: PageUser;
	} = $props();

	const sidebar = useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						variant={'outline'}
						class="group border bg-background hover:bg-background/50 data-[state=open]:border-primary data-[state=open]:bg-background data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="size-8 rounded-full">
							<Avatar.Image alt={user?.firstName} />
							<Avatar.Fallback class="overflow-hidden rounded-full bg-primary/10">
								<UserIcon class="origin-top scale-[130%] fill-primary stroke-primary opacity-30" />
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold"
								>{returnNameOrPlaceholder(user?.firstName, user?.lastName)}</span
							>
							<span class="truncate text-xs text-muted-foreground">{user?.email}</span>
						</div>
						<ChevronsUpDownIcon class="ml-auto size-3 stroke-[1.5px] text-muted-foreground/50" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-60 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="size-8 rounded-full">
							<Avatar.Image alt={user?.firstName} />
							<Avatar.Fallback class="overflow-hidden rounded-full bg-primary/10">
								<UserIcon class="origin-top scale-[130%] fill-primary stroke-primary opacity-30" />
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold"
								>{returnNameOrPlaceholder(user?.firstName, user?.lastName)}</span
							>
							<span class="truncate text-xs">{user?.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<!-- <DropdownMenu.Group>
					<DropdownMenu.Item>
						<SparklesIcon />
						Upgrade
						<Badge variant="outline">Coming Soon</Badge>
					</DropdownMenu.Item>
				</DropdownMenu.Group> -->
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						{#snippet child({ props })}
							<a href={route('/(app)/settings')} {...props}>
								<SettingsIcon />
								Settings
							</a>
						{/snippet}
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<Logout class="w-full">
						<button type="submit" class="flex w-full items-center gap-2">
							<LogOutIcon class="size-4" />
							Logout
						</button>
					</Logout>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
