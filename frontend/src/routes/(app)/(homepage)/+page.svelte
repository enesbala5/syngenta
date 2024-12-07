<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import Arrow from './components/Arrow.svelte';
	import { RocketIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import InsightsSection from './components/InsightsSection/InsightsSection.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { user } = data;
</script>

<main class="container-width-sm !px-0 pt-8 md:px-4 lg:pb-24">
	<section class="flex flex-col gap-3 lg:gap-4">
		<h1 class="h1">Insights</h1>
		<div class="relative flex flex-col">
			<p class="max-w-[90%] text-lg">View all your project's insights from one dashboard</p>
		</div>
	</section>

		<InsightsSection />
	<section class="relative mt-10 grid grid-cols-4 lg:mt-16">
		<!-- {#ief !user}
			<div
				class="pointer-events-none absolute -top-12 right-8 z-10 hidden rotate-6 flex-col md:flex"
			>
				<p
					class="-translate-x-6 -translate-y-3 font-cursive text-3xl leading-none text-primary dark:text-violet-400"
				>
					Easy Process!
				</p>
				<Arrow class="size-24 translate-x-2 rotate-[25deg] fill-primary dark:fill-violet-500" />
			</div>
		{/if} -->
		<!-- <CoverLetterForm {data} /> -->
	</section>
</main>
