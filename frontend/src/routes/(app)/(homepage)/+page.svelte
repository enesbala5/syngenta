<script lang="ts">
	import { authenticationState } from '$lib/components/custom/content/AuthenticationComponent/state.svelte';
	import WelcomeWidget from '$lib/components/custom/content/Widget/components/WelcomeWidget.svelte';
	import { crops, type BaseCropInterface } from '$lib/components/custom/content/Field/data';
	import InsightsSection from './components/InsightsSection/InsightsSection.svelte';
	import { mockFields } from '$lib/components/custom/content/Field/data';
	import Field from '$lib/components/custom/content/Field/Field.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { AlertTriangleIcon, MapPinIcon, MessageSquare, PlusIcon, TrashIcon } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { company, RequestMethod } from '$lib/data/generic';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { mockWidgets } from './data';
	import { Badge } from '$lib/components/ui/badge';
	import { getWidgetByType } from './functions';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import WidgetWrapper from '$lib/components/custom/content/Widget/WidgetWrapper.svelte';
	import { cn } from '$lib/utils';
	import Location from '$lib/components/custom/content/Onboarding/Location/Location.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { user, widgets } = data;

	// State for field management
	let selectedCrop: BaseCropInterface = $state(crops[0]);
	let fields = $state(mockFields);

	let originalFields = $state(mockFields); // Store original state

	let hasChanges = $state(false); // Track if changes have been made
	let newFieldName = $state('');
	let newFieldArea = $state(100);

	let alertDialogOpen = $state(false);

	// Function to save changes
	function saveChanges() {
		// Here you would typically make an API call to save the changes
		originalFields = [...fields];
		hasChanges = false;
		toast.success('Changes saved successfully!');
	}

	// Function to cancel changes
	function cancelChanges() {
		fields = [...originalFields];
		hasChanges = false;
		toast.info('Changes discarded');
	}
</script>

<title>Homepage - {company.name}</title>

