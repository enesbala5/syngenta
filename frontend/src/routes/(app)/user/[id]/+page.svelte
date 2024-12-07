<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { LinkIcon, PlusIcon, UserIcon } from 'lucide-svelte';
	import { returnNameOrPlaceholder } from '$lib/utils';
	import { route } from '$lib/services/routeHandler';
	import ArrowButtonSuffix from '$lib/components/custom/general/Buttons/elements/ArrowButtonSuffix/ArrowButtonSuffix.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dateProxy } from 'sveltekit-superforms';
	import { DateFormatter } from '@internationalized/date';

	const df = new DateFormatter('en-US', { dateStyle: 'short' });

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { user } = data;
	let currentCredits = 120; // Placeholder credits value
	let lastUpdated = $state(new Date());

	function formatDate(dateInput: string | Date): string {
		const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

		if (isNaN(date.getTime())) {
			return 'Invalid Date';
		}

		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();

		return `${month}-${day}-${year}`;
	}
	function topUpCredits() {
		currentCredits += 50; // Add credits as an example
		lastUpdated = new Date();
	}
</script>

<title>{returnNameOrPlaceholder(user?.firstName, user?.lastName)} - Profile Page</title>

<section class="container-width-sm mt-4">
	<Card.Root class="">
		<Card.Header class="flex flex-row items-center gap-6 lg:gap-8">
			<Avatar.Root class="size-32">
				<Avatar.Image alt="@shadcn" />
				<Avatar.Fallback>
					<UserIcon class="size-[70%] stroke-2 lg:size-[50%]" />
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="w-full gap-1.5">
				<h1 class="h2 inline-block">{returnNameOrPlaceholder(user?.firstName, user?.lastName)}</h1>
				{#if user?.username}
					<p class={'h4 mt-1 text-muted-foreground '}>
						@{user?.username}
					</p>
				{:else}
					<Button
						href={route('/(app)/settings/(profile)')}
						class="group mt-3 flex w-fit !gap-0 hover:!gap-0 lg:ml-4 lg:mt-0 lg:inline-flex lg:-translate-y-3"
					>
						Setup Account
						<ArrowButtonSuffix />
					</Button>
				{/if}
				{#if user?.createdAt}
					<div
						class="mt-3 flex w-full items-center border-t border-primary/20 pt-4 dark:border-card/10"
					>
						<p class="">Member since {formatDate(user?.createdAt)}</p>
					</div>
				{/if}
			</div>
		</Card.Header>

		<div class="!px-0 py-5">
			<div class="container-width-sm mt-4 flex w-full flex-col gap-4 md:flex-row lg:px-4">
				<Card.Root class="w-full">
					<Card.Header class="px-4 pt-4">
						<Card.Title class="text-lg">Account Credits</Card.Title>
						<Card.Description class="">You can get more credits at any time.</Card.Description>
					</Card.Header>
					<Card.Content class="p-4">
						<Card.Root>
							<Card.Content class="flex flex-col lg:flex-row lg:items-end lg:justify-between">
								<div>
									<span class="text-4xl font-semibold">{user?.baseCreditAmount} Credits</span>
								</div>
								<p class="text-sm text-neutral-500 dark:text-neutral-400">
									Last updated: <span class="font-semibold">{df.format(lastUpdated)}</span>
								</p>
							</Card.Content>
						</Card.Root>
					</Card.Content>
					<Card.Footer class="flex flex-wrap gap-2 px-4 pb-4">
						<Button onclick={topUpCredits} variant="secondary">Add More Credits</Button>
					</Card.Footer>
				</Card.Root>
				<Card.Root class="w-full">
					<Card.Header class="px-4 pt-4">
						<Card.Title class="text-lg">Current Membership</Card.Title>
						<Card.Description class="">You can get more credits at any time.</Card.Description>
					</Card.Header>
					<Card.Content class="p-4">
						<Card.Root>
							<Card.Content class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
								<div>
									<span class="text-4xl font-medium">Basic Plan</span>
								</div>
							</Card.Content>
						</Card.Root>
					</Card.Content>

					<Card.Footer class="flex flex-wrap gap-2 px-4 pb-4">
						<Button onclick={topUpCredits} variant="secondary">Upgrade Membership</Button>
						<Button onclick={topUpCredits} variant="ghostSecondary" href={route('/(app)/pricing')}
							>View Plans</Button
						>
					</Card.Footer>
				</Card.Root>
			</div>
		</div></Card.Root
	>
	<Card.Root class="my-6">
		<Card.Header class="">
			<Card.Title class="h3 font-semibold">My Cover Letters</Card.Title>
			<Card.Description>View and manage all your generated cover letters here.</Card.Description>
		</Card.Header>

		<Card.Content>
			{#if !user?.coverLetters.length || user?.coverLetters.length < 1}
				<Card.Root>
					<Card.Header>
						<Card.Title>You haven't created any cover letters yet.</Card.Title>
						<Card.Description>It takes less than 5 minutes and is free to try.</Card.Description>
					</Card.Header>
					<Card.Footer class="flex flex-wrap gap-2 pt-4 ">
						<Button href={route('/(app)/(homepage)')}>
							<PlusIcon />
							Create Cover Letter</Button
						>
						<!-- <Button href={route('/(app)/faq')} variant="outline"
							>View Frequently Asked Questions</Button
						> -->
					</Card.Footer>
				</Card.Root>
			{:else}
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each user?.coverLetters as coverLetter}
						<Card.Root>
							<Card.Header>
								<Card.Title>{coverLetter.title}</Card.Title>
								<Card.Description></Card.Description>
								<p class="text-primary/40">Created at: {formatDate(coverLetter.createdAt)}</p>
							</Card.Header>
							<Card.Content>
								<p class="text-sm text-gray-500">{coverLetter.content}</p>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</section>
