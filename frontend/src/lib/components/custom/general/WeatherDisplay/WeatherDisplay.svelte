<script lang="ts">
	import type { BackendSchema } from '$lib/types/generic';

	interface Props extends Pick<BackendSchema['WeatherContent'], 'icon'> {
		class?: string;
	}

	const { icon, class: className }: Props = $props();

	const iconDirectory = '/media/weather-icons/icons/';
</script>

<img src={iconDirectory + icon + '.svg'} alt="" class={className} />

<!-- 
<style>
	.wi-icon {
		position: relative;
		display: flex;
		padding: 24px 6px;
		align-items: center;
		flex-flow: column;
		justify-content: center;
		background: hsla(var(--gray-0));
		border-radius: 6px;
		box-shadow: var(--shadow-2);
	}

	.wi-icon img {
		position: relative;
		display: block;
		height: 120px;
		width: 120px;
		margin-bottom: 12px;
		transition: inherit;
	}

	.wi-icon span {
		font-size: 10px;
		font-weight: 500;
		text-align: center;
		transition: inherit;
	}

	.wi-icons-new .wi-icon {
		padding: 12px;
	}

	.wi-icons-new .wi-icon img {
		height: 60px;
		width: 60px;
		margin-bottom: 0;
	}

	@media (max-width: 767px) {
		.wi-icons-new .wi-icon img {
			height: 48px;
			width: 48px;
		}
	}

	.wi-section,
	.wi-title {
		display: inline-block;
		margin-top: 0;
		margin-bottom: 21px;
		padding-bottom: 6px;
		border-bottom: 2px solid hsl(var(--primary-500));
		font-size: 18px;
		font-weight: 700;
	}

	.wi-title {
		margin-bottom: 30px;
		padding-bottom: 12px;
		border-width: 4px;
		font-size: 24px;
	}

	.wi-icons + .wi-icons {
		margin-top: 15px;
	}

	.wi-icons + .wi-section {
		margin-top: 60px;
	}
</style> -->
