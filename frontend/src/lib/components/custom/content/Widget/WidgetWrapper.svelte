<script lang="ts">
	import Widget from './Widget.svelte';
	import type { WidgetComponentMapping, WidgetInterface, WidgetType } from './data';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { MessageSquareIcon, PhoneIcon } from 'lucide-svelte';
	import { company } from '$lib/data/generic';
	import { cn } from '$lib/utils';

	let open = $state(false);
	const isDesktop = new MediaQuery('(min-width: 768px)');

	interface Props {
		widget: WidgetInterface;
		class?: string;
	}

	const { widget, class: className }: Props = $props();

	const popupBlacklist: WidgetType[] = ['hello', 'story'];
	let disablePopup = $derived(popupBlacklist.includes(widget.type));
</script>

{#snippet content({ onclick }: { onclick?: () => void })}
	<Widget
		{widget}
		{onclick}
		class={cn('border p-2', className)}
		preferences={{
			prefix: { nest: true },
			suffix: { nest: true }
		}}
	/>
{/snippet}

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<!-- <Dialog.Trigger> -->
		<!-- {#snippet child({ props }: any)} -->
		{@render content({ onclick: () => (open = !open) })}
		<!-- {/snippet} -->
		<!-- </Dialog.Trigger> -->
		<Dialog.Content
			class="flex h-auto max-h-[90vh] flex-col gap-6 overflow-y-auto !border-none !bg-transparent p-0"
		>
			<!-- <Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header> -->
			{@render content({})}
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<!-- <Drawer.Trigger disabled={disablePopup}> -->
		<!-- {#snippet child({ props }: any)} -->
		{@render content({ onclick: () => (open = !open) })}
		<!-- {/snippet} -->
		<!-- </Drawer.Trigger> -->
		<Drawer.Content class="max-h-[90vh] overflow-y-auto p-0">
			<!-- <Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>
				
					Make changes to your profile here. Click save when you're done.
				</Drawer.Description>
			</Drawer.Header>
			{@render content()}
			<Drawer.Footer class="pt-2">
				<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
			</Drawer.Footer> -->

			{@render content({})}

			<div class="flex items-center gap-2">
				<Button variant="secondary">
					Text Now
					<MessageSquareIcon class="size-4" />
				</Button>

				<Button href={company.ai.phone.href}>
					Talk Now
					<PhoneIcon class="size-4" />
				</Button>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
