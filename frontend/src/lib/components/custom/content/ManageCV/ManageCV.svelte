<script lang="ts">
	import { coverLetterData } from '../../../../../routes/(app)/(homepage)/components/CoverLetterForm/state.svelte';
	import ItemPreview from '../ItemPreview/ItemPreview.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { manageCVState } from './state.svelte';
	import { fly } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils';
	import {
		CheckIcon,
		FilePlus2Icon,
		LightbulbIcon,
		RotateCcwIcon,
		UploadCloudIcon
	} from 'lucide-svelte';
	import {
		handleDragOver,
		handleDrop,
		handleInputChange,
		updatePreviews
	} from './functions.svelte';

	let fileInput: HTMLInputElement | undefined = $state();
	let fileUploaded: boolean = $derived(coverLetterData.files.length > 0);
</script>

<Card.Root
	class={cn(
		'group min-h-48 w-full hover:border-dashed hover:border-violet-600 hover:bg-card/40 dark:!bg-violet-700/10 dark:hover:border-violet-500 md:dark:!bg-card/0',
		fileUploaded && 'border-solid border-violet-600 dark:border-violet-500',
		manageCVState.dragOver &&
			'animate-pulse border border-dashed border-neutral-300 dark:border-neutral-700'
	)}
	ondrop={handleDrop}
	ondragover={handleDragOver}
	ondragexit={() => (manageCVState.dragOver = false)}
	ondragleave={() => (manageCVState.dragOver = false)}
	onclick={() => {
		fileInput?.click();
	}}
