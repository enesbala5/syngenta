<script lang="ts">
	import { DatePickerWithRange, RecentSales, Search, TeamSwitcher, UserNav } from './index.js';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import Activity from 'lucide-svelte/icons/activity';
	import { Button } from '$lib/components/ui/button';
	import { formatSeconds } from '../../functions.js';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import client from '$lib/services/api/index.js';
	import { AlertTriangleIcon } from 'lucide-svelte';
	import WidgetWrapper from '$lib/components/custom/content/Widget/WidgetWrapper.svelte';
	import type { WidgetType } from '$lib/components/custom/content/Widget/data.js';
	import type { Snippet } from 'svelte';

	interface Props {
		data: {
			widgets: any;
		};
		children: Snippet;
	}

	let { data, children }: Props = $props();
	const { widgets } = data;

	const getWidgetByType = async (type: WidgetType) => {
		const { data, error } = await client.GET(`/widgets/{widget_type}`, {
			params: {
				path: {
					widget_type: type as any
				}
			}
		});
		if (error || !data) {
			console.error(error);
			throw new Error('Error fetching widget');
		}
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
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
					{@render children()}

					{#await getWidgetByType('weather')}
						<Card.Root>
							<Card.Content>
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} />
					{:catch error}
						<Card.Root>
							<Card.Content>
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}
					{#each widgets as widget, i}
						<!-- <Card.Root class> -->
						<WidgetWrapper {widget} />

						<!-- <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
								<Card.Title class="text-sm font-medium">Messages</Card.Title>
								<MessageSquareTextIcon class="h-4 w-4 text-muted-foreground" />
							</Card.Header> -->
						<!-- </Card.Root> -->
					{/each}
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
