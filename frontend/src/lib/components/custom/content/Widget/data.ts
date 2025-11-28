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
				class: 'col-span-2 min-h-96'
			}
		},
		location: {
			component: LocationWidget,
			props: {
				// colorTheme: 'emerald',
				// icon: 'map-pin',
				class: 'col-span-2 min-h-96'

			}
		},
		harvest: {
			component: HarvestWidget,
			props: {
				// colorTheme: 'amber',
				// icon: 'wheat',
				class: 'col-span-2 min-h-96'

			}
		},
		general_risk: {
			component: RiskProfileWidget,
			props: {
				// colorTheme: 'rose',
				// icon: 'alert-triangle',
				class: 'col-span-2 min-h-96'

			}
		},
		nutrient_risk: {
			component: RiskProfileWidget,
			props: {
				// colorTheme: 'rose',
				// icon: 'alert-triangle',
				class: 'col-span-2 min-h-96'

			}
		},
		yield_risk: {
			component: RiskProfileWidget,
			props: {
				class: 'col-span-2 min-h-96'
			}
		},
		chart: {
			component: ChartWidget,
			props: {
				class: 'col-span-2 min-h-96'

			}
		},
		image: {
			component: ImageWidget,
			props: {
				// colorTheme: 'sky',
				// icon: 'image',
				class: 'col-span-2 min-h-96'

			}
		},
		video: {
			component: VideoWidget,
			props: {
				// colorTheme: 'violet',
				// icon: 'video',
				class: 'col-span-2 min-h-96'

			}
		},
		weather: {
			component: WeatherWidget,
			props: {
				// colorTheme: 'cyan',
				// icon: 'cloud',
				class: 'col-span-2 min-h-96'

			}
		},
		explanation: {
			component: ExplanationWidget,
			props: {
				// colorTheme: 'yellow',
				// icon: 'info',
				class: 'col-span-2 min-h-96'

			}
		},
		story: {
			component: StoryWidget,
			props: {
				// colorTheme: 'fuchsia',
				// icon: 'book-open',
				class: 'col-span-2 min-h-96'

			}
		},
		stress_risk: {
			component: RiskProfileWidget,
			props: {
				// colorTheme: 'red',
				// icon: 'thermometer',
				class: 'col-span-2 min-h-96'

			}
		},
	};
};

// Direction styles mapping
export const directionStyles = {
	increase: {
		text: 'text-green-600 dark:text-green-400',
		icon: 'arrow-up',
		iconClass: 'text-green-600 dark:text-green-400'
	},
	decrease: {
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


export type RiskCondition = 'severe' | 'bad' | 'moderate' | 'good' | 'excellent';

const riskStyles: Record<RiskCondition, { gradient: string; text: string }> = {
	severe: {
		gradient: 'from-red-100 to-red-200',
		text: 'text-red-700'
	},
	bad: {
		gradient: 'from-orange-100 to-orange-200',
		text: 'text-orange-700'
	},
	moderate: {
		gradient: 'from-yellow-100 to-yellow-200',
		text: 'text-yellow-700'
	},
	good: {
		gradient: 'from-blue-100 to-blue-200',
		text: 'text-blue-700'
	},
	excellent: {
		gradient: 'from-green-100 to-green-200',
		text: 'text-green-700'
	}
};

export function getRiskStyle(score: number) {
	if (score <= 20) return riskStyles.severe;
	if (score <= 40) return riskStyles.bad;
	if (score <= 60) return riskStyles.moderate;
	if (score <= 80) return riskStyles.good;
	return riskStyles.excellent;
}