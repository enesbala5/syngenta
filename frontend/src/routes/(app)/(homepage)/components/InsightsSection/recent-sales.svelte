<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { route } from '$lib/services/routeHandler';
	import StartupCard from './StartupCard.svelte';
</script>

<div class="space-y-8">
	<StartupCard
		id="123"
		details={`
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quae itaque, praesentium distinctio rem nulla beatae corporis excepturi quo`}
		link={route('/(app)/leads')}
		name="Startup Name"
		date={new Date()}
	/>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://vercel.com/avatars/01.png" alt="Avatar" />
			<Avatar.Fallback>OM</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Olivia Martin</p>
			<p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$1,999.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="flex h-9 w-9 items-center justify-center space-y-0 border">
			<Avatar.Image src="https://vercel.com/avatars/02.png" alt="Avatar" />
			<Avatar.Fallback>JL</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Jackson Lee</p>
			<p class="text-sm text-muted-foreground">jackson.lee@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://vercel.com/avatars/03.png" alt="Avatar" />
			<Avatar.Fallback>IN</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
			<p class="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$299.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://vercel.com/avatars/04.png" alt="Avatar" />
			<Avatar.Fallback>WK</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">William Kim</p>
			<p class="text-sm text-muted-foreground">will@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$99.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src="https://vercel.com/avatars/05.png" alt="Avatar" />
			<Avatar.Fallback>SD</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Sofia Davis</p>
			<p class="text-sm text-muted-foreground">sofia.davis@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
</div>
