<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { route } from '$lib/services/routeHandler';
	import SidebarNav from './(components)/sidebar-nav.svelte';

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: route('/(app)/settings')
		}
		// {
		// 	title: 'Appearance',
		// 	href: route('/(app)/settings/appearance')
		// },
	];
</script>

<div class="container-width-sm mt-4 space-y-3 lg:mt-8">
	<h2 class="h2">Settings</h2>
	<p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
</div>
<Separator class="my-6" />
<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 container-width-sm">
	<aside class="lg:w-1/5">
		<SidebarNav items={sidebarNavItems} />
	</aside>
	<div class="flex-1 lg:max-w-2xl">
		<slot />
	</div>
</div>
