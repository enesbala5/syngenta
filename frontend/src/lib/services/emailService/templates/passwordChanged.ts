import type { TemplateParams } from '../templates';

const templateHTML = ({ toEmail, baseURL, unsubscribeURL, iconURL, logoURL }: TemplateParams): string =>
	`<strong>Your password has been changed</strong>`;

// export template HTML as default

export default templateHTML;
