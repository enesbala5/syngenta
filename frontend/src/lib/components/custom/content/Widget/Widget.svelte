<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { Widget, WidgetType, WidgetDirection } from './data';
	import { getWidgetStyles, getDirectionStyles } from './data';
	
	export let widget: Widget;
	
	$: styles = getWidgetStyles(widget.type);
	$: directionStyles = widget.content.direction 
		? getDirectionStyles(widget.content.direction as WidgetDirection) 
		: getDirectionStyles('neutral');
	$: expanded = widget.content.expanded || false;
	
	const toggleExpanded = () => {
		expanded = !expanded;
	};
</script>

<div class={`widget-container p-4 rounded-lg border ${styles.styles.container}`}>
	<div class="flex justify-between items-center">
		<h3 class={`text-lg font-medium ${styles.styles.title}`}>{widget.content.title}</h3>
		
		{#if widget.content.change}
			<div class="flex items-center gap-1">
				<span class={directionStyles.text}>{widget.content.change}</span>
				<span class={`inline-block ${directionStyles.iconClass}`}>
					<!-- Icon would go here -->
				</span>
			</div>
		{/if}
	</div>
	
	{#if widget.content.widget && expanded}
		<div class="mt-4 p-3 rounded-md bg-white/50 dark:bg-black/20">
			{#if widget.content.widget.type === 'explanation'}
				<h4 class="font-medium">{widget.content.widget.content.title}</h4>
				{#if widget.content.widget.content.steps}
					<ul class="mt-2 space-y-1 list-disc list-inside">
						{#each widget.content.widget.content.steps as step}
							<li>{step}</li>
						{/each}
					</ul>
				{/if}
			{/if}
		</div>
	{/if}
	
	<button 
		class={`mt-3 ${buttonVariants({ variant: 'outline', size: 'sm' })}`}
		on:click={toggleExpanded}
	>
		{expanded ? 'Hide Details' : 'Show Details'}
	</button>
</div>
