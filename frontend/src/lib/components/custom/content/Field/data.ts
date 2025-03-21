import type { PageUser } from '$lib/types/generic';

export interface BaseCropInterface {
	id: string;
	title: string;
	description: string;
	image: string;
}


export const crops = [
	{
		id: 'rice',
		title: 'Rice',
		description: 'A staple grain.',
		image: 'media/crops/rice.png'
	},
	{
		id: 'coffee',
		title: 'Coffee',
		description: 'A popular bean for drinks.',
		image: 'media/crops/coffee.png'
	},
	{
		id: 'wheat',
		title: 'Wheat',
		description: 'Used for making bread.',
		image: 'media/crops/wheat.png'
	},
	{
		id: 'corn',
		title: 'Corn',
		description: 'A versatile grain.',
		image: 'media/crops/corn.png'
	},
	{
		id: 'soybean',
		title: 'Soybeans',
		description: 'A protein-rich legume.',
		image: 'media/crops/soybean.png'
	},
	{
		id: 'potatoes',
		title: 'Potatoes',
		description: 'A starchy root.',
		image: 'media/crops/potatoes.png'
	},
	// {
	// 	id: 'tomatoes',
	// 	title: 'Tomatoes',
	// 	description: 'A juicy fruit.',
	// 	image: 'media/crops/tomatoes.png'
	// },
	// {
	// 	id: 'carrots',
	// 	title: 'Carrots',
	// 	description: 'A crunchy root.',
	// 	image: 'media/crops/carrots.png'
	// },
	// {
	// 	id: 'onions',
	// 	title: 'Onions',
	// 	description: 'A pungent vegetable.',
	// 	image: 'media/crops/onions.png'
	// },
	// {
	// 	id: 'lettuce',
	// 	title: 'Lettuce',
	// 	description: 'A leafy green.',
	// 	image: 'media/crops/lettuce.png'
	// },
	// {
	// 	id: 'cabbage',
	// 	title: 'Cabbage',
	// 	description: 'A leafy vegetable.',
	// 	image: 'media/crops/cabbage.png'
	// },
	// {
	// 	id: 'cucumbers',
	// 	title: 'Cucumbers',
	// 	description: 'A refreshing vegetable.',
	// 	image: 'media/crops/cucumbers.png'
	// },
	{
		id: 'cotton',
		title: 'Cotton',
		description: 'A fiber for textiles.',
		image: 'media/crops/cotton.png'
	},
	{
		id: 'jute',
		title: 'Jute',
		description: 'A fiber for ropes.',
		image: 'media/crops/jute.png'
	},
	{
		id: 'millet',
		title: 'Millet',
		description: 'A small grain.',
		image: 'media/crops/millet.png'
	},
	{
		id: 'peanut',
		title: 'Peanut',
		description: 'A nut for snacks.',
		image: 'media/crops/peanut.png'
	},
	{
		id: 'pulses',
		title: 'Pulses',
		description: 'Protein-rich legumes.',
		image: 'media/crops/pulses.png'
	},
	{
		id: 'sugarcane',
		title: 'Sugarcane',
		description: 'A source of sugar.',
		image: 'media/crops/sugarcane.png'
	},
] as const;

export type Crop = (typeof crops)[number];

export interface FieldInterface {
	label: string;
	createdAt: Date;
	size: {
		area: number;
	}
	cropId: Crop['id'];
	ownerId: PageUser['phone_number'];
}

export const mockFields: FieldInterface[] = [
	{
		label: 'Wheat Field',
		createdAt: new Date(),
		size: {
			area: 100
		},
		cropId: 'wheat',
		ownerId: '1'
	},
	{
		label: 'Coffee Field',
		createdAt: new Date('03.02.2024'),
		size: {
			area: 75
		},
		cropId: 'coffee',
		ownerId: '1'
	},
];
