<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import { DownloadIcon, MessageCircleIcon, RocketIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { company } from '$lib/data/generic';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { user } = data;
</script>

<main class="container-width-sm !px-0 pt-2 md:px-4 lg:pb-24">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Chat</h2>
		<div class="flex items-center space-x-2">
			<!-- - -->
		</div>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>
				<MessageCircleIcon class="text-primary" />
				{company.name} Assistant</Card.Title
			>
			<Card.Description>Ask and get questions of different</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>

	<section class="relative mt-6 lg:mt-8">
		- **Searchable Lead Database**: - Search or filter by key parameters like funding, industry, or
		geographic region. - **One-Click Outreach**: - Enable integration with Dell’s email systems or
		LinkedIn for direct communication. - **Collaboration Features**: - Allow teams to assign or
		comment on leads. - **CRM Integration**: Sync data directly with Salesforce or HubSpot for sales
		and marketing follow-ups. *—> this doesn't has to work but would be neat to have it seem like
		its working*
	</section>
</main>
