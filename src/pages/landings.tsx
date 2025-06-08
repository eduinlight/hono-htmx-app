import { Hono } from "hono";
import { HOME_TITLE, Home } from "../components/landings/home";
import { PublicLayoutHtmxWrapper } from "../components/wrappers";
import { pagesPath } from "./paths";

const landingsRouter = new Hono();

landingsRouter.get(pagesPath.home, (c) => {
	return c.html(
		<PublicLayoutHtmxWrapper c={c} title={HOME_TITLE}>
			<Home />
		</PublicLayoutHtmxWrapper>,
	);
});

export default landingsRouter;
