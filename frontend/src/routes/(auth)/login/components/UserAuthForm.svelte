<script lang="ts">
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { removeFromDomTimeout } from '$lib/actions';
	import * as Alert from '$lib/components/ui/alert';
	import { AlertCircleIcon, ClockIcon, InfoIcon } from 'lucide-svelte';
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
			<Label for="username">Username or Email Address</Label>
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
			<Label for="password">Password</Label>
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
					class="text-xs font-medium leading-none text-neutral-800/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-100/80"
				>
					Remember Me
				</Label>
				<p class="text-xs text-muted-foreground">
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

		<!--TODO: Implement forgot password-->
		<script lang="ts">
			import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
			import * as Dialog from '$lib/components/ui/dialog/index.js';
			import { Input } from '$lib/components/ui/input/index.js';
			import { Label } from '$lib/components/ui/label/index.js';
		</script>

		<Dialog.Root>
			<Dialog.Trigger class={'w-1/2 text-right text-sm text-muted-foreground hover:underline'}>
				Forgot Password?
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-xl">
				<Dialog.Header class="space-y-2 md:!space-y-3">
					<Dialog.Title>Forgot Password?</Dialog.Title>
					<Dialog.Description class="dark:text-card/70">
						Enter your email address and our support team will be in touch soon to reset your
						password.
					</Dialog.Description>

					<Alert.Root class="translate-y-2 gap-3 p-3">
						<ClockIcon class="!left-3 !top-3 size-5" />
						<Alert.Title>Heads up!</Alert.Title>
						<Alert.Description>
							Please allow up to 24 hours for the reset to be completed. Sorry for the
							inconvenience.
						</Alert.Description>
						<Alert.Root class="mt-4 gap-0 !p-2">
							<InfoIcon class="!left-3 !top-3 size-4 opacity-70" />
							<Alert.Description>
								We are working on a new feature to make this process easier. Thanks for your
								patience.
							</Alert.Description>
						</Alert.Root>
					</Alert.Root>
				</Dialog.Header>

				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name" class="text-right">Email Address</Label>
						<Input id="name" value="" class="col-span-3" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit">Save changes</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
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
</div>
