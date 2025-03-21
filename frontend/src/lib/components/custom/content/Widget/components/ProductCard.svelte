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
		{#if prefix}
			{@render prefix()}
		{/if}

		<div class="flex flex-col md:flex-row gap-4">
			{#if content.source}
				<div class="w-full md:w-1/3">
					<img 
						src={content.source} 
						alt={content.title} 
						class="w-full h-auto object-cover rounded-md"
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

		{#if suffix}
			{@render suffix()}
		{/if}
	</Card.Content>
</Card.Root>
