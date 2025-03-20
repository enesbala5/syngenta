<script lang="ts">
	import FakeProgressBar from '$lib/components/custom/general/FakeProgressBar/FakeProgressBar.svelte';
	import DarkModeToggle from '$lib/components/custom/general/DarkModeToggle/DarkModeToggle.svelte';
	import LanguagePicker from '$lib/components/custom/general/LanguagePicker/LanguagePicker.svelte';
	import { tailwindBreakpoint, tailwindBreakpointMet } from '$lib/functions/tailwindBreakpoints';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { GlobeIcon, HomeIcon, SearchIcon } from 'lucide-svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Popover from '$lib/components/ui/popover';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { route } from '$lib/services/routeHandler';
	import type { LayoutData } from './$types';
	import { quartInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { routes } from '$lib/data/routes';
	import type { Page } from '@sveltejs/kit';
	import BottomBar from '$lib/components/custom/content/BottomBar/BottomBar.svelte';
	import AppSidebar from '$lib/components/custom/content/Sidebar/app-sidebar.svelte';

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();
	const { session, user } = data;

	let scrollY = $state(0);
	let onHomepage = $derived(page.url.pathname === route('/(app)/(homepage)') && 'opacity-0');

	const screenSize = tailwindBreakpoint();

	const getBottomBarState = (page: Page) => {
		return {
			visible: !tailwindBreakpointMet('md', $screenSize),
			minimized: false,
			preferMinimized: page?.url?.pathname?.includes(route('/(app)/(homepage)'))
		};
	};

	let bottomBar = $state(getBottomBarState(page));

	$effect(() => {
		bottomBar = getBottomBarState(page);
	});
</script>

<svelte:window bind:scrollY />
<Sidebar.Provider controlledOpen={tailwindBreakpointMet('md', $screenSize)}>
	<AppSidebar collapsible={'icon'} />
	<Sidebar.Inset>
		<header
			class={cn(
				'container-width-base sticky top-1 z-50 mx-auto flex max-w-[1200px] px-1 transition-all duration-300 ease-in-out md:top-4 md:px-4 lg:top-6 2xl:px-0'
			)}
		>
			<section
				class={cn(
					'flex w-full shrink-0 items-center gap-3 rounded-lg border-background/50 bg-background/70 shadow-md shadow-neutral-700/10 backdrop-blur-2xl transition-all duration-300 ease-in-out dark:border dark:border-neutral-800/20 dark:bg-neutral-900/70 dark:shadow-neutral-800/20 md:gap-4 md:rounded-xl',
					scrollY < 100 ? 'p-1 md:p-2 lg:p-4 ' : '-translate-y-1 p-1 lg:-translate-y-2 lg:p-2'
				)}
			>
				<Sidebar.Trigger class="bg-neutral-100/50 dark:bg-neutral-800/50 md:hidden" />
				<Separator
					orientation="vertical"
					class="!h-4 !min-h-5 bg-neutral-500/50 md:-mr-2 md:hidden {onHomepage && 'md:opacity-0'}"
				/>
				<Breadcrumb.Root class="mr-auto hidden w-fit md:flex">
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link
								href={route('/(app)/(homepage)')}
								class={buttonVariants({
									size: 'sm',
									variant: 'ghost',
									class: onHomepage && 'pointer-events-none opacity-50'
								})}
							>
								<HomeIcon class="hidden xl:block" />
								<p>Return Home</p>
							</Breadcrumb.Link>
							<!-- <p class="text-xs">language: {language}</p> -->
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<section class="ml-auto flex items-center gap-1">
					<div class="5 flex gap-0">
						<LanguagePicker buttonProps={{ size: 'sm', variant: 'ghost', class: '' }}>
							<GlobeIcon class="size-5" />
						</LanguagePicker>
						<DarkModeToggle buttonProps={{ size: 'sm', variant: 'ghost', class: '' }} />
					</div>
				</section>
			</section>
		</header>

		<main
			class={'container-width-base mx-auto mt-0 flex max-w-[1200px] flex-1 flex-col gap-4 overflow-y-hidden overflow-x-visible rounded-b-xl px-0 pt-2 transition-all duration-300 ease-in-out md:mt-2 md:px-4 md:pt-0 lg:mt-6 2xl:px-0'}
		>
			<FakeProgressBar />
			<section
				class={cn(
					'noScroll relative w-full flex-1 flex-col overflow-y-auto overflow-x-visible transition-all duration-300 ease-in-out  md:min-h-min',
					bottomBar?.visible && !bottomBar?.minimized && 'pb-12',
					bottomBar?.visible && bottomBar?.minimized && 'pb-4'
					// bottomBar?.visible ? 'pb-12' : ''
				)}
			>
				{@render children()}

				{#if bottomBar?.visible}
					<BottomBar {...bottomBar} bind:minimized={bottomBar.minimized} />
				{/if}
			</section>
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
