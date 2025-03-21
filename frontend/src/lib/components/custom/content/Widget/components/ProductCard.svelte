<script lang="ts">
	import type { BackendSchema } from '$lib/types/generic';
	import type { BaseWidgetComponentProps } from '../types';
	import * as Card from '$lib/components/ui/card';

	interface Props extends BaseWidgetComponentProps {
		content: BackendSchema['ProductWidgetContent'];
	}

	const { content, prefix, suffix }: Props = $props();
</script>

<Card.Root class="w-full">
	<Card.Content class="p-4">
		<div class="flex flex-col gap-4 md:flex-row">
			{#if content.source}
				<div class="w-full md:w-1/3">
					<img
						src={content.source}
						alt={content.title}
						class="aspect-square w-full rounded-md object-cover"
					/>
				</div>
			{/if}

			<div class="w-full md:w-2/3">
				{#if content.title}
					<h3 class="mb-2 text-xl font-semibold">{content.title}</h3>
				{/if}

				{#if content.subtitle}
					<h4 class="mb-3 text-base text-muted-foreground">{content.subtitle}</h4>
				{/if}

				{#if content.price}
					<div class="mb-3 text-lg font-bold">
						{#if content.price.currency}
							{content.price.currency}
						{/if}
						{content.price.amount}
					</div>
				{/if}

				{#if content.description}
					<p class="whitespace-pre-wrap text-sm">{content.description}</p>
				{/if}
			</div>
		</div>
	</Card.Content>
</Card.Root>
