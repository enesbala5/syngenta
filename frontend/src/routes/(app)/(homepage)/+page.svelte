<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import { DownloadIcon, MessageSquareIcon, RocketIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import InsightsSection from './components/InsightsSection/InsightsSection.svelte';
	import { DatePickerWithRange } from './components/InsightsSection';
	import { Label } from '$lib/components/ui/label';
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import { quartInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import client from '$lib/services/api';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';
	import HelloWidget from '$lib/components/custom/content/Widget/components/HelloWidget.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { MessageSquare, PlusIcon } from 'lucide-svelte';
	import { RequestMethod } from '$lib/data/generic';
	import { authenticationState } from '$lib/components/custom/content/AuthenticationComponent/state.svelte';
	import { mockWidgets } from './data';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { crops, type BaseCropInterface } from '$lib/components/custom/content/Field/data';
	import { mockFields } from '$lib/components/custom/content/Field/data';
	import Field from '$lib/components/custom/content/Field/Field.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { user, widgets } = data;

	// State for field management
	let selectedCrop: BaseCropInterface = $state(crops[0]);
	let fields = $state(mockFields);
	let newFieldName = $state('');
	let newFieldArea = $state(100);
</script>

<main class="!px-0 pt-2 md:px-4 lg:pb-24">
	<!-- <section class="flex flex-col gap-3 lg:gap-4">
		<h1 class="h1">Insights</h1>
		<div class="relative flex flex-col">
			<p class="max-w-[90%] text-lg">View all your project's insights from one dashboard</p>
		</div>
	</section> -->

	<div class="flex flex-col space-y-2">
		<h2 class="h2">Dashboard</h2>

		<HelloWidget
			content={{
				title: 'Hello',
				name: 'Enes Bala'
			}}
		/>

		<div class="flex items-center space-x-2">
			<p>Explore the data and insights of registered startups at a glance.</p>
			<!-- <DatePickerWithRange /> -->
			<!-- <Button size="sm">
				<DownloadIcon class="mr-2 h-4 w-4" />
				Download
			</Button> -->
		</div>
	</div>

	<section class="relative mt-6 lg:mt-8">
		<InsightsSection data={{ widgets: mockWidgets ?? [] }}>
			<section class="col-span-full mt-10">
				<div class="mb-6 flex flex-col space-y-2">
					<h2 class="h2">My Fields</h2>
					<p>Manage your agricultural fields and monitor their status.</p>
				</div>
			</section>

			{#each fields as field (field.label)}
				<Card.Root class="flex flex-col bg-red-500">
					<Card.Header>
						<Card.Title>{field.label}</Card.Title>
						<Card.Description>
							Area: {field.size.area} m²
						</Card.Description>
					</Card.Header>
					<Card.Content class="flex-grow">
						<div class="flex items-center gap-2">
							<span class="font-medium">Crop:</span>
							{crops.find((crop) => crop.id === field.cropId)?.title || 'Unknown'}
						</div>
						<div class="mt-2 text-sm text-muted-foreground">
							Created: {field.createdAt.toLocaleDateString()}
						</div>
					</Card.Content>
					<Card.Footer class="flex justify-end">
						<AlertDialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
							View Details
						</AlertDialog.Trigger>
					</Card.Footer>
				</Card.Root>
			{/each}

			<!-- Add Field Card -->
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Card.Root
						class="flex h-full min-h-[200px] cursor-pointer flex-col items-center justify-center border-dashed transition-colors hover:bg-accent/10"
					>
						<Card.Content class="flex h-full flex-col items-center justify-center">
							<PlusIcon class="mb-2 h-12 w-12 text-muted-foreground" />
							<p class="font-medium text-muted-foreground">Add New Field</p>
						</Card.Content>
					</Card.Root>
				</AlertDialog.Trigger>

				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Add New Field</AlertDialog.Title>
						<AlertDialog.Description>
							Create a new field by providing the details below.
						</AlertDialog.Description>
					</AlertDialog.Header>

					<div class="grid gap-4 py-4">
						<div class="grid gap-2">
							<Label for="field-name">Field Name</Label>
							<Input id="field-name" bind:value={newFieldName} placeholder="Enter field name" />
						</div>

						<div class="grid gap-2">
							<Label for="field-area">Area (m²)</Label>
							<Input id="field-area" type="number" bind:value={newFieldArea} min="1" />
						</div>

						<div class="grid gap-2">
							<Label>Select Crop</Label>
							<div class="grid max-h-[200px] grid-cols-2 gap-2 overflow-y-auto p-1 md:grid-cols-3">
								{#each crops as crop (crop.id)}
									<Button
										variant={selectedCrop.id === crop.id ? 'default' : 'outline'}
										class="h-auto justify-start gap-2 py-2"
										onclick={() => (selectedCrop = crop)}
									>
										<div
											class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
										>
											{crop.title.charAt(0)}
										</div>
										<span class="text-sm">{crop.title}</span>
									</Button>
								{/each}
							</div>
						</div>
					</div>

					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action
							onclick={() => {
								if (newFieldName.trim()) {
									fields.push({
										label: newFieldName,
										createdAt: new Date(),
										size: { area: newFieldArea },
										cropId: selectedCrop.id as BaseCropInterface['id'] as any,
										ownerId: user?.phone_number || '1'
									});

									newFieldName = '';
									newFieldArea = 100;
									toast.success('Field added successfully!');
								} else {
									toast.error('Please enter a field name');
								}
							}}
						>
							Add Field
						</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</InsightsSection>
	</section>

	<!-- Fields Section -->
</main>
