<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import {
		BrainCircuitIcon,
		DownloadIcon,
		HomeIcon,
		ListOrderedIcon,
		MessageCircleIcon,
		MessagesSquareIcon,
		RocketIcon
	} from 'lucide-svelte';
	import type { PageData } from './$types';
	import { company } from '$lib/data/generic';
	import Chat from '../../chat/components/Chat/Chat.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { user, temporaryId } = data;

	const quickLinks = [
		{
			title: 'Primary Dashboard',
			url: route('/(app)/(homepage)'),
			icon: HomeIcon
		},
		{
			title: 'My Fields',
			url: route('/(app)/(homepage)', { hash: 'my-fields' }),
			icon: ListOrderedIcon
		},
		{
			title: 'Field Insights',
			url: route('/(app)/(homepage)', { hash: 'field-insights' }),
			icon: MessagesSquareIcon
		}
		// {
		// 	title: 'Terms and Conditions',
		// 	url: route('/(app)/terms'),
		// 	icon: BrainCircuitIcon
		// }
	];
</script>

<main class="container-width-sm !px-0 pt-2 md:px-4 lg:pb-24">
	<div class="flex flex-col space-y-2">
		<h2 class="h2">Knowledge Base</h2>
		<div class="flex max-w-lg items-center space-x-2">
			<p>Search for the most relevant information with our AI-powered search engine.</p>
			<!-- - -->
		</div>
	</div>

	<section class="relative mt-6 flex px-2 items-start gap-4 lg:mt-8">
		<Card.Root class="w-1/3 hidden lg:block">
			<Card.Header>
				<Card.Title>Shortcuts</Card.Title>
				<Card.Description>Access the most useful data for you</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-2">
				{#each quickLinks as link}
					<Button size="lg" variant="outline" href={link.url} class="py-7" {...link}>
						<link.icon />
						<span>{link.title}</span>
					</Button>
				{/each}
			</Card.Content>
		</Card.Root>
		<Card.Root class="h-fit lg:w-2/3 border-primary shadow-md shadow-primary/20">
			<Card.Header class="space-y-3 bg-gradient-to-bl from-primary/5 to-transparent">
				<Card.Title class="h4 flex items-center gap-1.5">
					<MessageCircleIcon class="text-primary" />
					{company.name} Assistant
				</Card.Title>
				<Card.Description
					>Get all the answers you need to increase the productivity of your farm and boost your
					bottom line.</Card.Description
				>
			</Card.Header>
			<Card.Content class="h-fit w-full p-3 pt-6">
				<Chat
					endpoint="/syngenta-ai/"
					temporaryId={user?.phone_number ?? temporaryId}
					class="h-[60vh] w-full max-w-none border border-primary/10"
					innerContainer="p-0"
				/>
			</Card.Content>
		</Card.Root>
		<!-- - **Searchable Lead Database**: - Search or filter by key parameters like funding, industry, or
		geographic region. - **One-Click Outreach**: - Enable integration with Dell’s email systems or
		LinkedIn for direct communication. - **Collaboration Features**: - Allow teams to assign or
		comment on leads. - **CRM Integration**: Sync data directly with Salesforce or HubSpot for sales
		and marketing follow-ups. *—> this doesn't has to work but would be neat to have it seem like
		its working* -->
	</section>
</main>
