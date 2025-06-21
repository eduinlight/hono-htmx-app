import htmx from "htmx.org";
import io from "socket.io-client";

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
	try {
		const response = await fetch(location.pathname);
		const html = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html");
		const newRoot = doc.querySelector("#root");
		const currentRoot = document.querySelector("#root");

		if (newRoot && currentRoot) {
			// @ts-ignore
			Alpine.morph(currentRoot, newRoot, {
				updating: (el, toEl, childrenOnly, skip) => {
					// Skip morphing defined custom elements (web components)
					if (el.tagName && customElements.get(el.tagName.toLowerCase())) {
						skip();
					}
				},
			});
		}
	} catch (error) {
		console.error("live-reload: error during morph", error);
		// Fallback to regular reload
		location.reload();
	}
});

socket.on("reload style", async (style) => {
	console.log("live-reload: reload style:", style);
	const el = document.querySelector(`link[href="${style}"]`);
	if (el) {
		const head = document.querySelector("head");
		const newStyleContent = await fetchWithRetry(style).then((r) => r.text());
		const styleTag = document.createElement("style");
		styleTag.id = style;
		styleTag.innerHTML = newStyleContent;
		el.remove();
		head?.append(styleTag);
	} else {
		const el = document.querySelector(`style[id="${style}"]`);
		const newStyleContent = await fetchWithRetry(style).then((r) => r.text());
		if (el) el.innerHTML = newStyleContent;
	}
});

socket.on("reload script", async (script) => {
	console.log("live-reload: reload script:", script);
	const el = document.querySelector(`script[src="${script}"]`);
	if (el) {
		const body = document.querySelector("body");
		const newScriptContent = await fetchWithRetry(script).then((r) => r.text());
		const scriptTag = document.createElement("script");
		scriptTag.id = script;
		scriptTag.type = "text/javascript";
		scriptTag.innerHTML = newScriptContent;
		el.remove();
		body?.append(scriptTag);
	} else {
		const el = document.querySelector(`script[id="${script}"]`);
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
