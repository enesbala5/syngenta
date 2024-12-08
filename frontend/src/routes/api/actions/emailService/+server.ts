import { emailTemplates, type EmailTemplateKey, type EmailData } from '$lib/services/emailService/templates';
import { RESEND_API_KEY } from '$env/static/private';
import { route } from '$lib/services/routeHandler';
import { company, RequestMethod } from '$lib/data/generic';
import type { RequestHandler } from './$types';

interface Props {
	from: string;
	to: string;
	template: EmailTemplateKey;
	data?: EmailData;
}

let Resend_API = 'https://api.resend.com/emails';

export const POST: RequestHandler = async ({ request, url }) => {
	const { from, to, template, data }: Props = await request.json();

	let websafeEmail = encodeURI(to);
	let unsubscribeURL = `${route('/api/actions/emailSubscription/[email]', {
		params: {
			email: websafeEmail,
		},
		baseUrl: url.origin,
		query: {
			unsubscribe: true,
		},
	})}`;

	const headers = {
		'X-Entity-Ref-ID': crypto.randomUUID(),
		'List-Unsubscribe': unsubscribeURL,
	};

	// Passing Base URL and Unsubscibe URL
	const templateParsed = emailTemplates[template]({
		toEmail: to,
		baseURL: url.origin,
		unsubscribeURL,
		iconURL: `/media/${company.brand.icon.black.svg}`,
		logoURL: `/media/${company.brand.main.black.svg}`,
		companyName: company.name,
		data: data,
	});

	const body = {
		to,
		from,
		headers,
		subject: templateParsed.subject,
		html: templateParsed.html,
		data,
	}

	const res = await fetch(Resend_API, {
		method: RequestMethod.POST,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${RESEND_API_KEY}`,
			...headers,
		},
		body: JSON.stringify(body),
	});

	console.log('res', body.from, body.to, await res.json())
	if (res.ok) return new Response('true');
	return new Response('false');
};
