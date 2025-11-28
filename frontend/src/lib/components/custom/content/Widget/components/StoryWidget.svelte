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

<div class="story-widget flex size-full">
	<!-- <h3 class="mb-2 text-xl font-medium">{content?.title || 'Story'}</h3> -->

	{#if slides.length > 0}
		<Carousel.Root class="w-full max-w-xs h-96">
			<Carousel.Content class="">
				{#each slides as slide, i (i)}
					<Carousel.Item>
						<Card.Root class="relative w-96  overflow-hidden  h-[22.75rem]">
							{#if slide.imageUrl}
								<img
									src={slide.imageUrl}
									alt={slide.title || ''}
									class="object-fill size-full rounded-md opacity-30 mix-blend-lighten"
								/>
							{/if}

							<Card.Content
								class="absolute inset-0 flex flex-col items-start justify-end gap-1.5 p-3 backdrop-blur-sm lg:gap-2.5 lg:p-6"
							>
								<h4 class="text-xl font-semibold leading-none">{slide.title || ''}</h4>
								<p class="text-xl leading-none opacity-60">{slide.content || ''}</p>
							</Card.Content>
						</Card.Root>
					</Carousel.Item>
				{/each}
				<!-- {#each Array(5) as _, i (i)}
      <Carousel.Item>
        <div class="p-1">
          <Card.Root>
            <Card.Content
              class="flex aspect-square items-center justify-center p-6"
            >
              <span class="text-4xl font-semibold">{i + 1}</span>
            </Card.Content>
          </Card.Root>
        </div>
      </Carousel.Item>
    {/each} -->
			</Carousel.Content>
			<Carousel.Previous class="left-2 " />
			<Carousel.Next class="right-2 " />
			<!-- 
			<Carousel.Root class="bg-green-500 h-full flex flex-col">
				<Carousel.Content class="grow inset-0">
					{#each slides as slide, i (i)}
						<Carousel.Item class="bg-yellow-500">
							<Card.Root class="relative size-full ">
								{#if slide.imageUrl}
									<img
										src={slide.imageUrl}
										alt={slide.title || ''}
										class="size-full rounded-md object-cover mix-blend-multiply"
									/>
								{/if}

								<Card.Content
									class="flex absolute inset-0 flex-col items-center justify-center gap-2 backdrop-blur-sm p-3 "
								>
									<h4 class="font-medium">{slide.title || ''}</h4>
									<p class="mt-1 text-sm text-muted-foreground">{slide.content || ''}</p>
								</Card.Content>
							</Card.Root>
						</Carousel.Item>
					{/each}
				</Carousel.Content> -->

			{#if totalSlides > 1}
				<!-- <div class="mt-2 flex scale-90 items-center justify-center">
						<Carousel.Previous class="mr-2" />
						<Carousel.Next />
					</div> -->
			{/if}
		</Carousel.Root>
	{:else}
		<p class="text-muted-foreground">No story slides available.</p>
	{/if}
</div>
