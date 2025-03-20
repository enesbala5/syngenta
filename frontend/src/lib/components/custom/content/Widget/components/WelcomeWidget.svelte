<script lang="ts">
	import type { WidgetContent, WidgetInterface } from '../data';
	import { User, Calendar, Bell, Star } from 'lucide-svelte';

	interface Props {
		content: WidgetContent;
		user: {
			name: string;
			// Add other user properties as needed
		};
	}

	const { content, user }: Props = $props();

	// Get current time to display appropriate greeting
	const hours = new Date().getHours();
	let greeting = "Hello";
	
	if (hours < 12) {
		greeting = "Good morning";
	} else if (hours < 18) {
		greeting = "Good afternoon";
	} else {
		greeting = "Good evening";
	}
</script>

<div class="welcome-widget p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
	<div class="flex items-center gap-3 mb-4">
		<div class="rounded-full bg-primary/10 p-2">
			<User class="h-5 w-5 text-primary" />
		</div>
		<h2 class="text-2xl font-bold">
			{greeting}, <span class="text-primary">{user.name}</span>!
		</h2>
	</div>

	{#if content.title}
		<h3 class="mb-2 text-xl font-medium">{content.title}</h3>
	{/if}

	{#if content.subtitle}
		<p class="mb-4 text-sm text-muted-foreground">{content.subtitle}</p>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
		<div class="flex items-center gap-3 p-3 rounded-md bg-primary/5 border">
			<Calendar class="h-5 w-5 text-primary" />
			<div>
				<p class="font-medium">Today's Date</p>
				<p class="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
			</div>
		</div>
		
		<div class="flex items-center gap-3 p-3 rounded-md bg-amber-500/5 border">
			<Bell class="h-5 w-5 text-amber-500" />
			<div>
				<p class="font-medium">Notifications</p>
				<p class="text-sm text-muted-foreground">3 unread messages</p>
			</div>
		</div>
		
		<div class="flex items-center gap-3 p-3 rounded-md bg-green-500/5 border">
			<Star class="h-5 w-5 text-green-500" />
			<div>
				<p class="font-medium">Quick Actions</p>
				<p class="text-sm text-muted-foreground">View dashboard</p>
			</div>
		</div>
	</div>

	{#if content.imageUrl}
		<div class="mt-4 overflow-hidden rounded-md">
			<img
				src={content.imageUrl}
				alt={content.title || 'Welcome image'}
				class="h-auto w-full object-cover"
			/>
		</div>
	{/if}
</div> 