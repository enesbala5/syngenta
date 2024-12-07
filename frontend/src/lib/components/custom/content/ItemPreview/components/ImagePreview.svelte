<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';
	import type { Preview } from '../types';

	import { ServerCrashIcon } from 'lucide-svelte';

	interface Props extends Pick<HTMLImageElement, 'src' | 'alt'> {
		preview: Preview;
		class?: string;
		onError?: () => void;
		onClick?: () => void;
		onSuccess?: () => void;
	}
	type State = 'loading' | 'error' | 'success';

	let state: State = $state('loading');

	// export let data: Props;
	let props: Props = $props();

	const { preview } = props;
	const { file, name, type } = preview;

	const className = props.class;

	delete props.class;

	const getSrc = (file: File) => {
		return URL.createObjectURL(file);
	};
</script>

{#if state !== 'error'}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<img
		src={getSrc(file)}
		alt={file.name}
		class={cn(
			'h-full w-full bg-gradient-to-b from-transparent via-red-500/5 to-transparent rounded-md border-none object-contain',
			state === 'loading' && 'opacity-0',
			className
		)}
		onclick={props?.onClick}
		onkeydown={props?.onClick}
		onload={(e) => {
			props?.onSuccess?.();
			state = 'success';
		}}
		onerror={(e) => {
			props?.onError?.();
			state = 'error';
		}}
	/>
{/if}

{#if state === 'loading'}
	<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
		<Spinner />
	</div>
{:else if state === 'error'}
	<ServerCrashIcon
		class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-500"
	/>
{/if}