<main class="!px-0 pt-2 md:px-4 lg:pb-24">
	<!-- <section class="flex flex-col gap-3 lg:gap-4">
		<h1 class="h1">Insights</h1>
		<div class="relative flex flex-col">
			<p class="max-w-[90%] text-lg">View all your project's insights from one dashboard</p>
		</div>
	</section> -->

	<div class="flex flex-col space-y-2">
		<WelcomeWidget
			content={{
				title: 'Welcome to Syngenta Dashboard',
				subtitle: 'Explore the data and insights of registered startups at a glance.'
				// imageUrl: '/images/dashboard-banner.jpg' // Optional: Add if you have a banner image
			}}
			{user}
		>
			{#snippet suffix()}
				<Card.Root class="col-span-full ">
					<div class="flex items-center justify-between flex-wrap gap-3 px-6 pt-6">
						<Card.Header class="px-0 pt-0">
							<Card.Title>My Fields</Card.Title>
							<Card.Description
								>Manage your agricultural fields and monitor their status.</Card.Description
							>
						</Card.Header>

						<AlertDialog.Root>
							<AlertDialog.Trigger class={buttonVariants({ variant: 'outline', size: 'default' })}>
								<MapPinIcon />
								Change Farm Location
							</AlertDialog.Trigger>
							<AlertDialog.Content class="w-[1200px] max-w-[100vw] p-3 lg:max-w-[90vw]">
								<!-- <AlertDialog.Header>
									<AlertDialog.Title>Update your location</AlertDialog.Title>
									<AlertDialog.Description>
										Specify your new location and press continue to save your changes.
									</AlertDialog.Description>
								</AlertDialog.Header> -->
								<Location />
								<!-- <AlertDialog.Footer>
									<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
									<AlertDialog.Action>Continue</AlertDialog.Action>
								</AlertDialog.Footer> -->
							</AlertDialog.Content>
						</AlertDialog.Root>
					</div>
					<Card.Content
						class="col-span-full flex w-full max-w-full flex-row gap-6 overflow-x-auto overflow-y-hidden"
					>
						{#each fields as field (field.label)}
							{@const crop = crops.find((v) => v.id === field.cropId)}

							<Card.Root class="flex w-fit min-w-[400px] flex-row p-2">
								{#if crop}
									<Card.Root class="flex h-full w-full max-w-48 flex-col gap-2 p-2">
										<Card.Root class="aspect-[4/3] h-fit w-full bg-neutral-50">
											<img src={crop.image} alt="" class="h-full w-full object-contain" />
										</Card.Root>
										<div class="flex w-full items-center">
											<p class="text-sm font-semibold">{crop.title}</p>
											<p class="ml-1 text-xs italic text-muted-foreground">{crop.id}</p>
										</div>
									</Card.Root>
								{/if}
								<Card.Content class="flex w-full grow flex-col items-start justify-center p-3">
									<Card.Title>{field.label}</Card.Title>
									<Card.Description class="mt-2">
										Area: <Badge variant="outline">{field.size.area} m²</Badge>
									</Card.Description>
									<div class="mb-auto mt-4 w-full border-t pt-4 text-xs text-muted-foreground">
										Created: {field.createdAt.toLocaleDateString()}
									</div>
									<AlertDialog.Root>
										<AlertDialog.Trigger
											class={buttonVariants({ variant: 'outline', size: 'sm', class: '' })}
										>
											<TrashIcon />
											Delete Field
										</AlertDialog.Trigger>
										<AlertDialog.Content>
											<AlertDialog.Header>
												<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
												<AlertDialog.Description>
													This action cannot be undone. This will permanently delete your account
													and remove your data from our servers.
												</AlertDialog.Description>
											</AlertDialog.Header>
											<AlertDialog.Footer>
												<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
												<AlertDialog.Action
													class={buttonVariants({ variant: 'destructive' })}
													onclick={() => {
														fields = fields.filter((f) => f.label !== field.label);
														hasChanges = true;
														toast.success('Field deleted successfully!');
													}}
												>
													Continue
												</AlertDialog.Action>
											</AlertDialog.Footer>
										</AlertDialog.Content>
									</AlertDialog.Root>
								</Card.Content>
							</Card.Root>
						{/each}

						<!-- Add Field Card -->
						<AlertDialog.Root
							bind:open={alertDialogOpen}
							onOpenChange={(open) => {
								if (open) newFieldName = `Field ${fields.length + 1}`;
							}}
						>
							<AlertDialog.Trigger>
								{#snippet child({ props })}
									<Card.Root
										{...props}
										class="flex w-80 shrink-0 cursor-pointer flex-col items-center justify-center border-dashed transition-colors hover:bg-accent/10"
										role="button"
									>
										<PlusIcon class="mb-2 h-12 w-12 text-muted-foreground" />
										<p class="font-medium text-muted-foreground">Add New Field</p>
									</Card.Root>
								{/snippet}
							</AlertDialog.Trigger>

							<AlertDialog.Content
								class="col-span-2 w-[800px] max-w-[100vw] p-3 lg:max-w-[90vw] lg:p-6"
							>
								<AlertDialog.Header>
									<AlertDialog.Title>Add New Field</AlertDialog.Title>
									<AlertDialog.Description>
										Create a new field by providing the details below.
									</AlertDialog.Description>
								</AlertDialog.Header>

								<div class="grid gap-4 py-4">
									<div class="grid gap-2">
										<Label for="field-name">Field Name</Label>
										<Input
											id="field-name"
											bind:value={newFieldName}
											placeholder="Enter field name"
										/>
									</div>

									<div class="grid gap-2">
										<Label for="field-area">Area (m²)</Label>
										<Input id="field-area" type="number" bind:value={newFieldArea} min="1" />
									</div>

									<div class="grid gap-2">
										<Label>Select Crop</Label>
										<div
											class="grid max-h-[200px] grid-cols-2 gap-2 overflow-y-auto p-1 md:grid-cols-3"
										>
											{#each crops as crop (crop.id)}
												<Button
													variant={'outline'}
													class={cn(
														'h-auto justify-start gap-2 py-1 pl-1',
														selectedCrop.id === crop.id
															? 'border-primary bg-primary/10 hover:bg-primary/10'
															: 'hover:border-primary/20 hover:bg-primary/5'
													)}
													onclick={() => (selectedCrop = crop)}
												>
													<Card.Root class="h-full w-20 rounded-sm bg-neutral-50">
														<img src={crop.image} alt="" class="h-full w-full object-contain" />
													</Card.Root>
													<span class="text-sm font-semibold">{crop.title}</span>
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
												hasChanges = true; // Mark that changes have been made
												toast.success('Field added successfully!');
												alertDialogOpen = false;
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
					</Card.Content>
					<!-- Save/Cancel Changes Section -->
					{#if hasChanges}
						<Card.Footer class="flex w-full justify-end gap-2">
							<Button variant="outline" onclick={cancelChanges}>Cancel Changes</Button>
							<Button onclick={saveChanges}>Save Changes</Button>
						</Card.Footer>
					{/if}
				</Card.Root>

				<div class="col-span-full grid w-full gap-4 lg:grid-cols-6">
					{#await getWidgetByType('weather')}
						<Card.Root class="col-span-2">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} />
					{:catch error}
						<Card.Root class="col-span-2">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}
					{#await getWidgetByType('location')}
						<Card.Root class="col-span-2">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} />
					{:catch error}
						<Card.Root class="col-span-2">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}

					{#await getWidgetByType('story')}
						<Card.Root class="col-span-2">
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<Spinner class="size-6" />
								<Card.Description>Loading widget...</Card.Description>
							</Card.Content>
						</Card.Root>
					{:then widget}
						<WidgetWrapper widget={widget as any} />
					{:catch error}
						<Card.Root class="col-span-2"
							>e
							<Card.Content class="flex size-full flex-col items-center justify-center gap-3">
								<AlertTriangleIcon class="size-6" />
								<Card.Description>Something went wrong</Card.Description>
							</Card.Content>
						</Card.Root>
					{/await}
				</div>
			{/snippet}
		</WelcomeWidget>

		<div class="flex items-center space-x-2">
			<!-- <DatePickerWithRange /> -->
			<!-- <Button size="sm">
				<DownloadIcon class="mr-2 h-4 w-4" />
				Download
			</Button> -->
		</div>
	</div>

	<!-- Comment out or remove this debug output -->
	<section class="relative mt-6 lg:mt-8">
		<InsightsSection data={{ widgets: widgets ?? [] }}>
			<!-- <Location /> -->
		</InsightsSection>
	</section>

	<!-- Fields Section -->
</main>
