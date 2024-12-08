<script lang="ts">
	import { DatePickerWithRange, RecentSales, Search, TeamSwitcher, UserNav } from './index.js';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import Activity from 'lucide-svelte/icons/activity';
	import { Button } from '$lib/components/ui/button';
	import { formatSeconds } from '../../functions.js';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import client from '$lib/services/api/index.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { string } from 'zod';
	import {
		CalendarFoldIcon,
		CreditCardIcon,
		DollarSignIcon,
		DownloadIcon,
		MessageCircleIcon,
		MessageSquareTextIcon,
		StarIcon,
		UsersIcon
	} from 'lucide-svelte';
	import Chart from './Chart.svelte';

	interface Props {
		data: {
			n_conversations: number;
			avg_conv_time: number;
			n_profiles: number;
			messages_today: number;
			messages_median: number;
			messages_change: number;
			avg_rating: number;
		};
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col border-t">
	<!-- <div class="flex h-16 items-center">
			<TeamSwitcher />
		</div> -->
	<div class="flex-1 space-y-4 pt-6">
		<Tabs.Root value="overview" class="space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="analytics" disabled>Analytics</Tabs.Trigger>
				<Tabs.Trigger value="reports" disabled>Reports</Tabs.Trigger>
				<Tabs.Trigger value="notifications" disabled>Notifications</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="overview" class="space-y-4">
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Messages</Card.Title>
							<MessageSquareTextIcon class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">{data?.messages_today ?? 0}</div>
							<p class="text-xs text-muted-foreground">
								+{Math.floor(data?.messages_change * 100)}% from yesterday
							</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Avg. Daily Messages</Card.Title>
							<CalendarFoldIcon class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+{data?.messages_median ?? 0}</div>
							<p class="text-xs text-muted-foreground">
								+{Math.floor(data?.messages_change * 79)}% from yesterday
							</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Number of Conversations</Card.Title>
							<MessageCircleIcon class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+{data?.n_conversations ?? 0}</div>
							<p class="text-xs text-muted-foreground">
								Avg. Conversation Time: {formatSeconds(data?.avg_conv_time)}
							</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Avg. Conversation Rating</Card.Title>
							<StarIcon class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">{data?.avg_rating.toFixed(1)} / 5 Stars</div>
							<p class="text-xs text-muted-foreground">+201 since last hour</p>
						</Card.Content>
					</Card.Root>
				</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
					<Card.Root class="col-span-4">
						<Card.Header>
							<Card.Title>Message Histogram</Card.Title>
						</Card.Header>
						<Card.Content class="w-full">
							<Chart id="message-histogram" />
						</Card.Content>
					</Card.Root>
					<Card.Root class="col-span-4">
						<Card.Header>
							<Card.Title>Funding Map</Card.Title>
						</Card.Header>
						<Card.Content class="w-full">
							<Chart id="funding-map" />
						</Card.Content>
					</Card.Root>
					<Card.Root class="col-span-8">
						<Card.Header>
							<Card.Title>Startup Types</Card.Title>
						</Card.Header>
						<Card.Content class="w-full">
							<Chart id="startup-types-pie" />
						</Card.Content>
					</Card.Root>
					<!-- <Card.Root class="col-span-3">
						<Card.Header>
							<Card.Title>Recent Conversations</Card.Title>
							<Card.Description>Startups had over {265} conversations this month.</Card.Description>
						</Card.Header>
						<Card.Content>
							<RecentSales />
						</Card.Content>
					</Card.Root> -->
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
