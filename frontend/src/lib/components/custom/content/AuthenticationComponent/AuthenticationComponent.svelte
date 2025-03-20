<script lang="ts">
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import type { E164Number } from 'svelte-tel-input/types';
	import { goto } from '$app/navigation';
	import client from '$lib/services/api';
	import { route } from '$lib/services/routeHandler';
	import { authenticationState } from './state.svelte';
	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils';
	import { quartInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { MessageSquareIcon } from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import type { PageUser } from '$lib/types/generic';

	const handleSubmit = async () => {
		if (!authenticationState.phoneNumber.valid) {
			toast.error('Please enter a valid phone number');
		}

		console.log(authenticationState.verification.code, authenticationState.verification.validCode);

		if (authenticationState.verification.code == authenticationState.verification.validCode) {
			const { data, error } = await client.POST('/token', {
				body: {
					otp: 'password',
					phone_number: String(authenticationState.phoneNumber.value)
				}
			});

			if (error || !data) {
				toast.error(`Something went wrong - ${error ?? 'Unknown error'}`);
				return;
			}

			const res = await fetch(
				route('/api/updateSessionToken/[token]', {
					params: {
						token: data.access_token
					}
				}),
				{
					headers: {
						'Content-Type': 'application/json',
						Negotiate: 'trans'
					}
				}
			);

			if (!res.ok) {
				toast.error('Something went wrong. Please try again.');
				console.error(res);
				return;
			}

			toast.success('You signed in successfully. Please wait.');

			// setTimeout(() => {
			// 	goto('/', {
			// 		invalidateAll: true
			// 	});
			// }, 1000);
		} else {
			toast.error('Invalid OTP');
		}
	};

	interface Props {
		user: PageUser;
	}

	const { user }: Props = $props();
</script>

{#if !user && !authenticationState.showPreview}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
		<Card.Root class="z-[60] w-full max-w-md bg-background">
			<Card.Header>
				<Card.Title>Sign Up or Log In</Card.Title>
				<Card.Description>Enter your phone number to continue</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="flex w-full flex-col gap-2">
					<Label>Phone Number</Label>
					<PhoneInput
						placeholder="Enter a phone number"
						bind:value={authenticationState.phoneNumber.value}
						bind:valid={authenticationState.phoneNumber.valid}
					/>
				</div>

				<div class="flex w-full flex-col gap-2">
					<Button
						class="w-full"
						disabled={authenticationState.verification.active}
						variant={authenticationState.phoneNumber.valid ? 'default' : 'secondary'}
						size="lg"
						onclick={() => {
							if (!authenticationState.phoneNumber.valid) {
								toast.error('Please enter a valid phone number');
								return;
							}

							authenticationState.verification.active = true;
						}}
					>
						Continue
					</Button>

					<div
						class={cn(
							'overflow-hidden transition-all duration-300',
							authenticationState.verification.active ? 'h-0' : 'h-auto'
						)}
					>
						<Button
							class="w-full text-muted-foreground"
							disabled={authenticationState.verification.active}
							variant={'ghost'}
							size="default"
							onclick={() => (authenticationState.showPreview = true)}
						>
							Continue as Guest
						</Button>
					</div>

					{#if authenticationState.verification.active}
						<section in:fly={{ duration: 150, easing: quartInOut, y: -20 }}>
							<Card.Root>
								<Card.Content class="flex flex-col gap-2 ">
									<Card.Title>Verification Code</Card.Title>
									<Card.Description>Please enter the code sent to your phone</Card.Description>
									<Alert.Root
										variant="default"
										class="mb-2 mt-2 border-blue-500/30 bg-blue-500/10 pb-2.5"
									>
										<MessageSquareIcon class="size-5 stroke-blue-600" />
										<Alert.Title class="-mt-1 text-sm leading-normal text-blue-600"
											>You'll receive a text message with a 5-digit verification code</Alert.Title
										>
										<!-- <Alert.Description class="text-blue-600 opacity-80">
											You'll receive a text message with a 5-digit verification code
										</Alert.Description> -->
									</Alert.Root>
									<InputOTP.Root
										maxlength={5}
										bind:value={authenticationState.verification.code}
										class="mb-2"
									>
										{#snippet children({ cells })}
											<InputOTP.Group class="w-full" autofocus>
												{#each cells.slice(0, 6) as cell (cell)}
													<InputOTP.Slot {cell} class="w-full" />
												{/each}
											</InputOTP.Group>
											<!-- <InputOTP.Separator /> -->
										{/snippet}
									</InputOTP.Root>

									<div class="flex items-center gap-2">
										<Button class="w-full" onclick={handleSubmit}>Submit Code</Button>
										<Button
											class="w-full"
											variant="outline"
											onclick={() => (authenticationState.verification.active = false)}
										>
											Cancel
										</Button>
									</div>
								</Card.Content>
							</Card.Root>
						</section>
					{/if}
				</div></Card.Content
			>
		</Card.Root>
	</div>
{/if}
