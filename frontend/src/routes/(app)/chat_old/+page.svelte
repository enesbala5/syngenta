<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import type { PageData } from './$types';
	import { SSE } from 'sse.js';
	import ChatMessage from './components/ChatMessage.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { user } = data;

	let query: string = $state('');
	let answer: string = $state('');
	let loading: boolean = $state(false);
	let chatMessages: any[] = $state([]);
	let scrollToDiv: HTMLDivElement;

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}, 100);
	}

	const handleSubmit = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		});

		query = '';

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e: any) => {
			scrollToBottom();
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
		scrollToBottom();
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}
</script>

<main class="container-width-sm !px-0 pt-2 md:px-4 lg:pb-24">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Chat</h2>
		<div class="flex items-center space-x-2">
			<!-- - -->
		</div>
	</div>

	<section class="relative mt-6 lg:mt-8">
		<div class="flex w-full flex-col items-center gap-2 px-8 pt-4">
			<div>
				<h1 class="w-full text-center text-2xl font-bold">Chatty</h1>
				<p class="text-sm italic">Powered by gpt-3.5-turbo</p>
			</div>
			<Card.Root class="w-full">
				<!-- <Card.Header> -->
				<!-- <Card.Title>Card Title</Card.Title> -->
				<!-- <Card.Description>Card Description</Card.Description> -->
				<!-- </Card.Header> -->
				<Card.Content class="">
					<div>
						<ChatMessage type="assistant" message="Hello, ask me anything you want!" />
						{#each chatMessages as message}
							<ChatMessage type={message.role} message={message.content} />
						{/each}
						{#if answer}
							<ChatMessage type="assistant" message={answer} />
						{/if}
						{#if loading}
							<ChatMessage type="assistant" message="Loading.." />
						{/if}
						<div bind:this={scrollToDiv}></div>
					</div>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>

			<div
				class="flex h-[500px] w-full flex-col gap-4 overflow-y-auto rounded-md bg-gray-900 p-4"
			></div>
			<form
				class="flex w-full gap-4 rounded-md bg-gray-900 p-4"
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<input type="text" class="input input-bordered w-full" bind:value={query} />
				<button type="submit" class="btn btn-accent"> Send </button>
			</form>
		</div>
	</section>
</main>
