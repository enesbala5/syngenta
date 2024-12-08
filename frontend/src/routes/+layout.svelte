<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/manrope';
	// --------------------------------------------------------------------
	import { PUBLIC_UMAMI_DATA_WEBSITE_ID, PUBLIC_UMAMI_SCRIPT } from '$env/static/public';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import type { LayoutData, LayoutServerData } from './$types';
	import { dev } from '$app/environment';
	import type { Snippet } from 'svelte';
	import { mode } from 'mode-watcher';

	interface Props {
		data: LayoutData & LayoutServerData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	const { language, preloadImageUrls } = data;
</script>

<svelte:head>
	<meta name="theme-color" content={$mode === 'dark' ? '#000' : '#fafafa'} />
	<style>
		:global(html) {
			background-color: {
				$mode==='dark'?'#000': '#fafafa';
			}
		}
		:global(body) {
			background-color: {
				$mode==='dark'?'#000': '#fafafa';
			}
		}
	</style>

	<!-- Preload Images -->
	{#each preloadImageUrls as image}
		<link rel="preload" as="image" href={image} />
	{/each}

	<!-- Umami Analytics - Prod Only -->
	{#if !dev}
		<script defer src={PUBLIC_UMAMI_SCRIPT} data-website-id={PUBLIC_UMAMI_DATA_WEBSITE_ID}></script>
	{/if}
</svelte:head>

<!-- <ModeWatcher defaultMode={"light"} track={false} /> -->
<Toaster />

{@render children()}

<style>
	:global(:root) {
		--textColor: inherit;
		--backgroundColor: inherit;
	}

	:global(::-moz-selection) {
		color: white;
		background: hsla(0, 0%, 14%, 0.8) !important;
	}

	:global(::selection) {
		color: white;
		background: hsla(0, 0%, 14%, 0.8) !important;
	}

	:global(body) {
		font-family: 'Manrope Variable', sans-serif;
	}

	:global(html) {
		scroll-behavior: smooth;
		scroll-padding-top: 100px;
		scroll-padding-bottom: 100px;
		scroll-snap-type: y proximity;
		overscroll-behavior: contain;
	}
</style>
