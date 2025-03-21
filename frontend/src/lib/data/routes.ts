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
			// {
			// 	title: 'Explore',
			// 	url: route('/(app)/(homepage)'),
			// 	icon: CompassIcon,
			// },
			// {
			// 	title: 'LIVE',
			// 	url: route('/(app)/(homepage)'),
			// 	icon: VideoIcon,
			// 	suffix: ComingSoonBadge,
			// },
			// {
			// 	title: 'Following',
			// 	url: route('/(app)/(homepage)'),
			// 	icon: UsersIcon,
			// },
			// {
			// 	title: 'Messages',
			// 	url: route('/(app)/(homepage)'),
			// 	icon: MessageSquareIcon,
			// },
			// {
			// 	title: 'Notifications',
			// 	url: route('/(app)/(homepage)'),
			// 	icon: BellIcon,
			// },
			// {
			// 	title: 'Profile',
			// 	url: route('/(app)/(homepage)'),
			// 	icon: UserIcon,
			// },
		],
		navSecondary: [
			{
				title: 'Support',
				url: route('/(app)/support'),
				icon: LifeBuoyIcon,
			},
			{
				title: 'Feedback',
				url: route('/(app)/feedback'),
				icon: SendIcon,
			},
		],
	};
};