<script lang="ts">
	import type { BackendSchema } from '$lib/types/generic';
	import type { BaseWidgetComponentProps } from '../types';
	import * as Card from '$lib/components/ui/card';

	interface Props extends BaseWidgetComponentProps {
		content: BackendSchema['TextWidgetContent'];
	}

	const { content, prefix, suffix }: Props = $props();
</script>

<Card.Root class="w-full">
	<Card.Content class="p-4">
		{@render prefix?.()}

		{#if content.title}
			<h3 class="mb-2 text-xl font-semibold">{content.title}</h3>
		{/if}

		{#if content.subtitle}
			<h4 class="mb-3 text-base text-muted-foreground">{content.subtitle}</h4>
		{/if}

		{#if content.description}
			<p class="whitespace-pre-wrap text-sm">{content.description}</p>
		{/if}

		{@render suffix?.()}
	</Card.Content>
</Card.Root>
