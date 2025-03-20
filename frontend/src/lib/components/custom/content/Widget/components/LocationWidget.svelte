<script lang="ts">
  import type { WidgetContent, WidgetInterface } from '../data';
  
  interface Props {
    content: WidgetContent
}

const { content }: Props = $props()
</script>

<div class="location-widget">
  <h3 class="text-xl font-medium mb-2">{content.title || 'Location'}</h3>
  
  {#if content.location}
    <div class="flex items-center gap-2 mt-2">
      <span class="inline-block">📍</span>
      <span class="text-lg">{content.location}</span>
    </div>
  {/if}
  
  {#if content.subtitle}
    <p class="text-sm text-muted-foreground mt-2">{content.subtitle}</p>
  {/if}
  
  <!-- Map placeholder - would be replaced with actual map component -->
  <div class="mt-3 bg-gray-200 dark:bg-gray-700 rounded-md h-32 flex items-center justify-center">
    <span class="text-gray-500 dark:text-gray-400">Map View</span>
  </div>
</div> 