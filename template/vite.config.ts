import { defineConfig } from "vite";

export default defineConfig({
	publicDir: false,
	build: {
		outDir: "./public/js/", // or wherever Hono serves static files from
		emptyOutDir: false, // prevent wiping other files
		rollupOptions: {
			input: {
				bundle: "./client/index.ts"
			},
			output: {
				entryFileNames: '[name].js',
				format: 'iife',
				dir: './public/js/',
				globals: {
					"htmx.org": "htmx",
					alpinejs: "Alpine",
					"socket.io-client": "io",
				},
			},
			external: ["htmx.org", "alpinejs", "socket.io-client"]
		},
		sourcemap: true,
		minify: false, // faster rebuilds during dev
		watch: {
			include: ['client/**/*'],
			exclude: ['node_modules/**', 'public/**']
		}
	},
});
