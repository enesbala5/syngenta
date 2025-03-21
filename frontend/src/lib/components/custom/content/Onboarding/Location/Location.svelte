<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { PlaceAutocomplete } from 'places-autocomplete-svelte';
	import * as Input from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';

	// Consolidated location data
	let location = $state({
		lat: 15.28279,
		lng: 78.51423,
		city: 'Andhra Pradesh',
		country: 'India',
		address: 'Rudravaram'
	});

	// Response handler
	let fullResponse = $state('');

	let onResponse = (response: any) => {
		fullResponse = response;
		if (response.geometry?.location) {
			location.lat = response.geometry.location.lat();
			location.lng = response.geometry.location.lng();
		}

		// Extract address components
		if (response.address_components) {
			const components = response.address_components;
			for (const component of components) {
				const types = component.types;

				if (types.includes('locality')) {
					location.city = component.long_name;
				} else if (types.includes('country')) {
					location.country = component.long_name;
				}
			}
		}
	};

	// Error handler
	let pacError = $state('');

	let onError = (error: string) => {
		pacError = error;
	};

	const PUBLIC_GOOGLE_MAPS_API_KEY = 'PUBLIC_GOOGLE_MAPS_API_KEY';
</script>

<Card.Root class="flex size-full flex-row items-stretch">
	<div class="flex w-2/3 grow flex-col overflow-hidden rounded-md bg-neutral-50">
		{#key [location.lat, location.lng]}
			{#if location.lat !== 0 && location.lng !== 0}
				<iframe
					title="Google Maps"
					src={`https://maps.google.com/maps?q=${location.lat}, ${location.lng}&z=15&output=embed`}
					width="100%"
					height="100%"
					frameborder="0"
					style="border:0"
				></iframe>
			{:else}
				<div class="flex h-full items-center justify-center text-muted-foreground">
					Select a location to see the preview
				</div>
			{/if}
		{/key}
	</div>

	<Card.Content class="h-full w-1/3 !p-2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Where is your farm located?</Card.Title>
				<Card.Description>Enter the location of your farm</Card.Description>
			</Card.Header>
			<Card.Content>
				<form class="space-y-4">
					<!-- <div class="space-y-2">
						<Label for="location-search" >Search Location</Label>
						<PlaceAutocomplete {onResponse} {onError} {PUBLIC_GOOGLE_MAPS_API_KEY} options={{ autofocus: true, classes: {icon: ''} }} />
						{#if pacError}
							<p class="text-sm text-red-500">{pacError}</p>
						{/if}
					</div> -->

					<div class="space-y-2">
						<Label for="address">Address</Label>
						<Input.Root id="address" bind:value={location.address} placeholder="Address" />
					</div>

					<div class="space-y-2">
						<Label for="city">City</Label>
						<Input.Root id="city" bind:value={location.city} placeholder="City" />
					</div>

					<div class="space-y-2">
						<Label for="country">Country</Label>
						<Input.Root id="country" bind:value={location.country} placeholder="Country" />
					</div>
				</form>
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button type="submit">Continue</Button>
			</Card.Footer>
		</Card.Root>
	</Card.Content>
</Card.Root>
