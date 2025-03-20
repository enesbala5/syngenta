<script lang="ts">
	import { AlertCircleIcon, RotateCwIcon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { removeFromDomTimeout } from '$lib/actions';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import type { ActionData } from '../$types';
	import { cn } from '$lib/utils';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';

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
		<!-- <div class="grid gap-2.5">
			<Label for="email">Email</Label>
			<Input
				id="email"
				name="email"
				bind:value={email}
				placeholder="emri@shembull.com"
				type="email"
				autocapitalize="none"
				autocomplete="email"
				autocorrect="off"
				disabled={isLoading}
			/>
			<input type="text" hidden name="email" value={email} />
		</div> -->
		<div class="grid gap-2.5">
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

		<div class="items-top flex space-x-2 pt-2">
			<Checkbox class="border-muted-foreground/30" name="rememberMe" id="rememberMe" />
			<div class="grid -translate-y-0.5 gap-1 leading-none">
				<Label
					for="rememberMe"
					class="text-sm font-medium leading-none text-neutral-800/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-100/80"
				>
					Remember Me
				</Label>
				<p class="text-sm text-muted-foreground">
					Check this box if you want to be remembered on this computer.
				</p>
			</div>
		</div>
	</div>
	<div class="mt-2 flex items-center justify-between space-x-2">
		<Button
			type="submit"
			size="lg"
			disabled={isLoading}
			class={cn('w-1/2', isLoading ? 'cursor-not-allowed opacity-70' : '')}
		>
			{#if isLoading}
				<Spinner class="size-4 animate-spin" />
			{/if}
			<p>Log In</p>
		</Button>

		<a href="forgotPassword" class="w-1/2 text-right text-sm text-muted-foreground hover:underline"
			>Forgot Password?</a
		>
	</div>
	{#if form?.invalid}
		<div class="my-4" use:removeFromDomTimeout>
			<Alert.Root variant="destructive">
				<AlertCircleIcon class="h-4 w-4" />
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>Email and password is required.</Alert.Description>
			</Alert.Root>
		</div>
	{/if}
	{#if form?.credentials}
		<div class="my-4" use:removeFromDomTimeout>
			<Alert.Root variant="default">
				<AlertCircleIcon class="h-4 w-4" />
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>You have entered the wrong credentials</Alert.Description>
			</Alert.Root>
		</div>
	{/if}

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
