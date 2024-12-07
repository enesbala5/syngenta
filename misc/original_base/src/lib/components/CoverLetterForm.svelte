<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { coverLetterSchema } from '$lib/schemas';
	import Button from './ui/button/button.svelte';
	import { Upload } from 'lucide-svelte';

	export let data;

	const { form, errors, enhance, delayed } = superForm(data.form, {
		validators: coverLetterSchema,
		onSubmit: ({ form, data }) => {
			// Handle form submission
		},
	});

	let fileInput: HTMLInputElement;
	let analyzing = false;

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files?.length) return;

		analyzing = true;
		const file = target.files[0];
		// Handle file upload and analysis
		analyzing = false;
	}
</script>

<form method="POST" use:enhance class="space-y-6 max-w-2xl mx-auto">
	<div class="space-y-4">
		<div>
			<label for="companyName" class="block text-sm font-medium">Company Name</label>
			<input
				type="text"
				id="companyName"
				bind:value={$form.companyName}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			/>
			{#if $errors.companyName}
				<p class="text-red-500 text-sm mt-1">{$errors.companyName}</p>
			{/if}
		</div>

		<div>
			<label class="block text-sm font-medium">Upload CV</label>
			<div class="mt-1 flex items-center gap-4">
				<Button type="button" variant="outline" on:click={() => fileInput.click()}>
					{#if analyzing}
						<!-- <Loader2 class="mr-2 h-4 w-4 animate-spin" /> -->
						Analyzing...
					{:else}
						<Upload class="mr-2 h-4 w-4" />
						Upload CV
					{/if}
				</Button>
				<input type="file" accept=".pdf,.doc,.docx" bind:this={fileInput} on:change={handleFileUpload} class="hidden" />
			</div>
		</div>

		<!-- Add more form fields here -->

		<Button type="submit" disabled={$delayed}>
			{#if $delayed}
				<Spinner class="mr-2 size-4" />
				Generating...
			{:else}
				Generate Cover Letter
			{/if}
		</Button>
	</div>
</form>
