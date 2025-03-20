<script lang="ts">
  import type { WidgetContent, WidgetInterface } from '../data';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  
  interface Props {
    content: WidgetContent
}

const { content }: Props = $props()
  
  let showDescription = false;
  
  const toggleDescription = () => {
    showDescription = !showDescription;
  };
  
  $: scores = content.scores || { stress: 0, yield: 0, nutrient: 0 };
</script>

<div class="risk-profile-widget">
  <h3 class="text-xl font-medium mb-2">{content.title || 'Risk Profile'}</h3>
  
  <div class="grid gap-3 mt-3">
    {#if scores.stress !== undefined}
      <div class="score-item">
        <div class="flex justify-between mb-1">
          <span>Stress Score</span>
          <span class="font-medium">{scores.stress}%</span>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div class="h-2 bg-rose-500 rounded-full" style="width: {scores.stress}%"></div>
        </div>
      </div>
    {/if}
    
    {#if scores.yield !== undefined}
      <div class="score-item">
        <div class="flex justify-between mb-1">
          <span>Yield Score</span>
          <span class="font-medium">{scores.yield}%</span>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div class="h-2 bg-green-500 rounded-full" style="width: {scores.yield}%"></div>
        </div>
      </div>
    {/if}
    
    {#if scores.nutrient !== undefined}
      <div class="score-item">
        <div class="flex justify-between mb-1">
          <span>Nutrient Score</span>
          <span class="font-medium">{scores.nutrient}%</span>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div class="h-2 bg-blue-500 rounded-full" style="width: {scores.nutrient}%"></div>
        </div>
      </div>
      
      <button 
        class={buttonVariants({ variant: 'outline', size: 'sm' })}
        on:click={toggleDescription}
      >
        {showDescription ? 'Hide Description' : 'Description'}
      </button>
      
      {#if showDescription}
        <div class="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
          <p>{content.description || 'No description available.'}</p>
        </div>
      {/if}
    {/if}
  </div>
</div> 