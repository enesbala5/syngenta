<script lang="ts">
	import Button, { type ButtonProps } from '$lib/components/ui/button/button.svelte';
	import { handleLanguageChange, languageOptions } from './logic';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Globe } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let open: boolean = $state(false);

	interface Props {
		open?: boolean;
		buttonProps?: ButtonProps;
		children?: Snippet;
	}

	let { children, buttonProps }: Props = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props} {...buttonProps}>
				{@render children?.()}
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="pt-4 sm:max-w-3xl">
		<Dialog.Header class="  !py-0">
			<Dialog.Title>Select Language</Dialog.Title>
		</Dialog.Header>
		<section class="grid translate-y-2 grid-flow-col gap-2">
			{#each languageOptions as languageOption}
				<Button
					variant="outline"
					size="default"
					onclick={() => {
						handleLanguageChange(languageOption.value);
						open = false;
					}}
					class="w-full"
					type="submit"
				>
					<img
						src={`https://flagcdn.com/${languageOption.countryCode.toLowerCase()}.svg`}
						class="size-5 object-contain"
						alt={languageOption.name}
					/>
					<p>{languageOption.name}</p>
				</Button>
			{/each}
		</section>
	</Dialog.Content>
</Dialog.Root>
