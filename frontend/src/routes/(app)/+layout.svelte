<script lang="ts">
	// --------------------------------------------------------------------
	import LanguagePicker from '$lib/components/custom/general/LanguagePicker/LanguagePicker.svelte';
	import DarkModeToggle from '$lib/components/custom/general/DarkModeToggle/DarkModeToggle.svelte';
	import NavigationBar from '$lib/components/custom/general/NavigationBar/NavigationBar.svelte';
	import AppSidebar from '$lib/components/custom/content/Sidebar/app-sidebar.svelte';
	import Footer from '$lib/components/custom/general/Footer/Footer.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { LayoutData, LayoutServerData } from '../$types';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { GlobeIcon } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { route } from '$lib/services/routeHandler';
	import UserDropdown from '$lib/components/custom/general/UserDropdown/UserDropdown.svelte';

	interface Props {
		data: LayoutData & LayoutServerData;
		children: Snippet;
	}
	let { data, children }: Props = $props();

	const { user } = data;

	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<!-- <div class="fixed inset-0 -z-50 bg-background dark:bg-black"></div> -->
<!-- 
<div
	class="fixed inset-0 -z-[5] h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
></div>

<div
	class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
	[background:radial-gradient(195%_165%_at_50%_90%,_#fff_40%,_#63e_100%)]
	dark:[background:radial-gradient(195%_165%_at_50%_90%,_#000_40%,_#63e_100%)]"
></div> -->

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class={cn(
				'container-width-base sticky top-2 z-50 flex max-w-[1200px] transition-all duration-300 ease-in-out md:top-4 lg:top-6'
			)}
		>
			<section
				class={cn(
					'flex w-full shrink-0 items-center gap-4 rounded-xl border-background/50 bg-background/70 shadow-md shadow-neutral-700/10 backdrop-blur-2xl transition-all duration-300 ease-in-out dark:border dark:border-neutral-800/20 dark:bg-neutral-900/70 dark:shadow-neutral-800/20',
					scrollY < 100 ? 'px-4 py-4 ' : '-translate-y-2 px-2 py-2'
				)}
			>
				<Sidebar.Trigger class="bg-neutral-100/50 dark:bg-neutral-800/50" />
				<Separator orientation="vertical" class="hidden !h-4 !min-h-5 bg-neutral-500/50 md:block" />
				<Breadcrumb.Root class="mr-auto">
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Explore</Breadcrumb.Link>
							<!-- <p class="text-xs">language: {language}</p> -->
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<!-- <SearchBar {session} /> -->

				<section class="ml-auto flex items-center gap-1">
					<div class="flex w-full items-center justify-end gap-2 lg:gap-2">
						<section
							class="flex gap-1 rounded-md border border-input/30 bg-card/30 p-0.5 dark:border-input/10 dark:bg-card/5"
						>
							<Button
								size="default"
								variant="outline"
								class="h-10"
								onclick={() => {
									toast.info('Other Languages are coming soon. Thank you for your patience.');
								}}
							>
								<GlobeIcon class="size-5" />
							</Button>
							<!-- <LanguagePicker buttonProps={{ size: 'sm', variant: 'ghost', class: '' }}>
				<GlobeIcon class="size-5" />
			</LanguagePicker> -->
							<!-- <DarkModeToggle buttonProps={{ size: 'sm', variant: 'ghost' }} /> -->
						</section>

						{#if !user}
							<Button
								variant="default"
								class="hidden h-10 font-semibold md:flex"
								href={route('/(auth)/register')}>Sign Up</Button
							>
						{/if}

						<UserDropdown user={user ?? undefined} />
					</div>
				</section>
			</section>
		</header>

		<section
			class={'container-width-base mx-auto mt-4 flex max-w-[1200px] flex-1 flex-col gap-4 overflow-hidden rounded-b-xl py-4 pt-0 transition-all duration-300 ease-in-out lg:mt-8'}
		>
			<div class="min-h-[100vh] w-full flex-1 overflow-y-auto md:min-h-min">
				{@render children()}
				<Footer />
			</div>
		</section>
	</Sidebar.Inset>
</Sidebar.Provider>
