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
			primary: {
				svg: '/brand/logo/primary.svg',
			},
		},
		icon: {
			primary: {
				alt: 'Icon Logo',
				svg: '/brand/icon/primary.svg',
			},
			white: {
				alt: 'Icon Logo',
				svg: '/brand/icon/white.svg',
			},
			black: {
				alt: 'Icon Logo',
				svg: '/brand/icon/black.svg',
			},
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
