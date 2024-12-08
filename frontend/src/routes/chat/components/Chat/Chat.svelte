<script lang="ts">
	import {
		CopyIcon,
		CornerDownLeft,
		Mic,
		Paperclip,
		RefreshCcw,
		StopCircleIcon,
		UserIcon,
		Volume2
	} from 'lucide-svelte';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import ChatBubbleMessage from '../ChatBubbleMessage.svelte';
	import ChatBubbleAction from '../ChatBubbleAction.svelte';
	import StarRating from '../StarRating/StarRating.svelte';
	import ChatRating from '../ChatRating/ChatRating.svelte';
	import ChatMessageList from '../ChatMessageList.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { returnNameOrPlaceholder } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { company, RequestMethod } from '$lib/data/generic';
	import ChatBubble from '../ChatBubble.svelte';
	import { fade, fly } from 'svelte/transition';
	import ChatInput from '../ChatInput.svelte';
	import { quartInOut } from 'svelte/easing';
	import { copyText } from 'svelte-copy';
	import client from '$lib/services/api';
	import { flip } from 'svelte/animate';
	import { toast } from 'svelte-sonner';
	import { ChatAiIcons } from './data';
	import { PressedKeys } from 'runed';
	import type { User } from 'lucia';
	import { SSE } from 'sse.js';
	import type { Message } from './types';

	interface Props {
		user?: User;
		temporaryId: string;
	}

	let { user, temporaryId }: Props = $props();

	const keys = new PressedKeys();
	// State
	let messages = $state<Message[]>([]);

	let input = $state('');
	let cachedInputValue = $state('');

	let isLoading = $state(false);

	let hasInitialAIResponse = $state(false);

	// Refs
	let messagesContainerEl: HTMLDivElement | null = $state(null);
	let inputEl: HTMLTextAreaElement | null = $state(null);
	let formEl: HTMLFormElement | null = $state(null);
	let submitButtonEl: HTMLButtonElement | null = $state(null);
	let scrollToDiv: HTMLDivElement;

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}, 100);
	}

	// Handle sending message
	async function handleSendMessage(e: Event) {
		e.preventDefault();

		if (isLoading) {
		}

		if (!input) return;

		// Add user message
		messages.push({
			id: messages.length + 1,
			// avatar: selectedUser.avatar,
			name: returnNameOrPlaceholder(user?.firstName, user?.lastName),
			role: 'user',
			message: input
		});

		// Reset input
		input = '';
		formEl?.reset();

		// ---------------------------
		isLoading = true;

		const eventSource = new SSE(`${PUBLIC_BACKEND_URL}/ai`, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true'
			},
			// method: RequestMethod.POST,
			payload: JSON.stringify({
				chat_id: user?.id ?? temporaryId,
				text: input
			})
		});

		cachedInputValue = input;
		input = '';

		messages.push({
			id: messages.length + 1,
			// avatar: '',
			name: 'ChatBot',
			role: 'ai',
			message: ''
		});

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e: any) => {
			scrollToBottom();

			console.log('streamed res', { e });

			try {
				isLoading = false;

				if (e.data === '[DONE]') {
					isLoading = false;
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				// Update the answer to include the content
				if (delta.content) {
					(messages[messages.length] as Message).message =
						(messages[messages.length]?.message ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
		scrollToBottom();

		// const { data, error } = await client.POST('/ai/', {
		// 	body: {
		// 		chat_id: user?.id ?? temporaryId,
		// 		text: input
		// 	},

		// });

		// if (error || !data) {
		// 	toast.error('Something went wrong - please try again');
		// }

		// console.log('data', data);

		isLoading = false;
		hasInitialAIResponse = true;
	}

	function handleError<T>(err: T) {
		isLoading = false;
		input = '';
		// Remove the last message entirely
		messages.splice(-1, 1);
		console.error(err);
	}

	// Scroll to bottom on message update
	$effect(() => {
		if (messagesContainerEl) {
			messagesContainerEl.scrollTop = messagesContainerEl.scrollHeight;
		}
	});

	// Handle key down for message submission
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			handleSendMessage(e);
		}
	}

	// Focus input on mount
	$effect(() => {
		inputEl?.focus();

		if (!hasInitialAIResponse) {
			isLoading = true;
			setTimeout(() => {
				messages.push({
					id: messages.length + 1,
					name: 'ChatBot',
					role: 'ai',
					message: 'Hello! How can I help you today?'
				});

				isLoading = false;
				hasInitialAIResponse = true;
			}, 200);
		}
	});

	$effect(() => {
		if (keys.has('Control', 'Enter')) {
			if (!input) {
				toast.error('You have not entered a query - please complete the details');
				return;
			}

			if (!submitButtonEl) {
				toast.error('Something went wrong while submitting the form. Please try again.');
				return;
			} else {
				submitButtonEl?.click();
			}

			if (inputEl) inputEl.focus();
		}
	});

	let showChatRating = $state(false);
</script>

<button onclick={() => (showChatRating = true)}>show</button>
<button onclick={() => (showChatRating = false)}>hide</button>

<div class="mx-auto h-[100dvh] w-full max-w-lg">
	<div class="relative flex h-full flex-col rounded-xl bg-muted/40 p-4 lg:col-span-2">
		<ChatMessageList bind:ref={messagesContainerEl}>
			{#each messages as message, index (message.id)}
				<div
					class="flex flex-col gap-2"
					animate:flip={{ duration: 200 }}
					in:fade={{ duration: 200 }}
					out:fade={{ duration: 200 }}
				>
					<ChatBubble layout="ai">
						<Avatar.Root class="size-8 border">
							<Avatar.Image
								src={message.role === 'ai' ? '' : '/media/avatars/fallback_profile_picture.jpg'}
								alt="Avatar"
								class={message.role === 'ai' ? 'dark:invert' : ''}
							/>
							<Avatar.Fallback>
								{#if message.role === 'ai'}
									<img
										src={company.brand.icon.primary.svg}
										alt={company.brand.icon.primary.alt}
										class="md:h-6 lg:h-7 xl:h-8"
									/>
								{:else}
									<UserIcon class="fill-neutral-200 stroke-neutral-200" />
								{/if}
							</Avatar.Fallback>
						</Avatar.Root>
						<ChatBubbleMessage isLoading={message.isLoading}>
							{message.message}
							{#if message.role === 'ai'}
								<div class="mt-1.5 flex items-center gap-1">
									{#if !message.isLoading}
										{#each ChatAiIcons as icon}
											<ChatBubbleAction class="size-6" onclick={(e) => icon.onclick?.(e, message)}>
												<icon.icon class="size-4 text-foreground"></icon.icon>
											</ChatBubbleAction>
										{/each}
									{/if}
								</div>
							{/if}
						</ChatBubbleMessage>
					</ChatBubble>
				</div>
			{/each}
			{#if isLoading}
				<div class="loader"></div>
			{/if}
		</ChatMessageList>

		<div class="flex-1"></div>

		{#if showChatRating}
			<div
				class="z-20 mb-4 flex items-center justify-center"
				transition:fly={{ duration: 150, easing: quartInOut, y: 50 }}
			>
				<ChatRating />
			</div>
		{/if}
		<div bind:this={scrollToDiv}></div>
		<form
			bind:this={formEl}
			onsubmit={handleSendMessage}
			class="relative z-30 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
		>
			<ChatInput
				bind:ref={inputEl}
				bind:value={input}
				onkeydown={handleKeyDown}
				placeholder="Type your message here..."
				class="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
			/>
			<div class="flex items-center p-3 pt-0">
				<Button variant="ghost" size="icon">
					<Paperclip class="size-4" />
					<span class="sr-only">Attach file</span>
				</Button>

				<Button variant="ghost" size="icon">
					<Mic class="size-4" />
					<span class="sr-only">Use Microphone</span>
				</Button>

				<Button
					bind:ref={submitButtonEl}
					disabled={!input || isLoading}
					type="submit"
					size="sm"
					class="ml-auto gap-1.5"
				>
					{#if isLoading}
						Stop
						<!-- <Spinner class="size-3.5" /> -->
						<StopCircleIcon class="size-3.5" />
					{:else}
						Sending
						<CornerDownLeft class="size-3.5" />
					{/if}
				</Button>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	.loader {
		width: 30px;
		opacity: 30%;
		aspect-ratio: 2;
		--_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
		background:
			var(--_g) 0% 50%,
			var(--_g) 50% 50%,
			var(--_g) 100% 50%;
		background-size: calc(100% / 3) 50%;
		animation: l3 1s infinite linear;
	}
	@keyframes l3 {
		20% {
			background-position:
				0% 0%,
				50% 50%,
				100% 50%;
		}
		40% {
			background-position:
				0% 100%,
				50% 0%,
				100% 50%;
		}
		60% {
			background-position:
				0% 50%,
				50% 100%,
				100% 0%;
		}
		80% {
			background-position:
				0% 50%,
				50% 50%,
				100% 100%;
		}
	}
</style>
