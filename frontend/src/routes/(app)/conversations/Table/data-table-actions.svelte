<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Avatar from '$lib/components/ui/avatar';

	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { CopyIcon, EyeIcon, UserIcon } from 'lucide-svelte';
	import { copyText } from 'svelte-copy';
	import { toast } from 'svelte-sonner';
	import { company } from '$lib/data/generic';
	import ChatBubble from '../../../chat/components/ChatBubble.svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import ChatBubbleAction from '../../../chat/components/ChatBubbleAction.svelte';
	import { ChatAiIcons } from '../../../chat/components/Chat/data';
	import ChatMessageList from '../../../chat/components/ChatMessageList.svelte';
	import client from '$lib/services/api';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import ChatBubbleMessage from '../../../chat/components/ChatBubbleMessage.svelte';

	let { id }: { id?: string } = $props();

	const fetchConversationData = async (id: string) => {
		const { data, error } = await client.GET('/conversation/{chat_id}', {
			params: {
				path: {
					chat_id: id
				}
			}
		});

		if (error || !data) throw error;

		return data as any;
	};
</script>

{#if id}
	<div class="flex w-full items-center justify-end gap-2">
		<Button
			onclick={() => {
				copyText(id).then(() => {
					toast.success(`Copied Conversation ID successfully!`);
				});
			}}
			variant="outline"
		>
			<CopyIcon />
			Copy ID
		</Button>
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
				<EyeIcon />
				View Conversation
			</Dialog.Trigger>

			<Dialog.Content
				class="flex h-[70vh] w-full flex-col items-center justify-center overflow-y-auto sm:max-w-[900px]"
			>
				<Dialog.Header class="w-full">
					<Dialog.Title>Conversation</Dialog.Title>
					<Dialog.Description>
						View the conversation between the Dell Artificial Assistant and the Startup.
					</Dialog.Description>
				</Dialog.Header>
				{#await fetchConversationData(id)}
					<div
						class="my-auto flex flex-col items-center justify-center gap-1.5 text-xs text-muted-foreground"
					>
						<Spinner class="size-6" />
						<p>Loading Conversation</p>
					</div>
				{:then data}
					{@const conversation = data.conversation}

					<ChatMessageList>
						{#each conversation as message, index}
							<div
								class="flex flex-col gap-2"
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 200 }}
							>
								<ChatBubble layout="ai">
									<Avatar.Root class="size-12">
										<Avatar.Image
											src={message?.role === 'ASSISTANT'
												? ''
												: '/media/avatars/fallback_profile_picture.jpg'}
											alt="Avatar"
											class={message?.role === 'ASSISTANT' ? 'dark:invert' : ''}
										/>
										<Avatar.Fallback>
											{#if message?.role === 'ASSISTANT'}
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
									<ChatBubbleMessage message={message.content} isLoading={false}>
										{''}
									</ChatBubbleMessage>
								</ChatBubble>
							</div>
						{/each}
					</ChatMessageList>
				{/await}
			</Dialog.Content>
		</Dialog.Root>
	</div>
{:else}
	<p class=" text-sm text-muted-foreground">Missing Item ID</p>
{/if}
