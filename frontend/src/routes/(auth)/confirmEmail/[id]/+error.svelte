<script>
	import { page } from '$app/stores';
	import StatusScreen from '$lib/components/custom/general/StatusScreen/StatusScreen.svelte';
	import { CornerUpLeft } from 'lucide-svelte';
	import { route } from '$lib/services/routeHandler';
	import { company } from '$lib/data/generic';

	const email = `<a href="mailto:${company.email.support}" class="underline">${company.email.support}</a>`;
</script>

<StatusScreen
/>

<section class="relative flex min-h-[70vh] items-center">
	{#snippet returnButtonChild()}
		<CornerUpLeft class={'size-4'} />
		<p>Return Home</p>
	{/snippet} $page.error?.message

	<StatusScreen
		width={'w-2/3'}
		status={String($page.status)}
		message={`Please contact us at ${email}, if we can help you in any way.`}
		returnButtonProps={{ children: returnButtonChild, href: route('/(app)/(homepage)') }}
	/>
</section>
