<script lang="ts">
	import ContactList from '$lib/components/custom/general/Contact/ContactList/ContactList.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { company } from '$lib/data/generic';
	import { route } from '$lib/services/routeHandler';
	import * as Card from "$lib/components/ui/card"
	
</script>

<div class="min-h-screen">
	<main class="container-width-sm py-12">
		<section class="mx-auto mb-8 flex max-w-3xl flex-col gap-3 lg:mb-16 lg:gap-4">
			<h1 class="h2 text-center">Knowledge Base</h1>
			<div class="relative">
				<p class="text-center text-lg">fdsa</p>
				<div class="mx-auto mt-6 flex w-fit flex-wrap items-center gap-2">
					<!-- EXPLORE QUESTIONS SHOULD SCROLL DOWN TO THE CONTAINER BELOW (VIEW TODO) -->
					<Button href={route('/(app)/(homepage)')} size="lg">Return Home</Button>
					<Button size="lg" variant="outline">Contact Us</Button>
				</div>
			</div>
		</section>
		<!-- CONTENT HERE -->
		<div
			id="privacySection"
			class="container-width-sm rounded-lg border border-opacity-50 bg-card/50 !px-6 pb-6 pt-3 dark:bg-card/5"
		>

		<Card.Root>
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Card Content</p>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>

		
		- **Searchable Lead Database**:
    - Search or filter by key parameters like funding, industry, or geographic region.
- **One-Click Outreach**:
    - Enable integration with Dell’s email systems or LinkedIn for direct communication.
- **Collaboration Features**:
    - Allow teams to assign or comment on leads.
- **CRM Integration**: Sync data directly with Salesforce or HubSpot for sales and marketing follow-ups. *—> this doesn't has to work but would be neat to have it seem like its working*

		</div>
	</main>
</div>
