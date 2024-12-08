<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { value }: { value: number | string | null | undefined } = $props();
</script>

{#if value}
	<Tooltip.Root>
		<Tooltip.Trigger
			class="w-fit max-w-24 overflow-hidden text-ellipsis whitespace-nowrap leading-none"
		>
			{value}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{value}</p>
		</Tooltip.Content>
	</Tooltip.Root>
{:else}
	<p class=" text-sm text-muted-foreground">-</p>
{/if}
