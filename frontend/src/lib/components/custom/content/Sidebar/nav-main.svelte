<script lang="ts">
	import { page } from '$app/state';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import type { Component } from 'svelte';
	import type { SidebarInsert } from './custom/content/Sidebar/types';

	let {
		items,
	}: {
		items: {
			title: string;
			url: string;
			suffix?: SidebarInsert;
			// This should be `Component` after lucide-svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
				suffix?: SidebarInsert;
			}[];
		}[];
	} = $props();

	let sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Group>
	<!-- <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel> -->
	<Sidebar.Menu>
		{#each items as mainItem (mainItem.title)}
			{@const isActive = page.url.pathname === mainItem.url}
			<Collapsible.Root open={mainItem.isActive}>
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Sidebar.MenuButton
							size="lg"
							class={isActive
								? 'text-primary bg-primary/[3%] dark:text-white dark:[&>svg]:text-primary dark:hover:bg-primary/5 hover:text-primary/80 active:bg-primary/[2%] active:text-primary border border-primary/10 hover:bg-primary/[4%]'
								: 'border border-transparent hover:!bg-primary/[3%] dark:hover:bg-primary/5 active:bg-primary-[3%] dark:hover:text-white  dark:hover:border-primary/10 hover:text-primary/80 hover:border-primary/5 active:text-primary'}
						>
							{#snippet tooltipContent()}
								{mainItem.title}
							{/snippet}
							{#snippet child({ props })}
								<a href={mainItem.url} {...props}>
									<mainItem.icon />
									<span>{mainItem.title}</span>
									{#if mainItem?.suffix}
										<mainItem.suffix {isActive} sidebarOpen={sidebar?.open} />
									{/if}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if mainItem.items?.length}
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuAction {...props} class="data-[state=open]:rotate-90">
										<ChevronRight />
										<span class="sr-only">Toggle</span>
									</Sidebar.MenuAction>
								{/snippet}
							</Collapsible.Trigger>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{#each mainItem.items as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton href={subItem.url}>
												<span>{subItem.title}</span>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						{/if}
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
