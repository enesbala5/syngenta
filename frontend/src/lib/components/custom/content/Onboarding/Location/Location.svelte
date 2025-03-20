<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { PlaceAutocomplete } from 'places-autocomplete-svelte';

	// Response handler
	let fullResponse = $state('');

	let onResponse = (response: any) => {
		fullResponse = response;
		if (response.geometry?.location) {
			lat = response.geometry.location.lat();
			lng = response.geometry.location.lng();
		}
	};

	// Error handler
	let pacError = $state('');

	let onError = (error: string) => {
		pacError = error;
	};

	const PUBLIC_GOOGLE_MAPS_API_KEY = 'PUBLIC_GOOGLE_MAPS_API_KEY';

	let lat = $state(0);
	let lng = $state(0);
</script>

<Card.Root class="flex size-full flex-row items-center">
	<div class="h-full w-1/2">
		{#key [lat, lng]}
			{#if lat !== 0 && lng !== 0}
				<iframe
					title="Location Map"
					width="100%"
					height="100%"
					style="border:0"
					loading="lazy"
					allowfullscreen
					referrerpolicy="no-referrer-when-downgrade"
					src={`https://www.google.com/maps/embed/v1/place?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=15`}
				>
				</iframe>
			{:else}
				<div class="flex h-full items-center justify-center text-muted-foreground">
					Select a location to see the preview
				</div>
			{/if}
		{/key}
	</div>

	<Card.Content class="h-full w-1/2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Where is your farm located?</Card.Title>
				<Card.Description>Enter the location of your farm</Card.Description>
			</Card.Header>
			<Card.Content>
				<PlaceAutocomplete
					{onResponse}
					{onError}
					{PUBLIC_GOOGLE_MAPS_API_KEY}
					options={{
						autofocus: true,
						classes: {}
					}}
				/>
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</Card.Content>
</Card.Root>
