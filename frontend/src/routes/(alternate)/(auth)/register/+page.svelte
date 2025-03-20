<script lang="ts">
	import ReturnButton from '$lib/components/custom/general/Buttons/ReturnButton/ReturnButton.svelte';
	import LanguagePicker from '$lib/components/custom/general/LanguagePicker/LanguagePicker.svelte';
	import DarkModeToggle from '$lib/components/custom/general/DarkModeToggle/DarkModeToggle.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Icon from '$lib/components/custom/general/Logo/Icon.svelte';
	import Logo from '$lib/components/custom/general/Logo/Logo.svelte';
	import UserAuthForm from './components/UserAuthForm.svelte';
	import { company, RequestMethod } from '$lib/data/generic';
	import { GlobeIcon, HomeIcon } from 'lucide-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { route } from '$lib/services/routeHandler';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	interface Props {
		form: ActionData | any;
	}

	let { form }: Props = $props();

	let isLoading: boolean = $state(false);

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;

		return async ({ update, result }) => {
			isLoading = false;
			console.log({ result });

			if (result.type === 'success') {
				await update();
			}

			if (result.type === 'failure') {
				const errors = result?.data?.message?.errors ?? {};
				console.log('errors', { errors });

				Object.entries(errors).forEach(([key, value]) => {
					const values = Array.isArray(value) ? value : [value];

					for (let error of values) toast.error(error);
				});

				console.log(result.data?.message);
			}
		};
	};

	$effect(() => {
		if (form) isLoading = false;
	});
</script>

<title>Register - {company.name}</title>

<article class="flex h-full w-full grow items-center space-x-4 lg:p-4">
	<section
		aria-roledescription="wrapper"
		class="innerContainerSizing flex h-full w-full flex-col items-center rounded-xl px-4 pb-2 pt-4 transition-colors duration-300 ease-in-out dark:bg-neutral-900 lg:w-1/2 lg:bg-neutral-100 lg:px-6 lg:pt-6 dark:lg:border dark:lg:border-neutral-800"
	>
		<nav class="flex w-full items-center justify-between">
			<section class="flex items-center">
				<a href="/" class="h-8">
					<Icon class="h-full w-full" />
				</a>
			</section>

			<div class="flex items-center">
				<LanguagePicker buttonProps={{ size: 'default', variant: 'ghost' }}>
					<GlobeIcon class="size-5" />
				</LanguagePicker>
				<DarkModeToggle buttonProps={{ size: 'default', variant: 'ghost' }} />

				<!-- <div class="ml-4 mr-6 hidden h-5 w-0.5 rounded-full bg-neutral-300 lg:block" /> -->
				<Separator
					orientation="vertical"
					class="ml-4 mr-6 hidden !h-4 !min-h-5 bg-neutral-500/50 md:block"
				/>

				<ReturnButton
					buttonProps={{
						variant: 'outline',
						size: 'default'
					}}
					href={route('/')}
				>
					<HomeIcon class={cn('size-4')} />
					Return to Homepage
				</ReturnButton>
			</div>
		</nav>
		<!-- Main Actions -->
		<section class="h-full w-full !overflow-y-auto !overflow-x-visible px-1 md:max-w-lg">
			<div class="mt-20 flex w-full flex-col md:mt-24">
				<div class="mb-10 w-full max-w-lg">
					<h1 class=" text-4xl font-semibold">Join us today!</h1>

					<p class="mt-4 opacity-80">
						Create your account to join our community. Already a member? <a
							href={route('/(alternate)/(auth)/login')}
							class="link whitespace-nowrap underline underline-offset-4">Log in to your account.</a
						>
					</p>
				</div>
			</div>
			<section class="flex w-full flex-col space-y-4 md:max-w-lg">
				<form
					method={RequestMethod.POST}
					action="?/register"
					class="w-full"
					use:enhance={handleSubmit}
				>
					<UserAuthForm {form} {isLoading} />
				</form>
			</section>
			<p class="mt-7 text-sm">
				<span class="opacity-80">By clicking on Complete Signup, you agree to our</span>
				<a href={route('/(alternate)/terms')} class="link underline">Terms of Use</a>
				<span class="opacity-80">and you acknowledge having read our</span>
				<a href={route('/(alternate)/privacy')} class="link underline">Privacy Notice</a>.
			</p>
			<p class="mb-8 mt-4 text-xs opacity-60">
				*This includes periodic newsletters, emails about usage tips, and other communications. You
				can opt out anytime within the page.
			</p>
		</section>
		<div
			class="mt-auto w-full border-t pt-2 text-center opacity-70 selection:bg-neutral-800 selection:text-neutral-50 dark:border-neutral-800 dark:selection:bg-white dark:selection:text-neutral-900 lg:place-self-end"
		>
			<div class="text-xs text-muted-foreground">
				Trademark {company.name}
				{new Date().getFullYear()}

				<Separator orientation="vertical" class="mx-1 inline-block h-2.5 !bg-neutral-500/70"
				></Separator>
				<span>All Rights Reserved.</span>
			</div>
		</div>
	</section>

	<!-- ? IMAGE -->
	<div
		class="innerContainerSizing relative hidden h-full w-1/2 overflow-hidden rounded-xl lg:block"
	>
		<img src="images/auth/image.jpg" class="h-full w-full object-cover" alt="" />
		
		<!-- <video
			src="images/auth/video.mp4"
			class="absolute inset-0 h-full w-full object-cover"
			autoplay
			loop
			muted
		/> -->

		<div class={'absolute inset-0 z-10 flex items-center justify-center bg-black/60'}>
			<Logo class="w-48 lg:w-64 " modeOverride={'dark'} />
		</div>
	</div>
</article>

<style>
	.innerContainerSizing {
		height: 100dvh;
	}
	@media (min-width: 1024px) {
		.innerContainerSizing {
			height: calc(100vh - 2rem);
		}
	}
</style>
