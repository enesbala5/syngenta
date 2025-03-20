<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		content: any;
	}

	const { content }: Props = $props();
</script>

<div class={cn('  ')}>
	<h2 class={cn('text-7xl font-semibold text-amber-800 dark:text-amber-300')}>
		{content?.title}

		<span class={cn('font-bold text-amber-600 dark:text-amber-500')}>
			{content?.name}
			<!-- Icon and content -->
		</span>
	</h2>
</div>
