import { createMiddleware } from "hono/factory";
import { HONO_CONTEXT_KEY_IS_HTMX_REQUEST } from "./context-keys";

export const htmxMiddleware = () =>
	createMiddleware(async (c, next) => {
		c.set(
			HONO_CONTEXT_KEY_IS_HTMX_REQUEST,
			c.req.header("HX-Request") === "true",
		);
		await next();
	});
