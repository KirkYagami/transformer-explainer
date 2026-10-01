import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const variablesPath = fileURLToPath(new URL('./src/styles/variables.scss', import.meta.url));

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import '${variablesPath}';`,
				silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api']
			}
		}
	},
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..']
		}
	}
});
