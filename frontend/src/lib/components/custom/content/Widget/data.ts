import type { Component, SvelteComponent } from 'svelte';
import LocationWidget from './components/LocationWidget.svelte';
import HarvestWidget from './components/HarvestWidget.svelte';
import RiskProfileWidget from './components/RiskProfileWidget.svelte';
// import ExpectedYieldWidget from './components/ExpectedYieldWidget.svelte';
import ImageWidget from './components/ImageWidget.svelte';
import VideoWidget from './components/VideoWidget.svelte';
import WeatherWidget from './components/WeatherWidget.svelte';
import ExplanationWidget from './components/ExplanationWidget.svelte';
import StoryWidget from './components/StoryWidget.svelte';
import WelcomeWidget from './components/WelcomeWidget.svelte';
import client from '$lib/services/api';
import type { BackendSchema } from '$lib/types/generic';
import ChartWidget from './components/ChartWidget.svelte';
import TextWidget from './components/TextWidget.svelte';

// Define widget types
export type WidgetType =
	"hello" |
	"weather" |
	"image" |
	"video" |
	"location" |
	"explanation" |
	"story" |
	"harvest" |
	"chart" |
	"stress_risk" |
	"yield_risk" |
	"nutrient_risk" |
	"general_risk"

export type WidgetDirection = 'positive' | 'negative' | 'neutral';

export type WeatherWidgetInterface = {
	type: 'weather';
	// content: {
	// 	weather: Weather;
	// 	location?: string;
	// } & Pick<WidgetContent, 'title' | 'subtitle' | 'description'>
	content: {
		location?: string;
		title: string;
		subtitle: string;
		description: string;
	}
};

export type HarvestWidgetInterface = {
	type: 'harvest'; // forecast
	content: {
		location?: string;
		title: string;
		subtitle: string;
		description: string;
	}
};




// Widget interface

export type WidgetInterface = BackendSchema["ImageWidgetModel"] | BackendSchema["VideoWidgetModel"] | BackendSchema["WeatherWidgetModel"];


// Component mapping interface
export interface WidgetComponentMapping {
	component: Component<any>;
	props?: Record<string, any>;
}

// Simplified widget mappings
export const widgetMappings = (): Record<WidgetType, WidgetComponentMapping> => {
	return {
		hello: {
			component: TextWidget,
			props: {
				class: 'col-span-2'
			}
		},
		location: {
			component: LocationWidget,
			props: {
				// colorTheme: 'emerald',
				// icon: 'map-pin',
				class: 'col-span-2'

			}
		},
		harvest: {
			component: HarvestWidget,
			props: {
				// colorTheme: 'amber',
				// icon: 'wheat',
				class: 'col-span-2'

			}
		},
		general_risk: {
			component: RiskProfileWidget,
			props: {
				// colorTheme: 'rose',
				// icon: 'alert-triangle',
				class: 'col-span-2'

			}
		},
		nutrient_risk: {
			component: RiskProfileWidget,
			props: {
				// colorTheme: 'rose',
				// icon: 'alert-triangle',
				class: 'col-span-2'

			}
		},
		yield_risk: {
			component: RiskProfileWidget,
			props: {
				class: 'col-span-2'
			}
		},
		chart: {
			component: ChartWidget,
			props: {
				class: 'col-span-2'

			}
		},
		image: {
			component: ImageWidget,
			props: {
				// colorTheme: 'sky',
				// icon: 'image',
				class: 'col-span-2'

			}
		},
		video: {
			component: VideoWidget,
			props: {
				// colorTheme: 'violet',
				// icon: 'video',
				class: 'col-span-2'

			}
		},
		weather: {
			component: WeatherWidget,
			props: {
				// colorTheme: 'cyan',
				// icon: 'cloud',
				class: 'col-span-2'

			}
		},
		explanation: {
			component: ExplanationWidget,
			props: {
				// colorTheme: 'yellow',
				// icon: 'info',
				class: 'col-span-2'

			}
		},
		story: {
			component: StoryWidget,
			props: {
				// colorTheme: 'fuchsia',
				// icon: 'book-open',
				class: 'col-span-2'

			}
		},
		stress_risk: {
			component: RiskProfileWidget,
			props: {
				// colorTheme: 'red',
				// icon: 'thermometer',
				class: 'col-span-2'

			}
		},
	};
};

// Direction styles mapping
export const directionStyles = {
	positive: {
		text: 'text-green-600 dark:text-green-400',
		icon: 'arrow-up',
		iconClass: 'text-green-600 dark:text-green-400'
	},
	negative: {
		text: 'text-red-600 dark:text-red-400',
		icon: 'arrow-down',
		iconClass: 'text-red-600 dark:text-red-400'
	},
	neutral: {
		text: 'text-gray-600 dark:text-gray-400',
		icon: 'minus',
		iconClass: 'text-gray-600 dark:text-gray-400'
	}
};
