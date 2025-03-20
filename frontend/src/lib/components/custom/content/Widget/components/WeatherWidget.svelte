<script lang="ts">
  import type { WidgetContent, WidgetInterface } from '../data';
  
  interface Props {
    content: WidgetContent
}

const { content }: Props = $props()
</script>

<div class="weather-widget">
  <h3 class="text-xl font-medium mb-2">{content.title || 'Weather'}</h3>
  
  {#if content.location}
    <p class="text-sm text-muted-foreground">{content.location}</p>
  {/if}
  
  <div class="mt-3 flex items-center justify-between">
    <div class="weather-icon text-4xl">
      {#if content.weatherType === 'sunny'}
        ☀️
      {:else if content.weatherType === 'cloudy'}
        ☁️
      {:else if content.weatherType === 'rainy'}
        🌧️
      {:else if content.weatherType === 'stormy'}
        ⛈️
      {:else}
        🌤️
      {/if}
    </div>
    
    <div class="weather-temp text-3xl font-bold">
      {content.temperature || '--'}°{content.unit || 'C'}
    </div>
  </div>
  
  {#if content.forecast}
    <div class="mt-4 grid grid-cols-5 gap-2">
      {#each content.forecast as day}
        <div class="forecast-day flex flex-col items-center">
          <span class="text-xs">{day.day}</span>
          <span class="text-lg my-1">{day.icon}</span>
          <span class="text-xs font-medium">{day.temp}°</span>
        </div>
      {/each}
    </div>
  {/if}
</div> 