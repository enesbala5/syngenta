<script lang="ts">
	import type { BackendSchema } from '$lib/types/generic';

	interface Props {
		content: BackendSchema['ExplanationContent'];
	}

	const { content }: Props = $props();
</script>

<div class="flex flex-col items-start gap-y-2 text-left">
	<h3 class="text-left text-xl leading-none font-medium">{content?.title || 'Explanation'}</h3>

	{#if content?.subtitle}
		<p class="text-sm text-muted-foreground">{content?.subtitle}</p>
	{/if}

	{#if content.steps && content.steps.length > 0}
		<div class="mt-3 space-y-3">
			{#each content.steps as step, i}
				<div class="step flex gap-2">
					<div
						class="step-number flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/5 text-sm font-medium text-primary"
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
