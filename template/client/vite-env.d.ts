/// <reference types="vite/client" />

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface ViteTypeOptions {}

interface ImportMetaEnv {
	readonly NODE_ENV: "development" | "production" | "test";
	readonly PORT: number;
	readonly LIVE_RELOAD_PORT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
