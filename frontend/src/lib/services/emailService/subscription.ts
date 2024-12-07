
import { company, RequestMethod } from '$lib/data/generic';
import { toast } from 'svelte-sonner';
import { EmailHandler } from '.';
import { route } from '../routeHandler';
import { Toaster } from '$lib/components/ui/sonner';

export class EmailSubscriptionHandler {
	constructor(email: string, absoluteUrl?: string, fetch?: any) {
		this.email = email;
		if (absoluteUrl) this.absoluteUrl = this.absoluteUrl;
		if (fetch) this.fetch = fetch;
	}
	email: string;
	fetch: any = fetch;

	/**
	 * Workaround to be able to use this in Server
	 */
	absoluteUrl?: string;
	/**
	 * Subscribe
	 * @param email
	 * @description Subscribe an email to the email subscription list
	 */
	public async subscribe(email: string = this.email, absoluteUrl: string | undefined = this.absoluteUrl) {
		// Make POST request to nav.api.emailSubscription with the body {email: email}

		// -> If successful, return true
		// -> If unsuccessful, return false
		const response = await this.fetch(route('/api/actions/emailSubscription', { baseUrl: absoluteUrl }), {
			method: RequestMethod.POST,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (!response.ok || !response) {
			toast.error('Oops! Something went wrong.', {
				description: 'Something went wrong. Please try again later.',
			});
			return;
		}

		const data: boolean | Error = await response.json();

		if (typeof data === 'object') {
			toast.error('Oops! Something went wrong.', {
				description: data.message,
			});
			return data;
		}

		const emailService = new EmailHandler(company.email.support);

		await emailService.sendEmail('passwordChanged');

		toast.success('Thank you for subscribing!', {
			description: 'Your email has been registered. You can unsubscribe at any time.'
		})

		return data;
	}
	
	public async unsubscribe(email: string = this.email, absoluteUrl: string | undefined = this.absoluteUrl) {
		// Make POST request to nav.api.emailSubscription with the body {email: email}

		// -> If successful, return true
		// -> If unsuccessful, return false
		const response = await this.fetch(
			route('/api/actions/emailSubscription/[email]', {
				params: { email },
				baseUrl: absoluteUrl,
				query: { unsubscribe: true },
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		toast.success("Unsubscribed successfully!", {
			description: "You can resubscribe at any time."
		})

		return true;
	}
	/**
	 * Check Subscribed
	 * @param email
	 * @description Check if an email is subscribed to the email subscription list
	 */
	public checkSubscribed = async (
		email: string = this.email,
		absoluteUrl: string | undefined = this.absoluteUrl,
	): Promise<boolean | Error> => {
		// Make GET request to nav.api.emailSubscription with the body {email: email}

		// If successful, return true
		// If unsuccessful, return false
		const response = await fetch(
			route('/api/actions/emailSubscription', {
				baseUrl: absoluteUrl,
				query: {
					email,
				},
			}),
			{
				method: RequestMethod.GET,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			return {
				name: 'Error',
				message: 'Something went wrong.',
			};
		}
		const data: boolean = (await response.json()) === true;

		return data;
	};
}
