import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import pagesRouter from "./pages";
import { FRONT_PORT, IS_DEV } from "./config";
import { logger } from "hono/logger";
import { htmxMiddleware } from "./middlewares";
import { io } from "socket.io-client";

const app = new Hono();

app.use(logger());

app.use("/*", serveStatic({ root: "./public/" }));

app.use(htmxMiddleware());

app.route("/", pagesRouter);

Bun.serve({
  port: FRONT_PORT,
  fetch: app.fetch,
});

if (IS_DEV) {
  const client = io("ws://exposelocal-live-reload:4000");

  client.emit("server reloaded");
}
