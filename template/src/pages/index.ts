import { Hono } from "hono";
import landingsRouter from "./landings";

const pagesRouter = new Hono();

pagesRouter.route("/", landingsRouter);

export default pagesRouter;
