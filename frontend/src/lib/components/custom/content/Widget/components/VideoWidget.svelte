<script lang="ts">
  import type { WidgetContent, WidgetInterface } from '../data';
  
  interface Props {
    content: WidgetContent
}

const { content }: Props = $props()
</script>

<div class="video-widget">
  {#if content.title}
    <h3 class="text-xl font-medium mb-2">{content.title}</h3>
  {/if}
  
  {#if content.subtitle}
    <p class="text-sm text-muted-foreground mb-3">{content.subtitle}</p>
  {/if}
  
  {#if content.videoUrl}
    <div class="mt-2 rounded-md overflow-hidden">
      <video 
        src={content.videoUrl} 
        autoplay={content.autoplay !== false}
        muted={content.muted !== false}
        loop={content.loop !== false}
        controls={content.controls !== false}
        class="w-full h-auto"
      ></video>
    </div>
  {:else}
    <div class="mt-2 bg-gray-200 dark:bg-gray-700 rounded-md h-40 flex items-center justify-center">
      <span class="text-gray-500 dark:text-gray-400">No video available</span>
    </div>
  {/if}
</div> 