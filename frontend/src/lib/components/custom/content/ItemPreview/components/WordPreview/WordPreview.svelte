<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Preview } from '../../types';
	import WordIcon from './WordIcon.svelte';

	interface Props {
		preview: Preview;
	}

	const { preview }: Props = $props();
	const { file, name, type } = preview;

	// const getSrc = (file: File) => {
	// 	return URL.createObjectURL(file);
	// };
</script>

<div
	class="flex size-full items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-blue-600/10 to-transparent"
>
	<WordIcon class="size-12" />
</div>
