import { company } from '$lib/data/generic';
import {
	Building2Icon,
	MailIcon,
	PhoneIcon,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	InstagramIcon,
} from "lucide-svelte";

export const contactInfo = [
	{
		icon: Building2Icon,
		title: "Office Address",
		content: company.address.main,
		href: company.address.href,
	},
	{
		icon: PhoneIcon,
		title: "Phone Number",
		content: company.phone.main,
		href: company.phone.href,
	},
	{
		icon: MailIcon,
		title: "Email Address",
		content: company.email.main,
		href: 'mailto:' + company.email.main,
	},
];

export const socialLinks = [
	{ icon: FacebookIcon, href: company.social.facebook.href, label: "Facebook" },
	{ icon: TwitterIcon, href: company.social.twitter.href, label: "Twitter" },
	{ icon: LinkedinIcon, href: company.social.linkedin.href, label: "LinkedIn" },
	{ icon: InstagramIcon, href: company.social.instagram.href, label: "Instagram" },
];
