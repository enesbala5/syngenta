import type { ArrowContainerType } from './types';

// For usage example see ArrowButtonSuffix.svelte
export const arrowClassNames: {
	[key in ArrowContainerType]: string | undefined;
} = {
	container: `relative opacity-70 group-hover:opacity-100 group-focus:opacity-100 hover:opacity-100 transition-transform  duration-[200ms] ease-in-out w-5 h-5 overflow-hidden ml-1 group-hover:ml-3 group-focus:ml-3`,
	topRotated: 'absolute rotate-45 h-0.5 translate-y-[0.3125rem] right-0 top-0 w-3 bg-current rounded-full box-content',
	bottomRotated:
		'absolute -rotate-45 h-0.5 w-3 translate-y-[-0.3125rem] bottom-0 right-0 bg-current rounded-full box-content',

	middleLine:
		'absolute w-0.5 group-hover:w-[1.1rem] group-focus:w-[1.1rem] h-0.5 transition-all duration-[200ms] bg-current opacity-0 group-hover:opacity-100 group-focus:opacity-100 box-content top-1/2 -translate-y-1/2 rounded-full right-[0.0625rem] delay-[30ms]',

	overlapFix: 'absolute w-0.5 h-0.5 bg-current top-1/2 -translate-y-1/2 rounded-full right-[0.0625rem] box-content',
};
