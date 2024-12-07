import { company, RequestMethod } from '$lib/data/generic';
import type { FetchFunction } from '$lib/types/generic';

import { route } from '../routeHandler';
import type { EmailData, EmailTemplateKey } from './templates';

export class EmailHandler {
	constructor(email: string, fetch?: any) {
		this.email = email;
		if (fetch) this.fetchFn = fetch;
	}

	email: string;
	fetchFn: FetchFunction = fetch;

	/**
	 * Sends an email to the user
	 * ->
	 *
	 * @param template Email template
	 * @param data Other data which can be consumed by the template
	 * @returns void
	 */
	public sendEmail = async (template: EmailTemplateKey, data?: EmailData) => {
		const res = await this.fetchFn(route('/api/actions/emailService'), {
			method: RequestMethod.POST,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: `${company.name} <${company.email.main}>`,
				to: [this.email],
				template: template,
				data: data,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			return data;
		}
	};
}
