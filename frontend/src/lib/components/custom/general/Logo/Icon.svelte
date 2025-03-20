<script lang="ts">
	import { mode } from 'mode-watcher';

	interface Colors {
		primary?: string;
		secondary?: string;
		text?: string;
	}

	interface Props {
		class: string;
		colors?: {
			light: Colors;
			dark: Colors;
		};
	}

	let {
		class: className,
		colors = {
			light: {
				primary: '#FF5964',
				secondary: '#0B032D',
				text: '#0B032D'
			},
			dark: {
				primary: '#FF5964',
				secondary: '#fff',
				text: '#ffffff'
			}
		}
	}: Props = $props();

	let currentMode: 'dark' | 'light' = $derived($mode ?? 'light');
</script>

<svg class={className} viewBox="0 0 530 452" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M194.18 51.98L414.93 272.73L271.93 415.73L51.18 194.97C14.43 158.22 16.64 96.41 56.13 56.92C95.62 17.43 157.42 15.21 194.18 51.97V51.98Z"
		fill={colors[currentMode].primary}
		stroke={colors[currentMode].secondary}
		stroke-width="50"
		stroke-miterlimit="10"
	/>
	<path
		d="M431.97 234.08L477.94 188.11C513.98 152.07 512.53 92.1801 474.7 54.3501C436.87 16.5201 376.98 15.0701 340.94 51.1101L266.62 125.43"
		stroke={colors[currentMode].secondary}
		fill={'transparent'}
		stroke-width="50"
		stroke-miterlimit="10"
	/>
	<path
		d="M125.63 171.93C149.93 171.93 169.63 152.231 169.63 127.93C169.63 103.63 149.93 83.9302 125.63 83.9302C101.329 83.9302 81.6299 103.63 81.6299 127.93C81.6299 152.231 101.329 171.93 125.63 171.93Z"
		fill={colors[currentMode].secondary}
	/>
</svg>
