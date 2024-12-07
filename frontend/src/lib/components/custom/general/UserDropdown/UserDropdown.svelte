<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { LogInIcon, LogOutIcon, SettingsIcon, UserIcon, UserPlus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import Logout from '../Logout/Logout.svelte';
	import { route } from '$lib/services/routeHandler';
	import { returnNameOrPlaceholder } from '$lib/utils';
	import type { User } from 'lucia';

	interface Props {
		user: User | undefined;
	}

	const { user }: Props = $props();

	let isOpen = $state(false);
</script>

<DropdownMenu.Root bind:open={isOpen}>
	<DropdownMenu.Trigger onclick={() => {}}>
		{#snippet child({ props })}
			<button {...props} class="relative size-10 shrink-0">
				<Avatar.Root class="size-full rounded-lg">
					<Avatar.Image alt="@{user?.username}" class="rounded-lg" />
					<Avatar.Fallback class="rounded-lg bg-primary/10">
						{#if user?.firstName && user?.lastName}
							{user.firstName?.[0]}{user.lastName?.[0]}
						{:else}
							<UserIcon class="size-5" />
						{/if}
					</Avatar.Fallback>
				</Avatar.Root>
			</button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-56">
		{#if user}
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">
						{returnNameOrPlaceholder(user?.firstName, user?.lastName)}
					</p>
					<p class="text-xs leading-none text-muted-foreground">
						{user?.email ?? 'Email address'}
					</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					{#snippet child({ props })}
						<a
							href={route('/(app)/user/[id]', { params: { id: user?.username ?? user?.id } })}
							class="flex items-center gap-2"
							{...props}
						>
							<UserIcon class="size-4" />
							My Profile
						</a>
					{/snippet}
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a href={route('/(app)/settings')} class="flex items-center gap-2">
						<SettingsIcon class="size-4" />
						Account Settings
					</a>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="w-full text-left">
				<Logout class="w-full">
					<button type="submit" class="flex w-full items-center gap-2">
						<LogOutIcon class="size-4" />
						Logout</button
					>
				</Logout>
			</DropdownMenu.Item>
		{:else}
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<a href={route('/(auth)/login')} class="flex items-center gap-2">
						<LogInIcon class="size-4" />
						Log In
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a href={route('/(auth)/register')} class="flex items-center gap-2">
						<UserPlus class="size-4" />
						Sign Up
					</a>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
