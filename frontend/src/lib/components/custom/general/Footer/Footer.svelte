<script lang="ts">
	// import LanguagePicker from '../Modals/LanguagePicker/LanguagePicker.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import SubscribeEmail from './components/SubscribeEmail.svelte';
	// import DarkModeSelect from '../Input/DarkModeSelect.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { company } from '$lib/data/generic';
	import { InfoIcon } from 'lucide-svelte';
	import { navigation } from './data';
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		inner?: {
			class?: string;
		};
	}

	const { class: className, inner }: Props = $props();
</script>

<footer
	class={cn(' relative z-20 bg-neutral-50 dark:bg-neutral-950', className)}
	aria-labelledby="footer-heading"
>
	<h2 id="footer-heading" class="sr-only">Footer</h2>
	<div class={cn('container-width-sm py-12 lg:py-16', inner?.class)}>
		<div class="grid w-full grid-cols-2 gap-8 pb-8 lg:pb-12 xl:col-span-2">
			<div class="flex flex-col">
				<h3 class=" font-medium">Solutions</h3>
				<ul class="mt-4 space-y-4">
					{#each navigation?.solutions ?? [] as item}
						<li>
							<a href={item.href} class="opacity-75">
								{item.name}
							</a>
						</li>
					{/each}
					{#each navigation?.support ?? [] as item}
						<li>
							<a href={item.href} class=" opacity-75">
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="flex flex-col">
				<h3 class=" font-medium">Company</h3>
				<ul class="mt-4 space-y-4">
					{#each navigation?.company ?? [] as item}
						<li>
							<a href={item.href} class=" opacity-75">
								{item.name}
							</a>
						</li>
					{/each}
					{#each navigation?.legal ?? [] as item}
						<li>
							<a href={item.href} class="opacity-75">
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<!-- <div
				class="mt-12 flex h-fit w-full max-w-md flex-col rounded-lg bg-neutral-200/50 p-4 dark:bg-neutral-800/50 lg:hidden xl:mt-0 xl:flex"
			>
				<h3 class=" primaryText font-medium">User Preferences</h3>
				<div class="mt-4 flex w-full flex-col items-end space-y-4">
					<form class=" w-full">
						<fieldset class="w-full">
							<label class="sr-only">Language</label>
							<DarkModeSelect />
						</fieldset>
					</form>
				</div>
			</div> -->
		<div
			class="border-t border-neutral-200 pt-8 dark:border-neutral-800 lg:flex lg:items-center lg:justify-between xl:mt-0"
		>
			<div>
				<h3 class=" headline font-medium">Get personalized deals sent straight to your inbox!</h3>
				<Tooltip.Provider>
					<Tooltip.Root delayDuration={15}>
						<p class="mt-2 max-w-xl text-opacity-75">
							Unlock exclusive savings by subscribing to our email list! <br /> We promise to only
							send you the best deals and not to overwhelm your inbox.
							<span class="inline">
								<Tooltip.Trigger class="mt-4 flex ">
									<Badge class="gap-1.5" variant="outline">
										<InfoIcon class="h-4 w-4 opacity-75" />
										<p>Privacy Statement</p>
									</Badge>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>
										We'll never share your email address with a third-party, or sell your data to
										anyone.
									</p>
								</Tooltip.Content>
							</span>
						</p>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>

			<SubscribeEmail />
		</div>
		<div
			class="mt-8 items-center border-t border-neutral-200 pt-8 dark:border-neutral-800 md:flex md:justify-between"
		>
			<div class="flex items-center gap-1.5 md:order-2">
				{#each navigation?.social ?? [] as item}
					<Button variant="outline" size="lg" href={item.href} class="flex">
						<span class="sr-only">{item.name}</span>
						{#if item.icon}
							<item.icon class="!size-5"></item.icon>
						{/if}
					</Button>
				{/each}
				<!-- <div class="w-full lg:ml-2">
					<LanguagePicker
						showText="Change Language"
						variant="secondaryMono"
						classNames="ml-auto"
						rounded={false}
						transparentBackground={false}
						contrast={bgContrast}
					/>
				</div> -->
			</div>
			<p class="mt-8 text-neutral-400 md:order-1 md:mt-0">
				&copy; {new Date().getFullYear()}
				{company.name}, Inc. All rights reserved.
			</p>
		</div>
	</div>
</footer>
