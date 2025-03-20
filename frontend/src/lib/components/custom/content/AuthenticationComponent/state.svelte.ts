import type { E164Number } from 'svelte-tel-input/types';

interface PhoneNumber {
	value: E164Number | null;
	valid: boolean;
}

interface Verification {
	active: boolean;
	validCode: string;
	code: string;
}

interface AuthenticationState {
	showPreview: boolean;
	verification: Verification;
	phoneNumber: PhoneNumber;
}

export const authenticationState = $state<AuthenticationState>({
	showPreview: false,
	verification: {
		active: false,
		validCode: '12345',
		code: ''
	},
	phoneNumber: {
		value: '+91',
		valid: false
	}
});
