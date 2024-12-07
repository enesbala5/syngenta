<script lang="ts" context="module">
	import { z } from 'zod';
	export const profileFormSchema = z.object({
		firstName: z
			.string()
			.min(2, 'Name must be at least 2 characters.')
			.max(30, 'Name must not be longer than 30 characters')
			.optional(),
		lastName: z
			.string()
			.min(2, 'LastName must be at least 2 characters.')
			.max(30, 'LastName must not be longer than 30 characters')
			.optional(),
		username: z
			.string()
			.min(2, 'Username must be at least 2 characters.')
			.max(30, 'Username must not be longer than 30 characters')
			.optional(),
		email: z.string({ required_error: 'Please select an email to display' }).email().optional()
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import { type Infer, type SuperValidated, fileProxy, superForm } from 'sveltekit-superforms';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Avatar from '$lib/components/ui/avatar';
	import { RequestMethod } from '$lib/data/generic';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { invalidateAll } from '$app/navigation';
	import SuperDebug from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { cn } from '$lib/utils';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	const form = superForm(data.form, {
		validators: zodClient(profileFormSchema),
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success('Profile updated successfully.');
				invalidateAll();
			} else {
				toast.error('Something went wrong. Please try again.');
			}
		}
	});

	const { form: formData, enhance } = form;

	// const file = fileProxy(form, 'MediaFile');
</script>

<form
	method={RequestMethod.POST}
	class="space-y-8"
	id="profile-form"
	enctype="multipart/form-data"
	use:enhance
>
	<Form.Field {form} name="firstName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>First Name</Form.Label>
				<Input {...props} bind:value={$formData.firstName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Last Name</Form.Label>
				<Input {...props} bind:value={$formData.lastName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} disabled />
			{/snippet}
		</Form.Control>
		<Form.Description>
			You can manage verified email addresses in your email settings.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Update profile</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
