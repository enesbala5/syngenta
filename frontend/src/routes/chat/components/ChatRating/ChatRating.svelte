<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { fly } from 'svelte/transition';
	import StarRating from '../StarRating/StarRating.svelte';
	import { quartInOut } from 'svelte/easing';
	import { CheckIcon } from 'lucide-svelte';
	import client from '$lib/services/api';
	import { toast } from 'svelte-sonner';

	interface Props {
		rating?: number | undefined;
	}

	let { rating = $bindable() } = $props();
</script>

<Card.Root class="w-full p-0.5">
	<Card.Header>
		<Card.Title>Rate Conversation</Card.Title>
		<Card.Description>Can you take a minute to rate this conversation</Card.Description>
	</Card.Header>
	<Card.Content class="my-6 flex w-full flex-col items-center gap-3 rounded-lg bg-gray-100 p-1">
		<Card.Content class="flex w-full flex-col gap-3 rounded-lg bg-white px-4 py-3">
			<StarRating bind:rating />
		</Card.Content>
	</Card.Content>
	<Card.Footer class="flex flex-wrap gap-2">
		<Button
			onclick={() => {
				if (!rating) toast.error('Please select a rating before submitting form');

				// client.GET('')
			}}
		>
			<CheckIcon />
			Confirm Rating
			{#if rating}
				<div transition:fly={{ duration: 150, easing: quartInOut, delay: 0, x: -10 }}>
					<Badge variant="outline">{rating} Stars</Badge>
				</div>
			{/if}
		</Button>
		<Button
			variant="outline"
			onclick={() => {
				rating = undefined;
			}}
		>
			Reset
		</Button>
	</Card.Footer>
</Card.Root>
