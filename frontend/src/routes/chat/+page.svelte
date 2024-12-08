<script lang="ts">
	import Chat from './components/Chat/Chat.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { user, temporaryId } = data;
</script>

<Chat user={user ?? undefined} {temporaryId} />
