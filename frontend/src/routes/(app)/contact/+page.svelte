<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Card from '$lib/components/ui/card';

	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import type { PageData } from './$types';
	import ContactInfo from './components/ContactInfo/ContactInfo.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { socialLinks } from './components/ContactInfo/data';

	interface Props {
		data: PageData;
	}

	const { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<main class="container-width-sm py-12">
	<section class="mx-auto mb-8 flex max-w-3xl flex-col gap-3 lg:mb-16 lg:gap-4">
		<h1 class="h2 text-center">Contact Us</h1>
		<div class="relative">
			<p class="text-center text-lg">Find the answers to your questions here.</p>
			<div class="mx-auto mt-6 flex w-fit flex-wrap items-center gap-2">
				<!-- EXPLORE QUESTIONS SHOULD SCROLL DOWN TO THE CONTAINER BELOW (VIEW TODO) -->
				<Button href={route('/')} size="lg">Create a Cover Letter</Button>
				<Button size="lg" variant="outline" href={route('/(app)/terms')}>Terms & Conditions</Button>
			</div>
		</div>
	</section>

	<ContactInfo />

	<form method="POST" use:enhance>
		<!-- CONTENT HERE -->
		<div
			id="contactSection"
			class="container-width-sm mb-20 mt-4 rounded-lg border border-opacity-50 bg-card/50 !px-0 !py-0 pb-6 dark:bg-card/5"
		>
			<!-- <Card.Header>
					<Card.Title>Card Title</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header> -->
			<Card.Content>
				<Form.Field {form} name="fullName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Full Name</Form.Label>
							<Input {...props} bind:value={$formData.fullName} placeholder="John Doe" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email Address</Form.Label>
							<Input {...props} bind:value={$formData.email} placeholder="john@example.com" />
						{/snippet}
					</Form.Control>
					<Form.Description
						>This will be used to contact you regarding this message.</Form.Description
					>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="subject">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Subject</Form.Label>
							<Input {...props} bind:value={$formData.subject} placeholder="How can we help?" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Content>
			<Card.Footer class="flex flex-wrap items-center justify-between gap-4">
				<Form.Button size="lg">Send Message</Form.Button>
				<div class="flex w-fit flex-wrap items-center gap-2 border-accent dark:border-accent/20">
					{#each socialLinks as link}
						<Button
							href={link.href}
							variant="outline"
							size="default"
							class="rounded-full"
							aria-label={link.label}
						>
							<link.icon class="size-5" />
							{link.label}
						</Button>
					{/each}
				</div>
			</Card.Footer>
		</div>
	</form>
</main>
