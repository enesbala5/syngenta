<script lang="ts">
	import Button, { type ButtonProps } from '$lib/components/ui/button/button.svelte';
	import { handleLanguageChange, languageOptions } from './logic';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';

	let open: boolean = $state(false);
	let value = $state(page.data.language);

	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(languageOptions.find((lang) => lang.value === value));

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	interface Props {
		open?: boolean;
		buttonProps?: ButtonProps;
		children?: Snippet;
	}

	let { children, buttonProps }: Props = $props();
</script>

<!-- <p>{lang}</p> -->
<p>{page.data.language}</p>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="justify-between"
				{...props}
				{...buttonProps}
				role="combobox"
				aria-expanded={open}
			>
				{#if selectedValue}
					<div class="flex items-center gap-2">
						{#if value}
							{#each languageOptions as lang}
								{#if lang.value === value}
									<img
										src={`https://flagcdn.com/${lang.countryCode.toLowerCase()}.svg`}
										class="size-4 object-contain"
										alt={lang.name}
									/>
								{/if}
							{/each}
						{/if}
						{selectedValue.name}
					</div>
				{:else if children}
					{@render children()}
				{:else}
					Select Language
				{/if}
				<ChevronsUpDown class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="end">
		<Command.Root>
			<Command.Input placeholder="Search language..." />
			<Command.List>
				<Command.Empty>No language found.</Command.Empty>
				<!-- <Command.Group> -->
				{#each languageOptions as languageOption (languageOption.value)}
					<Command.Item
						value={languageOption.value}
						onSelect={() => {
							value = languageOption.value;
							handleLanguageChange(languageOption.value);
							closeAndFocusTrigger();
						}}
					>
						<div class="flex items-center gap-2">
							<Check class={cn(value !== languageOption.value && 'text-transparent')} />
							<img
								src={`https://flagcdn.com/${languageOption.countryCode.toLowerCase()}.svg`}
								class="size-4 object-contain"
								alt={languageOption.name}
							/>
							{languageOption.name}
						</div>
					</Command.Item>
				{/each}
				<!-- </Command.Group> -->
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
