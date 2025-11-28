<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import { User, Calendar, Bell, Star } from 'lucide-svelte';
	import type { BaseWidgetComponentProps } from '../types';
	import { cn } from '$lib/utils';
	import { company } from '$lib/data/generic';
	import type { PageUser } from '$lib/types/generic';

	interface Props extends BaseWidgetComponentProps {
		content: {
			title?: string;
			subtitle?: string;
			imageUrl?: string;
		};
		user: PageUser;
	}

	const { content, user, suffix }: Props = $props();

	// Get current time to display appropriate greeting
	const hours = new Date().getHours();
	let greeting = $state('Hello');

	if (hours < 12) {
		greeting = 'Good morning';
	} else if (hours < 18) {
		greeting = 'Good afternoon';
	} else {
		greeting = 'Good evening';
	}
</script>

<Card.Root class='w-full'>
	<Card.Content class="p-3 lg:p-6 w-full">
		<p class="text-sm text-muted-foreground">Current Date: {new Date().toDateString()}</p>

		<h2 class={cn('mt-6 whitespace-pre-wrap break-words text-5xl font-semibold')}>
			{greeting}{#if user?.title}
				, <span class={cn('ml-0 break-words font-bold text-primary')}
					>{String(user?.title).trim()}</span
				>
			{:else}
				!
			{/if}
		</h2>

		{#if content?.title}
			<h3 class="mb-2 mt-8 text-xl font-medium">{content?.title}</h3>
		{/if}

		{#if content?.subtitle}
			<p class="mb-4 text-sm text-muted-foreground">{content?.subtitle}</p>
		{/if}
	</Card.Content>
	<Card.Footer class="p-3 pb-6 lg:p-6 w-full !pt-0">
		<div class="mt-4 grid grid-cols-1 gap-4 w-full md:grid-cols-3">
			{@render suffix?.()}
		</div>

		{#if content.imageUrl}
			<div class="mt-4 overflow-hidden rounded-md">
				<img
					src={content.imageUrl}
					alt={content?.title || 'Welcome image'}
					class="h-auto w-full object-cover"
				/>
			</div>
		{/if}
	</Card.Footer>
</Card.Root>
