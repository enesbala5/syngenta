<script lang="ts">
	import ReturnButton from '$lib/components/custom/general/Buttons/ReturnButton/ReturnButton.svelte';
	import LanguagePicker from '$lib/components/custom/general/LanguagePicker/LanguagePicker.svelte';
	import DarkModeToggle from '$lib/components/custom/general/DarkModeToggle/DarkModeToggle.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { UserPlus2Icon, GlobeIcon, HomeIcon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import UserAuthForm from './components/UserAuthForm.svelte';
	import { company, RequestMethod } from '$lib/data/generic';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { route } from '$lib/services/routeHandler';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import image from '$lib/assets/media/auth/light.png?as=run';
	import Img from '@zerodevx/svelte-img';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	let isLoading: boolean = $state(false);

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;

		return async ({ update, result }) => {
			if (result.type === 'failure') {
				console.log({ result });
				toast.error(result.data?.message, {});
			}
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
		class="innerContainerSizing flex h-full w-full flex-col items-center rounded-xl px-4 pb-2 pt-4 dark:bg-neutral-900 lg:w-1/2 lg:bg-neutral-100 lg:px-6 lg:pt-6 dark:lg:border dark:lg:border-neutral-800"
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
		<section class="h-full w-full overflow-y-auto px-1">
			<div class="mt-24 flex w-full flex-col md:mt-32">
				<div class="mb-10 w-full max-w-lg">
					<h1 class=" text-4xl font-semibold">Welcome back!</h1>
					<p class="mt-4 opacity-80">
						Sign in to <span class="font-medium">{company.name}</span> or
						<a
							href={route('/(auth)/register')}
							class="whitespace-nowrap text-primary underline underline-offset-4 hover:text-primary"
							>create an account</a
						>
					</p>
				</div>
			</div>
			<section class="flex w-full flex-col">
				<form
					class="w-full"
					action="?/login"
					method={RequestMethod.POST}
					use:enhance={handleSubmit}
				>
					<UserAuthForm {form} {isLoading} />
				</form>

				<!-- ? SOCIAL LOGIN -->
				<!-- <div class="relative my-5 flex items-center justify-center text-sm">
					<div
						class="z-10 bg-neutral-50 px-4 transition-all duration-300 ease-in-out dark:bg-neutral-900 lg:bg-neutral-100"
					>
						<p class="text-neutral-500">New to {company.name}?</p>
					</div>
					<div
						class="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-300 transition-all duration-300 ease-in-out dark:bg-neutral-700"
					></div>
				</div> -->
				<!-- TODO: Implement 0AUTH -->
				<!-- <div
					class="mb-2 flex flex-col items-center justify-between space-y-2 md:flex-row md:space-x-2 md:space-y-0"
				>
					<Button
						href={route('/(auth)/login/github')}
						size={'default'}
						variant={'outline'}
						class="w-full gap-x-2"
					>
						<img src="media/logos/github/icon.svg" alt="Github Icon" class="size-4 dark:invert" />
						Sign In with GitHub
					</Button>
					<Button
						href={route('/(auth)/login/google')}
						size={'default'}
						variant={'outline'}
						class="w-full gap-x-2"
					>
						<img src="media/logos/google/icon.svg" alt="Google Icon" class="size-4 dark:invert" />
						Sign In with Google
					</Button>

				</div> -->
				<!-- <Button size="default" variant="outline" href={route('/(auth)/register')}>
					<UserPlus2Icon class="icon iconWhite wGroup wHover h-5 w-5" />
					<p>Create your {company.name} Account</p>
				</Button> -->

				<!-- END -->
			</section>
		</section>
		<div
			class="mt-auto w-full place-self-end border-t pt-2 text-center selection:bg-neutral-800 selection:text-neutral-50 dark:border-neutral-800 dark:selection:bg-white dark:selection:text-neutral-900"
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
		class="innerContainerSizing relative hidden w-1/2 items-center justify-center overflow-hidden rounded-xl lg:flex"
	>
		<Img src={image} class="h-full min-h-screen w-full object-cover" alt="Abstract Image" />
		<!-- <div class={'absolute inset-0 z-10 flex items-center justify-center bg-black/60'}>
			<Logo className="w-48 lg:w-64 " modeOverride={'dark'} />
		</div>
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
