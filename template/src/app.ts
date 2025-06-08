import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { io } from "socket.io-client";
import { IS_DEV, LIVE_RELOAD_PORT, PORT } from "./config";
import { htmxMiddleware } from "./middlewares";
import pagesRouter from "./pages";

const app = new Hono();

app.use(logger());

app.use("/*", serveStatic({ root: "./public/" }));

app.use(htmxMiddleware());

app.route("/", pagesRouter);

Bun.serve({
	port: PORT,
	fetch: app.fetch,
});

if (IS_DEV) {
	const client = io(`ws://localhost:${LIVE_RELOAD_PORT}`);

	const { buildTailwindCSS } = await import("./tailwind");
	const cssChanged = await buildTailwindCSS();

	if (cssChanged) {
		client.emit("style reloaded", "/css/styles.css");
	}

	client.emit("server reloaded");
}
