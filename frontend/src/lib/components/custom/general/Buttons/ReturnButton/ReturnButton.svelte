<script lang="ts">
	import { route } from '$lib/services/routeHandler';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { Button, type ButtonProps } from '$lib/components/ui/button';
	import type { Snippet } from 'svelte';
	import type { ReturnButtonProps } from './types';
	import { CornerUpLeftIcon } from 'lucide-svelte';

	function onClick(event: Event) {
		if (href) return;

		event?.preventDefault();
		// Get last path that was visited
		const previousPageUrl = document.referrer;

		// If the previous page is the same as the current page, return home
		if (previousPageUrl === $page.url.href || previousPageUrl === '') {
			goto(route('/'));
			return;
		}

		history.back();
	}

	let { buttonProps, children, href, iconClassName }: ReturnButtonProps = $props();
</script>

<Button type="button" {href} onclick={onClick} {...buttonProps}>
	{#if children}
		{@render children()}
	{:else}
		<CornerUpLeftIcon class={cn('size-4', iconClassName)} />
	{/if}
</Button>
