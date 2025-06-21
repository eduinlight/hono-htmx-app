import { defineConfig } from "vite";

export default defineConfig({
	publicDir: false,
	build: {
		outDir: "./public/js/", // or wherever Hono serves static files from
		emptyOutDir: false, // prevent wiping other files
		rollupOptions: {
			input: {
				bundle: "./client/index.ts",
			},
			output: {
				entryFileNames: "[name].js",
				format: "iife",
				dir: "./public/js/",
			},
		},
		sourcemap: true,
		minify: false, // faster rebuilds during dev
		watch: {},
	},
});
