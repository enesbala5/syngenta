export enum RequestMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

export const company = {
	name: 'Dell',
	address: {
		main: 'Blv. Gjergj Fishta, 1006, Tirana, Albania',
		href: 'https://www.google.com/maps/dir//Blv.%20Gjergj%20Fishta,%201006,%20Tirana,%20Albania'
	},
	phone: {
		main: '+49 1515 1839 001',
		href: 'tel:+4915151839001'
	},
	staff: {
		ceo: 'Komnene A.',
		cofounder: 'Enes Bala',
	},
	email: {
		main: 'contact@dell.com',
		support: 'support@dell.com'
	},
	domain: {
		full: 'https://www.dell.com',
		short: 'dell.com',
	},
	brand: {
		main: {
			alt: 'Main Logo',
			black: {
				svg: '/brand/logo/black.svg',
			},
			white: {
				svg: '/brand/logo/white.svg',
			},
		},
		integrated: {
			alt: 'Integrated Logo',
			black: {
				svg: '/brand/integrated/black.svg',
			},
			white: {
				svg: '/brand/integrated/white.svg',
			},
		},
		small: {
			alt: 'Small Logo',
			black: {
				svg: '/brand/small/black.svg',
			},
			white: {
				svg: '/brand/small/white.svg',
			},
		},
		wordmark: {
			alt: 'Wordmark Logo',
			black: {
				svg: '/brand/wordmark/black.svg',
			},
			white: {
				svg: '/brand/wordmark/white.svg',
			},
		},
		icon: {
			alt: 'Icon Logo',
			svg: '/brand/icon.svg',
		},
	},
	social: {
		facebook: {
			href: '#'
		},
		twitter: {
			href: '#'
		},
		linkedin: {
			href: '#'
		},
		instagram: {
			href: '#'
		},
	}
};
