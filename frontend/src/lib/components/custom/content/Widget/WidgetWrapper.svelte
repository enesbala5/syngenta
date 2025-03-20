<script lang="ts">
	import Widget from './Widget.svelte';
	import type { WidgetComponentMapping, WidgetInterface, WidgetType } from './data';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';

	let open = $state(false);
	const isDesktop = new MediaQuery('(min-width: 768px)');

	interface Props {
		widget: WidgetInterface;
	}

	const { widget }: Props = $props();

	const popupBlacklist: WidgetType[] = ['hello', 'story'];
	let disablePopup = $derived(popupBlacklist.includes(widget.type));
</script>

{#snippet content({ onclick }: { onclick?: () => void })}
	<Widget {widget} {onclick} />
{/snippet}

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Trigger disabled={disablePopup}>
			{#snippet child({ props }: any)}
				{@render content({ onclick: props.onclick })}
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content class="p-0">
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
		<Drawer.Trigger disabled={disablePopup}>
			{#snippet child({ props }: any)}
				{@render content({ onclick: props.onclick })}
			{/snippet}
		</Drawer.Trigger>
		<Drawer.Content class="p-0">
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
		</Drawer.Content>
	</Drawer.Root>
{/if}
