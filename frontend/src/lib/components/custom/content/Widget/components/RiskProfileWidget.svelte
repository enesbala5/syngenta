<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { BackendSchema } from '$lib/types/generic';

	interface Props {
		content: any;
	}

	const { content }: Props = $props();

	let showDescription = $state(false);

	const toggleDescription = () => {
		showDescription = !showDescription;
	};

	const scores = $state(content.scores || { stress: 0, yield: 0, nutrient: 0 });
</script>

<div class="risk-profile-widget">
	<h3 class="mb-2 text-xl font-medium">{content.title || 'Risk Profile'}</h3>

	<div class="mt-3 grid gap-3">
		{#if scores.stress !== undefined}
			<div class="score-item">
				<div class="mb-1 flex justify-between">
					<span>Stress Score</span>
					<span class="font-medium">{scores.stress}%</span>
				</div>
				<div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
					<div class="h-2 rounded-full bg-rose-500" style="width: {scores.stress}%"></div>
				</div>
			</div>
		{/if}

		{#if scores.yield !== undefined}
			<div class="score-item">
				<div class="mb-1 flex justify-between">
					<span>Yield Score</span>
					<span class="font-medium">{scores.yield}%</span>
				</div>
				<div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
					<div class="h-2 rounded-full bg-green-500" style="width: {scores.yield}%"></div>
				</div>
			</div>
		{/if}

		{#if scores.nutrient !== undefined}
			<div class="score-item">
				<div class="mb-1 flex justify-between">
					<span>Nutrient Score</span>
					<span class="font-medium">{scores.nutrient}%</span>
				</div>
				<div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
					<div class="h-2 rounded-full bg-blue-500" style="width: {scores.nutrient}%"></div>
				</div>
			</div>

			<button
				class={buttonVariants({ variant: 'outline', size: 'sm' })}
				onclick={toggleDescription}
			>
				{showDescription ? 'Hide Description' : 'Description'}
			</button>

			{#if showDescription}
				<div class="mt-2 rounded-md bg-gray-100 p-3 text-sm dark:bg-gray-800">
					<p>{content.description || 'No description available.'}</p>
				</div>
			{/if}
		{/if}
	</div>
</div>
