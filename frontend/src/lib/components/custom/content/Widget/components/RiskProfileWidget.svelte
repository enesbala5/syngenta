<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';

	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import type { BackendSchema } from '$lib/types/generic';
	import { cn } from '$lib/utils';
	import WidgetWrapper from '../WidgetWrapper.svelte';
	import { getRiskStyle } from '../data';
	import WeatherDisplay from '$lib/components/custom/general/WeatherDisplay/WeatherDisplay.svelte';

	interface Props {
		content:
			| BackendSchema['YieldRiskProfileContent']
			| BackendSchema['GeneralRiskProfileContent']
			| BackendSchema['StressRiskProfileContent']
			| BackendSchema['NutrientRiskProfileContent'];
		user?: any;
	}

	const { content }: Props = $props();

	let showDescription = $state(false);

	const toggleDescription = () => {
		showDescription = !showDescription;
	};

	const value = $state(content?.value || 0);
	const unit = $state(content?.unit || '%');

	const displayValue = $derived(typeof value === 'number' ? Math.round(value) : value);

	// Function to get appropriate icon based on progress score
	function getRiskIcon(progress: number): string {
		if (progress >= 90) return 'code-green';
		if (progress >= 75) return 'code-green';
		if (progress >= 50) return 'code-yellow';
		if (progress >= 25) return 'code-orange';
		return 'code-red';
	}

	const icon = $derived(getRiskIcon(value));
</script>

<div
	class="flex size-full max-h-96 grow flex-col items-center overflow-auto bg-gradient-to-tr from-red-50 to-red-100 p-4 text-center"
>
	{#if icon}
		<Card.Root class="mb-4 size-28 !p-2">
			<WeatherDisplay {icon} class="object-fill " />
		</Card.Root>
	{/if}

	<h3 class="mb-2 text-xl font-semibold">{content?.title || 'Risk Profile'}</h3>
	<div class="mt-3 grid gap-3">
		<div class="mb-1 flex justify-between">
			<span>{content?.subtitle}</span>
			<span class={cn('font-medium', getRiskStyle(displayValue).text)}>{displayValue}{unit}</span>
		</div>
		<div class="h-5 rounded-full bg-gray-200 dark:bg-gray-700">
			<div
				class={cn('h-5 rounded-full bg-gradient-to-r', getRiskStyle(displayValue).gradient)}
				style="width: {Math.min(displayValue, 100)}%"
			></div>
		</div>

		<div class="flex w-full items-center justify-between">
			<p class="text-sm text-neutral-800 opacity-70">{Math.min(displayValue, 100)}</p>
			<p class="text-sm text-neutral-800 opacity-70">{Math.max(displayValue, 0)}</p>
		</div>
	</div>

	{#if content?.package}
		<div class="mt-4 flex justify-center">
			<AlertDialog.Root>
				<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
					{content?.package?.button?.text || 'View Package'}
				</AlertDialog.Trigger>
				<AlertDialog.Content class="max-w-md">
					<AlertDialog.Header>
						<AlertDialog.Title>Package Details</AlertDialog.Title>
						<AlertDialog.Description>
							{#if content?.package?.widgets && content?.package?.widgets?.length > 0}
								<div class="mt-2">
									<p>This package contains {content?.package?.widgets?.length} widget(s).</p>
								</div>
							{:else}
								<p>No additional details available for this package.</p>
							{/if}
						</AlertDialog.Description>
					</AlertDialog.Header>
					{#each content?.package?.widgets as widget, i}
						<!-- <WidgetWrapper {widget} /> -->
						<!-- <pre class="text-red-500">{JSON.stringify(widget, null, 2)}</pre> -->
					{/each}
					<AlertDialog.Footer class="flex justify-center">
						<AlertDialog.Cancel>Close</AlertDialog.Cancel>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	{/if}
</div>
