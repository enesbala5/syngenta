<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Preview } from '../types';

	interface Props {
		preview: Preview;
	}

	const { preview }: Props = $props();
	const { file, name, type } = preview;

	const getPDFSrc = (file: File) => {
		return URL.createObjectURL(file);
	};
</script>

<embed
	style="overflow: hidden"
	title={file.name}
	src={getPDFSrc(file)}
	class="size-full overflow-hidden border-none bg-transparent"
/>
