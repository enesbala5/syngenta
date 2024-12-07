<script lang="ts">
	import { LogOut, InfoIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import type { AlertVariant } from '$lib/components/ui/alert';
	import type { ReturnButtonProps } from '../Buttons/ReturnButton/types';
	import type { Snippet } from 'svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import ReturnButton from '../Buttons/ReturnButton/ReturnButton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { route } from '$lib/services/routeHandler';
	import { RequestMethod } from '$lib/data/generic';
	import { toast } from 'svelte-sonner';
	import Logout from '../Logout/Logout.svelte';

	interface Props {
		className?: string;
		title?: string;

		status?: string;
		message?: string;

		width?: boolean | string;
		height?: boolean | string;
		fullWidthButton?: boolean;

		returnButtonProps?: ReturnButtonProps;

		alertVariant?: AlertVariant;
		showLogout?: boolean;

		children?: Snippet;
	}

	const {
		title = 'Something has gone wrong.',
		status,
		message,
		width = 'lg:w-1/2',
		height = false,
		fullWidthButton = true,
		returnButtonProps,
		showLogout = true,
		alertVariant = 'destructive',
		children
	}: Props = $props();
</script>

<div
	class={cn(
		typeof width === 'string' ? width : width === true && 'w-full',
		typeof height === 'string' ? height : height === true && 'h-full min-h-[85vh]',
		'flex items-center'
	)}
>
	<div>
		<h1 class="headline text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
			{title}
		</h1>
		<div class="{fullWidthButton ? 'w-full' : 'w-fit'} mt-8">
			<!-- <Alert title={String(status)} {message} type={alertVariant} /> -->
			<Alert.Root variant={alertVariant}>
				<InfoIcon class="size-4" />
				<Alert.Title>{status}</Alert.Title>
				<Alert.Description class={'empty:hidden'}>{message}</Alert.Description>
			</Alert.Root>
		</div>
		<div class="mt-16 flex items-center space-x-2">
			{#if children}
				{@render children?.()}
			{:else}
				<ReturnButton {...returnButtonProps} />

				{#if $page.data?.user && showLogout}
					<Logout class="w-full">
						<button class="w-full text-left">
							<LogOut class={'h-4 w-4'} />
							Log Out
						</button>
					</Logout>
				{/if}
			{/if}
		</div>
	</div>
</div>
