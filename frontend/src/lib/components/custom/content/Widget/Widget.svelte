<script lang="ts">
	import Widget from './Widget.svelte';
	import type { WidgetInterface } from './data';
	import { widgetMappings } from './data';
	import { cn } from '$lib/utils';

	interface Props {
		widget: WidgetInterface;
		onclick?: () => void;
	}

	const { widget, onclick }: Props = $props();

	let expanded = $state(false);

	const { component: WidgetComponent, props: widgetProps } = $derived(
		widgetMappings()[widget.type]
	);

	let prefix = $state({
		expanded: false
	});

	let suffix = $state({
		expanded: false
	});
</script>

{#snippet nestedWidgets({ widgets }: { widgets: WidgetInterface[] })}
	<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each widgets as widget}
			<Widget {widget} />
		{/each}
	</div>
{/snippet}

{#snippet content()}
	{#if widget?.content?.prefix && widget?.content?.prefix?.length > 0}
		{@render nestedWidgets({ widgets: widget?.content?.prefix })}
	{/if}

	{#if WidgetComponent}
		<WidgetComponent content={widget.content} {...widgetProps} />
	{:else}
		<div class="flex items-center justify-between">
			<h3 class={`text-lg font-medium`}>
				{widget.content.title || 'Widget'}
			</h3>
		</div>

		<p class="mt-2 text-sm text-muted-foreground">
			No component found for widget type: {widget.type}
		</p>
	{/if}

	{#if widget?.content?.suffix && widget?.content?.suffix?.length > 0}
		{@render nestedWidgets({ widgets: widget?.content?.suffix })}
	{/if}
{/snippet}

{#if onclick}
	<button {onclick} class={cn(`size-full overflow-hidden  rounded-lg`, widgetProps?.class)}>
		{@render content()}
	</button>
{:else}
	<div class={cn(`size-full overflow-hidden rounded-lg`, widgetProps?.class)}>
		{@render content()}
	</div>
{/if}
