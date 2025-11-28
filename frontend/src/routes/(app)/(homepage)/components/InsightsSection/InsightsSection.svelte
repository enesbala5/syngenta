<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import client from '$lib/services/api/index.js';
	import { AlertTriangleIcon } from 'lucide-svelte';
	import WidgetWrapper from '$lib/components/custom/content/Widget/WidgetWrapper.svelte';
	import type { WidgetType } from '$lib/components/custom/content/Widget/data.js';
	import type { Snippet } from 'svelte';
	import { authToken } from '$lib/index';
	import { getWidgetByType } from '../../functions';

	interface Props {
		data: {
			widgets: any;
		};
		children?: Snippet;
	}

	let { data, children }: Props = $props();
	const { widgets } = data;
</script>

<div class="flex flex-col border-t">
	<!-- <div class="flex h-16 items-center">
			<TeamSwitcher />
		</div> -->

	<div class="flex-1 space-y-4 pt-6">
		<!-- <Tabs.Root value="overview" class="relative space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="analytics" disabled>Analytics</Tabs.Trigger>
				<Tabs.Trigger value="reports" disabled>Reports</Tabs.Trigger>
				<Tabs.Trigger value="notifications" disabled>Notifications</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="overview" class="absolute inset-x-0 space-y-4 overflow-auto"> -->
		<div class="grid w-full lg:grid-cols-2">
			{@render children?.()}

			<!-- {#await getWidgetByType('general_risk')}
				<Card.Root class="col-span-2">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<Spinner class="size-6" />
						<Card.Description>Loading widget...</Card.Description>
					</Card.Content>
				</Card.Root>
			{:then widget}
				<WidgetWrapper widget={widget as any} class="col-span-2" />
			{:catch error}
				<Card.Root class="col-span-2">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<AlertTriangleIcon class="size-6" />
						<Card.Description>Something went wrong</Card.Description>
					</Card.Content>
				</Card.Root>
			{/await} -->

			<!-- {#await getWidgetByType('harvest')}
				<Card.Root class="col-span-2 w-full">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<Spinner class="size-6" />
						<Card.Description>Loading widget...</Card.Description>
					</Card.Content>
				</Card.Root>
			{:then widget}
				<WidgetWrapper widget={widget as any} class="col-span-2" />
			{:catch error}
				<Card.Root class="col-span-2 w-full">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<AlertTriangleIcon class="size-6" />
						<Card.Description>Something went wrong</Card.Description>
					</Card.Content>
				</Card.Root>
			{/await} -->

			{#await getWidgetByType('image')}
				<Card.Root class="col-span-2">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<Spinner class="size-6" />
						<Card.Description>Loading widget...</Card.Description>
					</Card.Content>
				</Card.Root>
			{:then widget}
				<WidgetWrapper widget={widget as any} class="col-span-2" />
			{:catch error}
				<Card.Root class="col-span-2">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<AlertTriangleIcon class="size-6" />
						<Card.Description>Something went wrong</Card.Description>
					</Card.Content>
				</Card.Root>
			{/await}

			<!-- {#await getWidgetByType('video')}
				<Card.Root class="col-span-2 w-full">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<Spinner class="size-6" />
						<Card.Description>Loading widget...</Card.Description>
					</Card.Content>
				</Card.Root>
			{:then widget}
				<WidgetWrapper widget={widget as any} class="col-span-2" />
			{:catch error}
				<Card.Root class="col-span-2 w-full">
					<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
						<AlertTriangleIcon class="size-6" />
						<Card.Description>Something went wrong</Card.Description>
					</Card.Content>
				</Card.Root>
			{/await} -->

			<!-- <div class="flex h-16 items-center">
			<TeamSwitcher />
		</div> -->

			<!-- <div class="flex-1 space-y-4 pt-6"> -->
				<!-- <Tabs.Root value="overview" class="relative space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="analytics" disabled>Analytics</Tabs.Trigger>
				<Tabs.Trigger value="reports" disabled>Reports</Tabs.Trigger>
				<Tabs.Trigger value="notifications" disabled>Notifications</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="overview" class="absolute inset-x-0 space-y-4 overflow-auto"> -->
				<!-- <div class="relative !flex w-full flex-col bg-red-500 col-span-2 px-2"> -->
					{@render children?.()}

					{#await getWidgetByType('harvest')}
						<Card.Root class="col-span-2 w-full">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} class="!max-h-96 overflow-y-auto" />
					{:catch error}
						<Card.Root class="col-span-2 w-full">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}

					{#await getWidgetByType('video')}
						<Card.Root class="col-span-2 w-full">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} class="!max-h-96 overflow-y-auto" />
					{:catch error}
						<Card.Root class="col-span-2 w-full">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}

					<!-- {#await getWidgetByType('general_risk')}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} class='!max-h-96 overflow-y-auto' />
					{:catch error}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}

					{#await getWidgetByType('chart')}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} class='!max-h-96 overflow-y-auto' />
					{:catch error}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}


					{#await getWidgetByType('image')}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} class='!max-h-96 overflow-y-auto' />
					{:catch error}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}

	
					{#await getWidgetByType('nutrient_risk')}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} class='!max-h-96 overflow-y-auto' />
					{:catch error}
						<Card.Root>
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await} -->

					<!-- {#each widgets as widget, i}
						<WidgetWrapper {widget} class="col-span-2" />
					{/each} -->
					<!-- <pre class="text-red-500">{JSON.stringify(widget, null, 2)}</pre> -->
				</div>
				<!-- </Tabs.Content>
		</Tabs.Root> -->
			<!-- </div> -->

			<!-- <WidgetWrapper {widget} /> -->
		<!-- </div> -->
		<!-- </Tabs.Content>
		</Tabs.Root> -->
	</div>
</div>
