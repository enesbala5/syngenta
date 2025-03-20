import type { Component, SvelteComponent } from 'svelte';
import HelloWidget from './components/HelloWidget.svelte';
import LocationWidget from './components/LocationWidget.svelte';
import HarvestWidget from './components/HarvestWidget.svelte';
import RiskProfileWidget from './components/RiskProfileWidget.svelte';
import ExpectedYieldWidget from './components/ExpectedYieldWidget.svelte';
import ImageWidget from './components/ImageWidget.svelte';
import VideoWidget from './components/VideoWidget.svelte';
import WeatherWidget from './components/WeatherWidget.svelte';
import ExplanationWidget from './components/ExplanationWidget.svelte';
import StoryWidget from './components/StoryWidget.svelte';
import WelcomeWidget from './components/WelcomeWidget.svelte';

// Define widget types
export type WidgetType = 
  | 'hello'
  | 'location'
  | 'harvest'
  | 'riskProfile'
  | 'expectedYield'
  | 'image'
  | 'video'
  | 'weather'
  | 'explanation'
  | 'story'
  | 'quality'
  | 'temperature'
  | 'moisture'
  | 'welcome'
  | 'chart';

export type WidgetDirection = 'positive' | 'negative' | 'neutral';

// Widget content interface
export interface WidgetContent {
  title?: string;
  subtitle?: string;
  expanded?: boolean;
  change?: string;
  symbol?: string;
  direction?: WidgetDirection;
  widgets?: WidgetInterface[];
  steps?: string[];
  name?: string;
  location?: string;
  imageUrl?: string;
  videoUrl?: string;
  slides?: Array<{title: string; content: string; imageUrl?: string}>;
  scores?: {
    stress?: number;
    yield?: number;
    nutrient?: number;
  };
  progress?: number;
  [key: string]: any;
}

// Widget interface
export interface WidgetInterface {
  type: WidgetType;
  content: WidgetContent;
  expanded?: boolean;
}

// Component mapping interface
export interface WidgetComponentMapping {
  component: Component<any>;
  props?: Record<string, any>;
}

// Simplified widget mappings
export const widgetMappings = (): Record<WidgetType, WidgetComponentMapping> => {
  return {
    hello: {
      component: HelloWidget,
      props: {
        colorTheme: 'indigo',
        icon: 'user'
      }
    },
    location: {
      component: LocationWidget,
      props: {
        colorTheme: 'emerald',
        icon: 'map-pin'
      }
    },
    harvest: {
      component: HarvestWidget,
      props: {
        colorTheme: 'amber',
        icon: 'wheat'
      }
    },
    riskProfile: {
      component: RiskProfileWidget,
      props: {
        colorTheme: 'rose',
        icon: 'alert-triangle'
      }
    },
    expectedYield: {
      component: ExpectedYieldWidget,
      props: {
        colorTheme: 'lime',
        icon: 'trending-up'
      }
    },
    image: {
      component: ImageWidget,
      props: {
        colorTheme: 'sky',
        icon: 'image'
      }
    },
    video: {
      component: VideoWidget,
      props: {
        colorTheme: 'violet',
        icon: 'video'
      }
    },
    weather: {
      component: WeatherWidget,
      props: {
        colorTheme: 'cyan',
        icon: 'cloud'
      }
    },
    explanation: {
      component: ExplanationWidget,
      props: {
        colorTheme: 'yellow',
        icon: 'info'
      }
    },
    story: {
      component: StoryWidget,
      props: {
        colorTheme: 'fuchsia',
        icon: 'book-open'
      }
    },
    quality: {
      component: ExplanationWidget,
      props: {
        colorTheme: 'green',
        icon: 'soil'
      }
    },
    temperature: {
      component: WeatherWidget,
      props: {
        colorTheme: 'red',
        icon: 'thermometer'
      }
    },
    moisture: {
      component: WeatherWidget,
      props: {
        colorTheme: 'blue',
        icon: 'droplet'
      }
    },
    chart: {
      component: ExplanationWidget,
      props: {
        colorTheme: 'purple',
        icon: 'bar-chart'
      }
    },
		welcome: {
      component: WelcomeWidget,
      props: {
        colorTheme: 'purple',
        icon: 'bar-chart'
      }
    }
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
