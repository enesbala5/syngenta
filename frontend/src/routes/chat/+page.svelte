<script lang="ts">
	import Chat from './components/Chat/Chat.svelte';
	import type { PageData } from './$types';

	let { user, temporaryId }: PageData = $props();
</script>

<Chat user={user ?? undefined} {temporaryId} />
