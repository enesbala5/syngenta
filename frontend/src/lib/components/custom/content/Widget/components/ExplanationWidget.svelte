<script lang="ts">
  import type { WidgetContent, WidgetInterface } from '../data';
  
  interface Props {
    content: WidgetContent
}

const { content }: Props = $props()
</script>

<div class="explanation-widget">
  <h3 class="text-xl font-medium mb-2">{content.title || 'Explanation'}</h3>
  
  {#if content.subtitle}
    <p class="text-sm text-muted-foreground mb-3">{content.subtitle}</p>
  {/if}
  
  {#if content.steps && content.steps.length > 0}
    <div class="mt-3 space-y-3">
      {#each content.steps as step, i}
        <div class="step flex gap-3">
          <div class="step-number flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
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