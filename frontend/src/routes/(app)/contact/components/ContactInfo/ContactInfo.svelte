<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { contactInfo, socialLinks } from './data';
</script>

<section class="grid gap-4 md:grid-cols-3">
		{#each contactInfo as item}
			<Card.Root>
				<Card.Content class="flex flex-col items-center text-center ">
					<item.icon class="mb-4 h-8 w-8  text-primary" />
					<Card.Title>{item.title}</Card.Title>
					<a href={item?.href} class="mt-2">
						<Card.Description>
							{item.content}
						</Card.Description>
					</a>
				</Card.Content>
				<!-- <Card.Content>
					<p>Card Content</p>
				</Card.Content>
			 -->
			</Card.Root>
		{/each}
</section>
