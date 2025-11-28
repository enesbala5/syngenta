<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	class={cn(
		"bg-neutral-50 dark:bg-neutral-950 border border-input/50 dark:border-input/5 text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-0.5",
		className
	)}
	{...restProps}
/>
