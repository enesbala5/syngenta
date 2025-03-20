<script lang="ts">
	import type { BackendSchema } from '$lib/types/generic';

	interface Props {
		content: BackendSchema['ExplanationContent'];
	}

	const { content }: Props = $props();
</script>

<div class="explanation-widget">
	<h3 class="mb-2 text-xl font-medium">{content.title || 'Explanation'}</h3>

	{#if content.subtitle}
		<p class="mb-3 text-sm text-muted-foreground">{content.subtitle}</p>
	{/if}

	{#if content.steps && content.steps.length > 0}
		<div class="mt-3 space-y-3">
			{#each content.steps as step, i}
				<div class="step flex gap-3">
					<div
						class="step-number flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
					>
						{i + 1}
					</div>
					<div class="step-content">
						<p>{step}</p>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-muted-foreground">No explanation steps available.</p>
	{/if}
</div>
