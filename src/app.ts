import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { io } from "socket.io-client";
import { IS_DEV, LIVE_RELOAD_PORT, PORT } from "./config";
import { htmxMiddleware } from "./middlewares";
import pagesRouter from "./pages";
import { buildTailwindCSS } from "./tailwind";

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

	client.emit("server reloaded");

	await buildTailwindCSS();

	client.emit("style reloaded", "/css/styles.css");
}
