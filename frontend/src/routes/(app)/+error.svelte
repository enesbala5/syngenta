<script>
	import { page } from '$app/stores';
	import StatusScreen from '$lib/components/custom/general/StatusScreen/StatusScreen.svelte';
	import { route } from '$lib/services/routeHandler';
	import { CornerUpLeft } from 'lucide-svelte';
</script>

<section class="relative flex min-h-[70vh] items-center">
	{#snippet returnButtonChild()}
		<CornerUpLeft class={'size-4'} />
		<p>Return Home</p>
	{/snippet}

	<StatusScreen
		width={'w-2/3'}
		status={String($page.status)}
		message={$page.error?.message}
		returnButtonProps={{ children: returnButtonChild, href: route('/(app)/(homepage)') }}
	/>
</section>
