import { CopyIcon, RefreshCcwIcon, Volume2Icon } from 'lucide-svelte';
import type { Message } from './types';
import { toast } from 'svelte-sonner';
import { copyText } from 'svelte-copy';
import type { Component, Snippet, SvelteComponent } from 'svelte';

interface ChatIcon {
	icon: any,
	label: string,
	onclick?: (e: MouseEvent, message: Message) => void;
}

export const ChatAiIcons: ChatIcon[] = [
	{
		icon: CopyIcon,
		label: 'Copy',
		onclick: (e, message) => {
			if (!message?.message) {
				toast.error('Something went wrong. Please try again.');
				return;
			}

			copyText(message?.message).then(() => {
				toast.success(`Copied message successfully!`);
			});
		}
	},
	{
		icon: RefreshCcwIcon, label: 'Refresh', onclick: (e, message) => {
			toast.message('Feature is coming soon. Thank you for your patience.')
		}
	},
	{
		icon: Volume2Icon, label: 'Read Aloud', onclick: (e, message) => {
			toast.message('Feature is coming soon. Thank you for your patience.')
		}
	}
];
