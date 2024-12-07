<script lang="ts">
	import DefaultSizingContainer from '@/components/custom/Container/DefaultSizingContainer.svelte';
	import StatusScreen from '@/components/custom/Sections/Status/StatusScreen.svelte';
	import { page } from '$app/stores';

	const { uid, email} = $page.data;
</script>

<DefaultSizingContainer containerClassNames="min-h-[80vh]">

	<StatusScreen
		height=" h-full"
		alertType="success"
		status={''}
		message={`Your email <span class="font-medium underline">${email}</span> has been confirmed successfully.`}
		returnHome
		title={'Email Confirmed'}
	/>
</DefaultSizingContainer>
