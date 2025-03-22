<script lang="ts">
	import Widget from './Widget.svelte';
	import type { WidgetInterface } from './data';
	import { widgetMappings } from './data';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		widget: WidgetInterface;
		onclick?: () => void;
		class?: string;
		preferences: {
			prefix: {
				nest: boolean;
			};
			suffix: {
				nest: boolean;
			};
		};
	}

	const { widget, onclick, class: className, preferences }: Props = $props();

	const getWidgetComponent = () => {
		const mappings = widgetMappings();

		if (!mappings[widget.type]) {
			return { component: null, props: null };
		}

		const { component, props } = mappings[widget.type];

		return { component, props };
	};

	const { component: WidgetComponent, props: widgetProps } = $derived(getWidgetComponent());

	let prefix = $state({
		expanded: false
	});

	let suffix = $state({
		expanded: false
	});
</script>

{#snippet nestedWidgets({ widgets }: { widgets: WidgetInterface[] })}
	<div class="mt-4 flex flex-col overflow-auto">
		{#each widgets as widget}
			<Widget
				{widget}
				preferences={{
					prefix: { nest: false },
					suffix: { nest: false }
				}}
				class="!h-auto max-h-none"
			/>
		{/each}
	</div>
{/snippet}

{#snippet content()}
	<!-- {#if widget?.content?.prefix && widget?.content?.prefix?.length > 0}
		{@render nestedWidgets({ widgets: widget?.content?.prefix })}
	{/if} -->

	{#if WidgetComponent}
		<WidgetComponent content={widget.content} {...widgetProps}></WidgetComponent>
	{:else}
		<div class="flex items-center justify-between">
			<h3 class={`text-lg font-medium`}>
				{widget.content?.title || 'Widget'}
			</h3>
		</div>

		<p class="mt-2 text-sm text-muted-foreground">
			No component found for widget type: {widget.type}
		</p>
	{/if}

	<!-- {#if widget?.content?.suffix && widget?.content?.suffix?.length > 0}
		{@render nestedWidgets({ widgets: widget?.content?.suffix })}
	{/if} -->
{/snippet}

{#if onclick}
	<button
		{onclick}
		class={cn(
			`items-left !relative flex h-96 w-full flex-col rounded-lg text-left`,
			widgetProps?.class,
			className
		)}
	>
		{@render content()}
	</button>{:else}<div
		class={cn(
			`items-left !relative flex h-96 w-full flex-col rounded-lg text-left`,
			widgetProps?.class,
			className
		)}
	>
		{@render content()}
	</div>{/if}
