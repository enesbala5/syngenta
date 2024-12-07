<script lang="ts">
	import { cn } from '$lib/utils';
	import { arrowClassNames } from './styling';
	import type { ClassNamesOverrides } from './types';

	export let classNamesOverrides: ClassNamesOverrides | undefined = undefined;

	type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
	export let size: Size = 'base';

	const scale: { [key in Size]: string | undefined } = {
		xs: 'scale-[75%]',
		sm: 'scale-[80%]',
		base: 'scale-90',
		lg: 'scale-100',
		xl: 'scale-150'
	};

	export let scaleOverride: string | undefined = undefined;

	export let active: boolean = false;
	export let parentId: string | undefined = undefined;

	$: active &&
		setTimeout(() => {
			if (!parentId) return;
			const container = document.getElementById(parentId);
			// container && container.setAttribute('active', 'true');
		}, 50);
</script>

<div
	class={cn(
		arrowClassNames.container,
		scaleOverride ?? scale?.[size],
		classNamesOverrides?.container
	)}
	on:focus={() => console.log('focus')}
>
	<!-- Top Rotated Div -->
	<div class={cn(arrowClassNames.topRotated, classNamesOverrides?.topRotated)}></div>

	<!-- Bottom Rotated Div -->
	<div class={cn(arrowClassNames.bottomRotated, classNamesOverrides?.bottomRotated)}></div>

	<!-- Line which expands on group-hover -->
	<div class={cn(arrowClassNames.middleLine, classNamesOverrides?.middleLine, '')}></div>

	<!-- Fix for overlapping lines -->
	<!-- Is a blank div which takes up the overlap between the two rotated divs so there is no empty space -->
	<div class={cn(arrowClassNames.overlapFix, classNamesOverrides?.overlapFix)}></div>
</div>
