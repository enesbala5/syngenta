<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import type { BackendSchema } from '$lib/types/generic';
	import { cn } from '$lib/utils';
	import WidgetWrapper from '../WidgetWrapper.svelte';

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

	type RiskCondition = 'severe' | 'bad' | 'moderate' | 'good' | 'excellent';

	const riskStyles: Record<RiskCondition, { gradient: string; text: string }> = {
		severe: {
			gradient: 'from-red-100 to-red-200',
			text: 'text-red-700'
		},
		bad: {
			gradient: 'from-orange-100 to-orange-200',
			text: 'text-orange-700'
		},
		moderate: {
			gradient: 'from-yellow-100 to-yellow-200',
			text: 'text-yellow-700'
		},
		good: {
			gradient: 'from-blue-100 to-blue-200',
			text: 'text-blue-700'
		},
		excellent: {
			gradient: 'from-green-100 to-green-200',
			text: 'text-green-700'
		}
	};

	const value = $state(content.value || 0);
	const unit = $state(content.unit || '%');

	const displayValue = $derived(typeof value === 'number' ? Math.round(value) : value);

	function getRiskStyle(score: number) {
		if (score <= 20) return riskStyles.severe;
		if (score <= 40) return riskStyles.bad;
		if (score <= 60) return riskStyles.moderate;
		if (score <= 80) return riskStyles.good;
		return riskStyles.excellent;
	}
</script>

<div class="risk-profile-widget">
	<h3 class="mb-2 text-xl font-medium">{content?.title || 'Risk Profile'}</h3>
	<div class="mt-3 grid gap-3">
		<div class="mb-1 flex justify-between">
			<span>{content?.subtitle}</span>
			<span class={cn('font-medium', getRiskStyle(displayValue).text)}>{displayValue}{unit}</span>
		</div>
		<div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
			<div
				class={cn('h-2 rounded-full bg-gradient-to-r', getRiskStyle(displayValue).gradient)}
				style="width: {Math.min(displayValue, 100)}%"
			></div>
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
						<pre class="text-red-500">{JSON.stringify(widget, null, 2)}</pre>
					{/each}
					<AlertDialog.Footer class="flex justify-center">
						<AlertDialog.Cancel>Close</AlertDialog.Cancel>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	{/if}
</div>
