import "./htmx";
import "./alpine";
import "./web-components";

import { IS_DEV } from "./config";

if (IS_DEV) {
	import("./live-reload-client");
}
