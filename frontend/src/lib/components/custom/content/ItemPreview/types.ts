import type { Component } from 'svelte';

export interface Preview {
	name: string;
	type: string;
	file: File;
	component: Component<any>;
	previewCard?: {
		props: Record<string, any>;
	}
	props?: Record<string, any>;
}