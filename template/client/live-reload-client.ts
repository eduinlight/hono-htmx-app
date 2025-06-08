import Alpine from "alpinejs";
import htmx from "htmx.org";
import io from "socket.io-client";
import { useStore } from "./stores";

async function fetchWithRetry(
	url: string,
	retry = 3,
	delay = 100,
): Promise<Response> {
	try {
		return await fetch(url);
	} catch (e) {
		if (retry > 0) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					fetchWithRetry(url, retry - 1)
						.then(resolve)
						.catch(reject);
				}, delay);
			});
		}
		throw e;
	}
}

const socket = io("ws://localhost:4000", {
	transports: ["websocket"],
});

socket.on("connect", () => {
	console.log("live-reload: connected");
});

socket.on("reload page", async () => {
	console.log("live-reload: reloading page");
	const reloadStateStore = useStore("reloadState");
	reloadStateStore.capture();
	htmx
		.ajax("GET", location.pathname, {
			target: "#root",
			swap: "innerHTML",
		})
		.then(() => {
			const root = document.querySelector<HTMLElement>("#root");
			if (root) {
				Alpine.initTree(root);
				reloadStateStore.restore();
			}
		});
});

socket.on("reload style", async (style) => {
	console.log("live-reload: reload style:", style);
	const el = document.querySelector<HTMLElement>(`link[href="${style}"]`);
	if (el) {
		const head = document.querySelector<HTMLElement>("head");
		const newStyleContent = await fetchWithRetry(style).then((r) => r.text());
		const styleTag = document.createElement("style");
		styleTag.id = style;
		styleTag.innerHTML = newStyleContent;
		el.remove();
		head?.append(styleTag);
	} else {
		const el = document.querySelector<HTMLElement>(`style[id="${style}"]`);
		const newStyleContent = await fetchWithRetry(style).then((r) => r.text());
		if (el) el.innerHTML = newStyleContent;
	}
});

socket.on("reload script", async (script) => {
	console.log("live-reload: reload script:", script);
	const el = document.querySelector<HTMLElement>(`script[src="${script}"]`);
	if (el) {
		const body = document.querySelector<HTMLElement>("body");
		const newScriptContent = await fetchWithRetry(script).then((r) => r.text());
		const scriptTag = document.createElement("script");
		scriptTag.id = script;
		scriptTag.type = "text/javascript";
		scriptTag.innerHTML = newScriptContent;
		el.remove();
		body?.append(scriptTag);
	} else {
		const el = document.querySelector<HTMLElement>(`script[id="${script}"]`);
		const newSriptContent = await fetchWithRetry(script).then((r) => r.text());
		if (el) el.innerHTML = newSriptContent;
	}
});

socket.on("disconnect", () => {
	console.log("live-reload: disconnected");
});

socket.on("connect_error", (err) => {
	console.error(
		"live-reload: socket encountered error: ",
		err?.message ?? "unknown.",
		"Closing socket",
	);
});
