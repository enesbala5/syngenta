<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { RequestMethod } from '$lib/data/generic';
	import { route } from '$lib/services/routeHandler';
	import type { Snippet } from 'svelte';

	interface Props {
		class: string;
		children?: Snippet;
	}

	const { class: className, children } = $props();
</script>

<form
	action={route('/(auth)/logout')}
	method={RequestMethod.GET}
	class={className}
	use:enhance={() => {
		return async ({ result }) => {
			invalidateAll();
			await applyAction(result);
		};
	}}
>
	{@render children?.()}
</form>
