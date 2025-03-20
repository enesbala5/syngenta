import { mediaStore } from 'svelte-media-queries/utils/mediaStore';
// import { mediaStore } from 'svelte-media-queries/utils/mediaStore';

export const tailwindBreakpointMapping: Record<TailwindBreakpoint, number> = {
	xs: 300,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
};

export const tailwindBreakpointMediaQueries: Record<TailwindBreakpoint, string> = {
	xs: `(min-width: ${tailwindBreakpointMapping.xs}px)`,
	sm: `(min-width: ${tailwindBreakpointMapping.sm}px)`,
	md: `(min-width: ${tailwindBreakpointMapping.md}px)`,
	lg: `(min-width: ${tailwindBreakpointMapping.lg}px)`,
	xl: `(min-width: ${tailwindBreakpointMapping.xl}px)`,
	'2xl': `(min-width: ${tailwindBreakpointMapping['2xl']}px)`,
};

export const tailwindBreakpoint = () => mediaStore(tailwindBreakpointMediaQueries);

const tailwindBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
type TailwindBreakpoint = (typeof tailwindBreakpoints)[number];

export const tailwindBreakpointMet = (
	screenSize: TailwindBreakpoint,
	state: (Record<TailwindBreakpoint, boolean> | Record<TailwindBreakpoint, boolean | string>) | undefined,
) => {
	if (!state) return false;

	const currentIndex = tailwindBreakpoints.indexOf(screenSize);

	// The state will contain an object of all the screen sizes and their boolean values - only one can be true at a time
	// Get the index of the first true value
	const lastTrueIndex = Object.keys(state).findLastIndex((key) => state[key as TailwindBreakpoint] === 'true' || state[key as TailwindBreakpoint] === true);

	// If the first true value is less or equal to the current index, return true
	return currentIndex <= lastTrueIndex;
};
