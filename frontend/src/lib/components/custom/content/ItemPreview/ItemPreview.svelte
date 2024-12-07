<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { XIcon } from 'lucide-svelte';
	import { removeFile } from '../ManageCV/functions.svelte';
	import { coverLetterData } from '../../../../../routes/(app)/(homepage)/components/CoverLetterForm/state.svelte';
	import PreviewCard from './components/PreviewCard.svelte';
	import { baseItems, maxItems } from './data';

	// interface Props {}

	// const {}: Props = $props();

	// let status: 'loading' | 'error' | 'success' | 'idle' = $state('idle');

	const tilt: number = 10;
	const translateYAmount = 5;
	const translateXAmount = 15;

	const getMiddleIndex = (length: number) => {
		const max = length - 1;
		const middleIndex = max / 2;
		return middleIndex;
	};

	const calculateTilt = (index: number, length: number) => {
		const middleIndex = getMiddleIndex(length);

		const difference = index - middleIndex;
		return difference * tilt * ((baseItems / maxItems) * 0.5) * length;
	};

	const calculateTranslateY = (index: number, length: number) => {
		const middleIndex = getMiddleIndex(length);

		// The closer it is to the middle index, the higher the value should be
		// return 1 if it's the middle index
		const distance = index - middleIndex;
		return Math.abs(distance * -translateYAmount * (baseItems / maxItems) * 2.5);
	};

	const calculateTranslateX = (index: number, length: number) => {
		const middleIndex = getMiddleIndex(length);

		// The closer it is to the middle index, the higher the value should be
		// return 1 if it's the middle index
		const distance = index - middleIndex;
		return distance * -translateXAmount * (baseItems / maxItems) * 2.5;
	};

	// const calculateMargin = (index: number, length: number) => {
	// 	const middleIndex = getMiddleIndex(length);

	// 	const difference = index - middleIndex;
	// 	return difference * tilt * ((baseItems / maxItems) * 0.5) * length;
	// };
</script>

{#each coverLetterData.previews as preview, i}
	{@const length = coverLetterData.previews.length}
	<!-- {@const middleIndex = getMiddleIndex(length)} -->
	{@const tilt = calculateTilt(i, length)}
	{@const translateY = calculateTranslateY(i, length)}
	{@const translateX = calculateTranslateX(i, length)}

	{#snippet outer()}
		<Button
			variant="outline"
			size="icon"
			class="absolute -right-3 -top-3 size-7 rounded-full !border-solid border-primary/30 bg-white text-primary antialiased hover:bg-neutral-100 dark:border-card/20 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-700"
			onclick={() => removeFile(i)}
		>
			<XIcon class="size-5" />
		</Button>
	{/snippet}

	<PreviewCard
		{preview}
		style={`transform: rotate(${tilt}deg) translateY(${translateY}%) translateX(${-translateX}%)`}
		{outer}
		{...preview.previewCard?.props}
	>
		<preview.component {preview} {...preview.props} />
	</PreviewCard>
{/each}

<!-- get middle index -->
