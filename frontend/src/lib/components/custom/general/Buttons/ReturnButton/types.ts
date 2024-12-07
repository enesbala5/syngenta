import type { ButtonProps } from '$lib/components/ui/button';
import type { Snippet } from 'svelte';

export interface ReturnButtonProps {
	buttonProps?: ButtonProps;
	href?: string;
	iconClassName?: string;
	children?: Snippet;
}
