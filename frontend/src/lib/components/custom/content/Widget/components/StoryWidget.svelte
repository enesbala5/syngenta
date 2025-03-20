<script lang="ts">
  import type { WidgetContent, WidgetInterface } from '../data';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  
  interface Props {
    content: WidgetContent;
  }

  const { content }: Props = $props();
  
  const slides = $derived(content.slides || []);
  const totalSlides = $derived(slides.length);
</script>

<div class="story-widget">
  <h3 class="text-xl font-medium mb-2">{content.title || 'Story'}</h3>
  
  {#if slides.length > 0}
    <div class="mt-3 relative">
      <Carousel.Root class="w-full">
        <Carousel.Content>
          {#each slides as slide, i (i)}
            <Carousel.Item>
              <div class="p-1">
                <Card.Root>
                  {#if slide.imageUrl}
                    <img 
                      src={slide.imageUrl} 
                      alt={slide.title || ''} 
                      class="w-full h-40 object-cover rounded-t-md"
                    />
                  {/if}
                  
                  <Card.Content class="p-3 bg-white/90 dark:bg-black/90">
                    <h4 class="font-medium">{slide.title || ''}</h4>
                    <p class="text-sm mt-1">{slide.content || ''}</p>
                  </Card.Content>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        
        {#if totalSlides > 1}
          <div class="flex items-center justify-center mt-2">
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