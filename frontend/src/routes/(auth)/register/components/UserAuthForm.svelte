<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { ActionData } from '../$types';
	import { cn } from '$lib/utils';

	interface Props {
		className?: string;
		form: ActionData;
		isLoading: boolean;
	}

	let props: Props = $props();
	const { className, form, isLoading } = props;

	delete props.className;
</script>

<div class={cn('grid gap-6', className)} {...props}>
	<div class="grid gap-4">
		<!-- <div class="grid gap-4 lg:grid-cols-2">
			<div class="grid gap-2.5">
				<Label for="name">First Name</Label>
				<Input
					id="name"
					name="name"
					placeholder="John"
					type="test"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<div class="grid gap-2.5">
				<Label for="lastName">Last Name</Label>
				<Input
					id="lastName"
					name="lastName"
					placeholder="Doe"
					type="text"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
		</div> -->
		<!-- <div class="grid gap-2.5">
			<Label for="username">Username</Label>
			<Input
				id="username"
				name="username"
				placeholder="johndoe"
				type="text"
				autocapitalize="none"
				autocomplete="username"
				autocorrect="off"
				disabled={isLoading}
			/>
		</div> -->
		
		<div class="grid gap-2.5">
			<Label for="email">Email</Label>
			<Input
				id="email"
				name="email"
				placeholder="name@domain.com"
				type="email"
				autocapitalize="none"
				autocomplete="email"
				autocorrect="off"
				disabled={isLoading}
			/>
		</div>

		<div class="grid gap-2.5">
			<Label for="email">Password</Label>
			<Input
				id="password"
				name="password"
				placeholder="********"
				type="password"
				autocapitalize="none"
				autocomplete="current-password"
				autocorrect="off"
				disabled={isLoading}
			/>
		</div>

		<div class="items-top flex space-x-2">
			<Checkbox name="rememberMe" id="rememberMe" class="border-muted-foreground/30" />
			<div class="grid -translate-y-0.5 gap-1 leading-none">
				<Label
					for="rememberMe"
					class="max-w-sm text-xs font-medium text-neutral-800/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-100/80"
				>
					Receive weekly promotional emails, with special discount and limited-time offerings.
				</Label>
				<p class="text-xs text-muted-foreground">
					We will never share your email with third-parties, or send you spam.
				</p>
			</div>
		</div>
	</div>
	<Button
		disabled={isLoading}
		size="lg"
		type="submit"
		class={cn('mt-2 w-1/2 ', isLoading ? 'cursor-not-allowed opacity-70' : '')}
	>
		{#if isLoading}
			<Spinner class="size-4 animate-spin" />
		{/if}
		<p>Complete Sign Up</p>
	</Button>

	<!-- <div class=" flex space-x-2">
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      class="m-0 h-11 w-full"
    >
      {#if isLoading}
        <RotateCwIcon class="mr-2 h-4 w-4 animate-spin" />
      {:else}
        <EAlbaniaLogo classNames="h-6" dark />
      {/if}
    </Button>
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      class="m-0 h-11 w-full"
    >
      {#if isLoading}
        <RotateCwIcon class="mr-2 h-4 w-4 animate-spin" />
      {:else}
        <MicrosoftLogo classNames="h-5" />
      {/if}
    </Button>
  </div> -->
</div>
