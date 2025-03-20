<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Card from '$lib/components/ui/card';
	import type { PageUser } from '$lib/types/generic';
	import Button from '$lib/components/ui/button/button.svelte';
	import { route } from '$lib/services/routeHandler';

	interface Props {
		user: PageUser;
	}

	let { user }: Props = $props();

	const sidebar = Sidebar.useSidebar();
</script>

{#if sidebar.open}
	<Sidebar.Group>
		<Card.Root>
			<Card.Header class="p-3">
				<Card.Description>Everyone is waiting...</Card.Description>
			</Card.Header>
			<Card.Content class="p-3">
				<Button
					size="lg"
					class="w-full"
					variant="default"
					href={route('/(app)/(homepage)', {
						hash: 'post',
					})}
				>
					Post
				</Button>
			</Card.Content>
		</Card.Root>
	</Sidebar.Group>
{:else}
	<!-- Update the content in the if statement above for a collapsed state -->
	<span></span>
{/if}
