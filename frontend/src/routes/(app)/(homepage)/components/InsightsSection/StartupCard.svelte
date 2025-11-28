<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { ArrowUpRightIcon, MessageCircle } from 'lucide-svelte';

	interface Props {
		id: string;
		name: string;
		link: string;
		details: string;
		date: Date;
	}

	const { id, name, link, details, date }: Props = $props();
</script>

<Card.Root class="w-full">
	<Card.Header class="flex w-full flex-row flex-wrap justify-between gap-3">
		<Card.Title class="w-fit text-lg font-bold">{name}</Card.Title>
		<span class="code w-fit whitespace-nowrap">{id}</span>
	</Card.Header>

	<Card.Content class="pt-2">
		<Card.Root class="">
			<Card.Content class="bg-neutral-50/50 p-3 text-sm text-neutral-700">
				{details || 'Additional details go here...'}
				<Card.Root class="mt-3">
					<Card.Content class="p-2 px-3 text-sm">
						<p>Date: {date.toLocaleDateString()}</p>
					</Card.Content>
				</Card.Root>
			</Card.Content>
		</Card.Root>
	</Card.Content>
	<Card.Footer>
		<Button href={link} variant="link" target="_blank" rel="noopener noreferrer">
			View Conversation <MessageCircle class="size-5" />
		</Button>
		<Button href={link} variant="link" target="_blank" rel="noopener noreferrer">
			Visit Startup <ArrowUpRightIcon class="size-5" />
		</Button>
	</Card.Footer>
</Card.Root>
