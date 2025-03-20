<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { BackendSchema } from '$lib/types/generic';

	interface Props {
		content: BackendSchema['StoryContent'];
	}

	const { content }: Props = $props();

	const slides = $derived(content.slides || []);
	const totalSlides = $derived(slides.length);
</script>

<div class="story-widget">
	<h3 class="mb-2 text-xl font-medium">{content.title || 'Story'}</h3>

	{#if slides.length > 0}
		<div class="relative mt-3">
			<Carousel.Root class="w-full">
				<Carousel.Content>
					{#each slides as slide, i (i)}
						<Carousel.Item>
							<div class="p-1">
								<Card.Root class="relative">
									{#if slide.imageUrl}
										<img
											src={slide.imageUrl}
											alt={slide.title || ''}
											class="absolute inset-0 w-full rounded-t-md object-cover opacity-10 mix-blend-multiply"
										/>
									{/if}

									<Card.Content
										class="absolute inset-0 flex items-center justify-center gap-2 bg-white/90 p-3 dark:bg-black/90"
									>
										<h4 class="font-medium">{slide.title || ''}</h4>
										<p class="mt-1 text-sm">{slide.content || ''}</p>
									</Card.Content>
								</Card.Root>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>

				{#if totalSlides > 1}
					<div class="mt-2 flex scale-90 items-center justify-center">
						<Carousel.Previous class="mr-2" />
						<Carousel.Next />
					</div>
				{/if}
			</Carousel.Root>
		</div>
	{:else}
		<p class="text-muted-foreground">No story slides available.</p>
	{/if}
</div>
