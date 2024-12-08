<script lang="ts">
	import Activity from 'lucide-svelte/icons/activity';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';

	import { DatePickerWithRange, RecentSales, Search, TeamSwitcher, UserNav } from './index.js';
	import { CreditCardIcon, DollarSignIcon, DownloadIcon, UsersIcon } from 'lucide-svelte';
	import client from '$lib/services/api/index.js';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const getChartById = async (id: string) => {
		const { data, error } = await client.GET('/charts/{chart_id}', {
			params: {
				path: { chart_id: id }
			},
			headers: {
				'ngrok-skip-browser-warning': true
			}
		});

		if (error || !data) throw error;

		// const el: HTMLFrameElement = document.getElementById(id);
		// if (el) el?.contentDocument.write(data);

		// el?.appendChild(document?.createElement(data));

		return data;
	};
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
							<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
							<DollarSignIcon class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">$45,231.89</div>
							<p class="text-xs text-muted-foreground">+20.1% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
							<UsersIcon class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+2350</div>
							<p class="text-xs text-muted-foreground">+180.1% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Sales</Card.Title>
							<CreditCardIcon class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+12,234</div>
							<p class="text-xs text-muted-foreground">+19% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Active Now</Card.Title>
							<Activity class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+573</div>
							<p class="text-xs text-muted-foreground">+201 since last hour</p>
						</Card.Content>
					</Card.Root>
				</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card.Root class="col-span-4">
						<Card.Header>
							<Card.Title>Message Histogram</Card.Title>
						</Card.Header>
						<Card.Content>
							{#if browser}
								{#await getChartById('message-histogram')}
									<div
										class="flex flex-col items-center justify-center gap-1.5 text-xs text-muted-foreground"
									>
										<Spinner class="size-6" />
										<p>Loading Message Histogram</p>
									</div>
									<!-- <div id="message-histogram"></div> -->
									<iframe id="message-histogram" title="message-histogram" width="200" height="200"
									></iframe>
								{:then data}
									<!-- <p>{dat}</p> -->
									{@html data}
								{:catch e}
									{e}
									<p class="text-destructive">Something went wrong</p>
								{/await}
							{/if}
						</Card.Content>
					</Card.Root>
					<Card.Root class="col-span-3">
						<Card.Header>
							<Card.Title>Recent Conversations</Card.Title>
							<Card.Description>Startups had over {265} conversations this month.</Card.Description>
						</Card.Header>
						<Card.Content>
							<RecentSales />
						</Card.Content>
					</Card.Root>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
