import type { SvelteComponent } from 'svelte';

// Define widget types
export type WidgetType = 'quality' | 'temperature' | 'moisture' | 'explanation' | 'chart';
export type WidgetDirection = 'positive' | 'negative' | 'neutral';

// Widget content interface
export interface WidgetContent {
  title: string;
  expanded?: boolean;
  change?: string;
  direction?: WidgetDirection;
  widget?: Widget;
  steps?: string[];
  [key: string]: any;
}

// Widget interface
export interface Widget {
  type: WidgetType;
  content: WidgetContent;
  expanded?: boolean;
}

// Component mapping interface
export interface WidgetComponentMapping {
  component?: typeof SvelteComponent;
  props?: Record<string, any>;
  styles: {
    container: string;
    title: string;
    badge: string;
    icon?: string;
  };
}

// Widget component mappings
export const widgetMappings = (): Record<WidgetType, WidgetComponentMapping> => {
  return {
    quality: {
      styles: {
        container: 'border-green-600/80 dark:border-green-400/40 bg-green-100/50 dark:bg-green-900/30',
        title: 'text-green-800 dark:text-green-300',
        badge: 'bg-green-600 dark:bg-green-500 text-white',
        icon: 'soil'
      }
    },
    
    temperature: {
      styles: {
        container: 'border-red-600/80 dark:border-red-400/40 bg-red-100/50 dark:bg-red-900/30',
        title: 'text-red-800 dark:text-red-300',
        badge: 'bg-red-600 dark:bg-red-500 text-white',
        icon: 'thermometer'
      }
    },
    
    moisture: {
      styles: {
        container: 'border-blue-600/80 dark:border-blue-400/40 bg-blue-100/50 dark:bg-blue-900/30',
        title: 'text-blue-800 dark:text-blue-300',
        badge: 'bg-blue-600 dark:bg-blue-500 text-white',
        icon: 'droplet'
      }
    },
    
    explanation: {
      styles: {
        container: 'border-yellow-600/80 dark:border-yellow-400/40 bg-yellow-100/50 dark:bg-yellow-900/30',
        title: 'text-yellow-800 dark:text-yellow-300',
        badge: 'bg-yellow-600 dark:bg-yellow-500 text-white',
        icon: 'info'
      }
    },
    
    chart: {
      styles: {
        container: 'border-purple-600/80 dark:border-purple-400/40 bg-purple-100/50 dark:bg-purple-900/30',
        title: 'text-purple-800 dark:text-purple-300',
        badge: 'bg-purple-600 dark:bg-purple-500 text-white',
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

// Helper function to get widget styling based on type
export const getWidgetStyles = (type: WidgetType): WidgetComponentMapping => {
  return widgetMappings()[type] || widgetMappings().quality;
};

// Helper function to get direction styling
export const getDirectionStyles = (direction: WidgetDirection) => {
  return directionStyles[direction] || directionStyles.neutral;
};
