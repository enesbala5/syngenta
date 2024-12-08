<script lang="ts">
	import ReturnButton from '$lib/components/custom/general/Buttons/ReturnButton/ReturnButton.svelte';
	import DarkModeToggle from '$lib/components/custom/general/DarkModeToggle/DarkModeToggle.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import UserAuthForm from './components/UserAuthForm.svelte';
	import { company, RequestMethod } from '$lib/data/generic';
	import image from '$lib/assets/media/auth/dark.png?as=run';
	import { GlobeIcon, HomeIcon } from 'lucide-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { route } from '$lib/services/routeHandler';
	import { Button } from '$lib/components/ui/button';
	import type { ActionData } from './$types';
	import Img from '@zerodevx/svelte-img';
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

		return async ({ update }) => {
			isLoading = false;
			await update();
		};
	};

	$effect(() => {
		if (form) isLoading = false;
	});
</script>

<article class="flex h-full w-full grow items-center space-x-4 lg:p-4">
	<section
		aria-roledescription="wrapper"
		class="innerContainerSizing flex h-full w-full flex-col items-center rounded-xl px-4 pb-2 pt-4 transition-colors duration-300 ease-in-out dark:bg-neutral-900 lg:w-1/2 lg:bg-neutral-100 lg:px-6 lg:pt-6 dark:lg:border dark:lg:border-neutral-800"
	>
		<nav class="flex w-full items-center justify-between">
			<section class="flex items-center">
				<a href={route('/')} class="mr-4 w-full font-bold">
					<img
						src={company.brand.main.white.svg}
						alt={company.brand.main.alt}
						class="hidden dark:block md:h-6 lg:h-7 xl:h-8"
					/>
					<img
						src={company.brand.main.black.svg}
						alt={company.brand.main.alt}
						class="block dark:hidden md:h-6 lg:h-7 xl:h-8"
					/>
				</a>
			</section>

			<div class="flex items-center">
				<Button
					variant="ghost"
					onclick={() => {
						toast.info('Other Languages are coming soon. Thank you for your patience.');
					}}
				>
					<GlobeIcon class="size-5" />
				</Button>
				<!-- <LanguagePicker buttonProps={{ size: 'default', variant: 'ghost' }}>
					<GlobeIcon class="size-5" />
				</LanguagePicker> -->
				<!-- <DarkModeToggle buttonProps={{ size: 'default', variant: 'ghost' }} /> -->

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
		<section class="h-full w-full">
			<div class="mt-24 flex w-full flex-col md:mt-32">
				<div class="mb-10 w-full">
					<h1 class=" text-4xl font-semibold">Join us today!</h1>

					<p class="mt-4 opacity-80">
						Create your account to join our community. Already a member?
						<a
							href={route('/(auth)/login')}
							class="whitespace-nowrap text-primary underline underline-offset-4 hover:text-primary/80"
						>
							Log in to your account.
						</a>
					</p>
				</div>
			</div>
			<section class="flex w-full flex-col space-y-4">
				<form
					method={RequestMethod.POST}
					action="?/register"
					class="w-full"
					use:enhance={handleSubmit}
				>
					<UserAuthForm {form} {isLoading} />
				</form>
			</section>
			<p class="mt-7 max-w-lg text-xs">
				<span class="opacity-80">By clicking on Complete Signup, you agree to our</span>
				<a href={route('/(app)/terms')} class="underline underline-offset-2">Terms of Use</a>
				<span class="opacity-80">and you acknowledge having read our</span>
				<a href={route('/(app)/privacy')} class="underline underline-offset-2">Privacy Notice</a>.
			</p>
			<!--			<p class="mb-8 mt-4 text-xs opacity-60">
				*This includes periodic newsletters, emails about usage tips, and other communications. You
				can opt out anytime within the page.
			</p>-->
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
		<Img src={image} class="h-full min-h-screen w-full object-cover" alt="Abstract Image" />
		<!-- <div class={'absolute inset-0 z-10 flex items-center justify-center bg-black/60'}>
			<Logo className="w-48 lg:w-64 " modeOverride={'dark'} />
		</div> -->
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
