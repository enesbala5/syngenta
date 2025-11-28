import ComingSoonBadge from '$lib/components/custom/content/Sidebar/ComingSoonBadge/ComingSoonBadge.svelte';
import { route } from '$lib/services/routeHandler';
import type { PageUser } from '$lib/types/generic';
import { BellIcon, CompassIcon, LifeBuoy, HomeIcon, MessageSquareIcon, UserIcon, UsersIcon, VideoIcon, SendIcon, LifeBuoyIcon, MessagesSquareIcon, BrainCircuitIcon } from 'lucide-svelte';

export const routes = ({ user }: { user: PageUser }) => {
	return {
		user,
		navMain: [
			{
				title: 'Home',
				url: route('/(app)/(homepage)'),
				icon: HomeIcon,
				isActive: true,
			},
			{
				title: 'Knowledge Base',
				url: route('/(app)/knowledge'),
				icon: BrainCircuitIcon,
			},
		],
		navSecondary: [
			{
				title: 'Support',
				url: route('/(app)/(homepage)'), // TODO: Change to support once page is created
				icon: LifeBuoyIcon,
			},
			{
				title: 'Feedback',
				url: route('/(app)/(homepage)'), // TODO: Change to feedback once page is created
				icon: SendIcon,
			},
		],
	};
};