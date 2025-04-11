import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from '@zerodevx/svelte-img/vite'

export default defineConfig({
	plugins: [sveltekit(), imagetools()],
	server: {
		allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', 'syngenta.enesbala.com']
	}
});
