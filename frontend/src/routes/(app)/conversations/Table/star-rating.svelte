<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import { StarIcon } from 'lucide-svelte';

	let { value }: { value: number | string | null | undefined } = $props();
</script>

{#if value}
	<div class="flex shrink-0 items-center gap-0.5">
		{#each new Array(5) as _, index}
			<!-- {value} -->
			<StarIcon
				class={cn(
					'size-5',
					index < Number(value) ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-300 text-gray-300'
				)}
			/>
		{/each}
	</div>
{:else}
	<p class=" text-sm text-muted-foreground">No rating</p>
{/if}
