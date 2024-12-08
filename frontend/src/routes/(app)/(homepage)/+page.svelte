<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import { DownloadIcon, RocketIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import InsightsSection from './components/InsightsSection/InsightsSection.svelte';
	import { DatePickerWithRange } from './components/InsightsSection';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { user, dashboardData } = data;
</script>

<main class="container-width-sm !px-0 pt-2 md:px-4 lg:pb-24">
	<!-- <section class="flex flex-col gap-3 lg:gap-4">
		<h1 class="h1">Insights</h1>
		<div class="relative flex flex-col">
			<p class="max-w-[90%] text-lg">View all your project's insights from one dashboard</p>
		</div>
	</section> -->

	<div class="flex flex-col space-y-2">
		<h2 class="h2">Dashboard</h2>

		<div class="flex items-center space-x-2">
			<p>Explore the data and insights of registered startups at a glance.</p>
			<!-- <DatePickerWithRange /> -->
			<!-- <Button size="sm">
				<DownloadIcon class="mr-2 h-4 w-4" />
				Download
			</Button> -->
		</div>
	</div>

	<section class="relative mt-6 lg:mt-8">
		<InsightsSection data={dashboardData as any} />
	</section>
</main>
