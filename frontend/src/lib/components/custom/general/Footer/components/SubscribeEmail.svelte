<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { RequestMethod } from '$lib/data/generic';
	import { cn } from '$lib/utils';
	import ArrowButtonSuffix from '../../Buttons/elements/ArrowButtonSuffix/ArrowButtonSuffix.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { EmailSubscriptionHandler } from '$lib/services/emailService/subscription';
	import Spinner from '../../Spinner/Spinner.svelte';
	import { CheckIcon, XIcon } from 'lucide-svelte';

	let email = $state('');
	let currentState: 'loading' | 'error' | 'success' | 'idle' = $state('idle');

	let emailValid = $derived(
		email.length > 0 && email.includes('@') && email.includes('.') && email.length > 5
	);
</script>

<section class="mt-8 flex max-w-lg flex-col gap-2.5 md:gap-2 lg:mt-0">
	<Label>Email Address</Label>
	<form
		method={RequestMethod.POST}
		class={cn(
			'flex items-stretch gap-1.5',
			currentState === 'loading' && 'cursor-not-allowed !opacity-50'
		)}
		onsubmit={async (e) => {
			e.preventDefault();

			try {
				currentState = 'loading';
				const emailSubscription = new EmailSubscriptionHandler(email);
				const response = await emailSubscription.subscribe();
				if (!response || String(response) !== 'true') throw new Error('Something went wrong');
				else currentState = 'success';
			} catch (e) {
				currentState = 'error';
			} finally {
				setTimeout(() => {
					currentState = 'idle';
				}, 1500);
			}
		}}
	>
		<div class={cn('flex w-full', currentState === 'loading' && 'pointer-events-none')}>
			<Input
				id={'newsletter'}
				type="email"
				name="email"
				placeholder="user@domain.com"
				class="w-full"
				bind:value={email}
			/>
		</div>

		<Button
			type="submit"
			disabled={!emailValid || currentState === 'loading'}
			variant={emailValid ? 'default' : 'secondary'}
			size="default"
			id="subscribe-button"
			class={cn(
				'h-full !gap-0 !space-x-0 hover:!gap-0',
				emailValid
					? 'border border-transparent fill-white'
					: ' fill-neutral-800 dark:fill-neutral-50',
				currentState === 'success' && '!bg-green-500',
				currentState === 'error' && '!bg-red-500'
			)}
		>
			Subscribe
			{#if currentState === 'success'}
				<CheckIcon class="ml-2 size-4" />
			{:else if currentState === 'error'}
				<XIcon class="ml-2 size-4" />
			{:else if currentState === 'loading'}
				<Spinner class="ml-2 size-4" />
			{:else}
				<ArrowButtonSuffix size="sm" active={emailValid} parentId="subscribe-button" />
			{/if}
		</Button>
	</form>
</section>