>
	{#if fileUploaded}
		<div
			in:fly={{ duration: 150, y: -15 }}
			out:fly={{ duration: 150, y: -15 }}
			class="z-00 absolute inset-y-3 left-3 hidden flex-col gap-2 md:flex"
		>
			<Badge class="-z-10 w-fit gap-1.5">
				<CheckIcon class="size-3" />Upload Successful
				{#if coverLetterData.files.length > 1}
					({coverLetterData.files.length})
				{/if}
			</Badge>
			<Button
				variant="outline"
				class="z-10 w-fit gap-1.5 lg:mt-auto"
				onclick={async () => {
					toast.info('Resetting your files now!');
					const length = coverLetterData.files.length;

					// Wait for the delay and execute `removeFile` synchronously
					for (let i = 0; i <= length; i++) {
						await new Promise((resolve) =>
							setTimeout(() => {
								coverLetterData.files.pop();
								updatePreviews(coverLetterData.files);
								resolve(true);
							}, 200)
						);
					}
				}}
			>
				<RotateCcwIcon class="size-3" />
				Reset Files
			</Button>
		</div>
	{/if}
	<Card.Content
		class={cn(
			' peer flex w-full origin-top flex-col text-center transition-all duration-500 ease-in-out md:flex-row md:items-center ',
			fileUploaded ? ' md:h-50 h-56 py-2 lg:h-64' : 'min-h-32 pb-8 pt-10 md:pb-10 md:pt-12'
		)}
	>
		{#if fileUploaded}
			{@const length = coverLetterData.previews.length}
			<div
				in:fly={{ y: 30, duration: 200 }}
				out:fly={{ y: -50, duration: 200 }}
				class="mt-pt-36 group/cards absolute -top-10 left-1/2 z-10 w-fit -translate-x-1/2 dark:drop-shadow-md md:px-36 lg:-top-8"
			>
				<div
					class={cn(
						'relative flex origin-bottom transition-all duration-150 ease-in-out',
						length >= 0 &&
							'bg-rd-500 !scale-100 group-hover/cards:!scale-105 md:!scale-100 md:group-hover/cards:!scale-105 lg:!scale-100 lg:group-hover/cards:!scale-105',
						length > 1 &&
							length <= 2 &&
							'-translate-y-3 !scale-[90%] group-hover/cards:!scale-100 md:!scale-[95%] md:group-hover/cards:!scale-100 lg:!scale-95 lg:group-hover/cards:!scale-100',
						length > 2 &&
							length <= 3 &&
							'-translate-y-4 !scale-[75%] group-hover/cards:!scale-[81%] md:!scale-[85%] md:group-hover/cards:!scale-[90%] lg:!scale-[95%] lg:group-hover/cards:!scale-100',
						length > 3 &&
							'-translate-y-8 !scale-[60%] group-hover/cards:!scale-[65%] md:!scale-[70%] md:group-hover/cards:!scale-[80%] lg:!scale-[85%] lg:group-hover/cards:!scale-90'
					)}
				>
					<ItemPreview />
				</div>
			</div>

			<!-- <div class="flex items-center gap-2">
				<Button>Replace</Button>
				<Button onclick={() => (coverLetterData.files = [])}>Reset</Button>
			</div> -->
		{:else}
			<div
				class="flex w-full flex-row items-center justify-center gap-4 transition-all duration-150 ease-in-out"
			>
				<FilePlus2Icon
					class="size-16 origin-right opacity-70 
					 transition-all duration-150 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:-rotate-6 group-hover:scale-125 group-hover:text-violet-600 group-hover:opacity-100 group-hover:drop-shadow-xl dark:group-hover:text-violet-500 md:size-16"
				/>
				<p
					class="w-fit whitespace-nowrap text-left font-semibold transition-all duration-150 ease-in-out group-hover:translate-x-0.5"
				>
					<span class="peer-hover:!opacity-70"
						><span class="md:hidden">Upload</span><span class="hidden md:inline">Drag and drop</span
						>
						your CV</span
					>
					<span class="group peer flex items-center">
						<input
							bind:this={fileInput}
							name="CV"
							id="CV"
							hidden
							onchange={handleInputChange}
							type="file"
							accept="application/msword, application/docx, application/doc, text/plain, application/pdf, image/*"
						/>
						<label
							for="CV"
							class="group/label peer cursor-pointer underline-offset-8 opacity-70 group-hover:opacity-100 dark:hover:opacity-100"
							><span class="hidden md:inline">or</span>
							<span
								class="
							transition-all
							duration-150 group-hover/label:text-violet-600 dark:group-hover/label:text-violet-400"
								><span class="md:hidden">by clicking here</span>
								<span class="hidden md:inline">click here to upload it</span></span
							></label
						>
						<UploadCloudIcon
							class="peer size-4 -translate-x-full opacity-0 duration-150 ease-in-out group-hover:translate-x-2 group-hover:opacity-100 peer-hover:text-violet-600 dark:peer-hover:text-violet-400"
							style="
								transition-property: transform opacity;
								transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
								transition-duration: 150ms
							"
						/>
					</span>
					<span
						class="mt-1 block text-xs text-muted-foreground opacity-50 transition-all duration-150"
					>
						PDF / Word / Text / Markdown
					</span>
				</p>
			</div>
		{/if}
	</Card.Content>
	<Card.Footer
		class="peer pointer-events-none w-full origin-top px-2 py-2 transition-all duration-500 ease-in-out md:!h-8 md:translate-y-1/2 md:px-0 md:!pb-0 md:pt-0 "
	>
		<Alert.Root
			class="mx-0 w-full origin-bottom rounded-lg bg-white shadow dark:shadow-xl md:mx-auto md:max-w-2xl md:scale-90 md:dark:bg-neutral-900"
		>
			<LightbulbIcon class="size-4" />
			<Alert.Title>Refine your Cover Letter with personal information</Alert.Title>
			<Alert.Description class="text-xs"
				>By uploading your CV <span class="text-muted-foreground">(Curriculum Vitae)</span>, we can
				personalize your cover letter, so it doesn't come off as generic.
			</Alert.Description>
		</Alert.Root>
	</Card.Footer>
</Card.Root>

<!-- <h2>Selected files:</h2>
{#each coverLetterData.files as file}
	<p>{file.name} ({file.size} bytes)</p>
{/each}

<button onclick={() => console.log({ files: coverLetterData.files })}>log</button> -->
