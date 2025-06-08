import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import pagesRouter from "./pages";
import { PORT, IS_DEV, LIVE_RELOAD_PORT } from "./config";
import { logger } from "hono/logger";
import { htmxMiddleware } from "./middlewares";
import { io } from "socket.io-client";

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
  client.emit("reload-page");
  console.log("reload-page emitted")
}
