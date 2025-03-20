<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';
	import type { SidebarInsertProps } from '../types';

	interface Props extends SidebarInsertProps {}

	let { isActive }: Props = $props();
</script>

<Badge variant={isActive ? 'default' : 'outline'} class={cn('text-xs font-medium', isActive ? '' : 'group-hover/menu-button:text-primary group-hover/menu-button:border-primary/10  text-muted-foreground')}>Coming Soon</Badge>
