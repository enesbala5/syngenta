<script lang="ts">
	import DarkModeToggle from '../DarkModeToggle/DarkModeToggle.svelte';
	import LanguagePicker from '../LanguagePicker/LanguagePicker.svelte';
	import UserDropdown from '../UserDropdown/UserDropdown.svelte';
	import { GlobeIcon, LogOutIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/services/routeHandler';
	import type { PageUser } from '$lib/types/generic';
	import { company } from '$lib/data/generic';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import CoinIcon from '../Icons/CoinIcon/CoinIcon.svelte';

	interface Props {
		user: PageUser;
	}

	const { user } = $props();
</script>

<div class="container-width-sm relative flex w-full items-center justify-between py-4">
	<!-- border-r border-muted-foreground/50 pr-6 -->
	<a href={route('/(app)/(homepage)')} class="mr-4 w-full font-bold">
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
</div>
