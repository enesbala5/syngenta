<script lang="ts">
	import Button, { type ButtonProps } from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { Moon, Sun } from 'lucide-svelte';
	import { mode, toggleMode } from 'mode-watcher';

	interface Props {
		displayText?: boolean;
		navCloseFunction?: (focusableElement: HTMLElement | null) => void;
		buttonProps?: ButtonProps;
	}

	let { displayText = false, navCloseFunction, buttonProps }: Props = $props();
</script>

<Button
	variant="ghost"
	onclick={() => {
		toggleMode();
		navCloseFunction?.(null);
	}}
	{...buttonProps}
>
	{#if $mode === 'dark'}
		<Moon class={'size-5'} />
		{#if displayText}
			<p class="ml-2 cursor-pointer">Dark Mode</p>
		{/if}
	{:else}
		<Sun class={'size-5'} />

		{#if displayText}
			<p class="ml-2 cursor-pointer">Light Mode</p>
		{/if}
	{/if}
</Button>
