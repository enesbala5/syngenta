import confirmEmail from './templates/confirmEmail';
import resetPassword from './templates/resetPassword';
import newsletterSubscription from './templates/newsletterSubscription';
import passwordChanged from './templates/passwordChanged';

export type EmailTemplateKey = 'confirmEmail' | 'resetPassword' | 'emailSubscribed' | 'passwordChanged' | 'supportEmail'

export interface EmailData {
	actionUrl?: string | undefined,
	requestFromIp?: string | undefined,
	[key: string]: any;
}


export interface TemplateParams {
	toEmail: string;
	baseURL: string;
	unsubscribeURL: string;
	iconURL: string;
	logoURL: string;
	companyName: string;
	data?: EmailData;
}

export type EmailTemplates = {
	[key in EmailTemplateKey]: (params: TemplateParams) => {
		subject: string;
		html: string;
	};
};

export const emailTemplates: EmailTemplates = {
	confirmEmail: (params) => {
		return {
			subject: 'Confirm your email',
			html: confirmEmail({ ...params }),
		};
	},
	resetPassword: (params) => {
		return {
			subject: 'Reset your password',
			html: resetPassword({ ...params }),
		};
	},
	emailSubscribed: (params) => {
		return {
			subject: `You ${params.toEmail} have subscribed to our newsletter`,
			html: newsletterSubscription({ ...params }),
		};
	},
	passwordChanged: (params) => {
		return {
			subject: 'Your password has been changed',

			html: passwordChanged({ ...params }),
		};
	},
	supportEmail: (params) => {
		return {
			subject: `Support Email - ${params.data}`,
			html: `
			`
		}
	}
};
