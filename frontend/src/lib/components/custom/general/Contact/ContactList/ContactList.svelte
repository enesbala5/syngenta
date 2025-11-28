<script lang="ts">
	import { company } from '$lib/data/generic';
	import { route } from '$lib/services/routeHandler';
	import ArrowButtonSuffix from '../../Buttons/elements/ArrowButtonSuffix/ArrowButtonSuffix.svelte';
</script>

<address class="my-4 flex flex-col gap-2 border-y border-muted py-4 dark:border-card/10">
	<a class="group flex w-fit items-center justify-between gap-0" href={route('/(app)/contact')}
		>Website Form <ArrowButtonSuffix size="sm" />
	</a>
	<a
		class="group flex w-fit items-center justify-between gap-0"
		href={'mailto:' + company.email.support}
		>{company.email.support} <ArrowButtonSuffix size="sm" />
	</a>
	<a class="group flex w-fit items-center justify-between gap-0" href={company.phone.href}
		>{company.phone.main} <ArrowButtonSuffix size="sm" />
	</a>
</address>
