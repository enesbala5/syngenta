<script lang="ts">
	import { Widget } from './Widget';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { WidgetInterface } from './data';
	import { widgetMappings } from './data';

	interface Props {
		widget: WidgetInterface;
	}

	const { widget }: Props = $props();

	const getExpanded = (widget: WidgetInterface): boolean => {
		if (widget.expanded !== undefined) return widget.expanded;
		if (widget.content.expanded !== undefined) return widget.content.expanded;
		return false;
	};

	let expanded = $state(getExpanded(widget));
	const WidgetComponent = $derived(widgetMappings()[widget.type]?.component);

	const toggleExpanded = () => {
		expanded = !expanded;
	};
</script>

<div class={`widget-container rounded-lg border p-4`}>
	{#if WidgetComponent}
		<WidgetComponent content={widget.content} />
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

	{#if widget.content.widgets && widget.content.widgets.length > 0}
		<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each widget.content.widgets as childWidget}
				<Widget widget={childWidget} />
			{/each}
		</div>
	{/if}

	{#if widget.content.widget}
		<button
			class={`mt-3 ${buttonVariants({ variant: 'outline', size: 'sm' })}`}
			onclick={toggleExpanded}
		>
			{expanded ? 'Hide Details' : 'Show Details'}
		</button>

		{#if expanded}
			<div class="mt-4 rounded-md bg-white/50 p-3 dark:bg-black/20">
				<svelte:self widget={widget.content.widget} />
				<Widget widget={childWidget} />
			</div>
		{/if}
	{/if}
</div>
