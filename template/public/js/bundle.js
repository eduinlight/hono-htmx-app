var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function(Alpine2, htmx2, io2) {
  "use strict";
  class ReloadStateStore {
    capture() {
      const stateMap = {};
      document.querySelectorAll("[x-data]").forEach((el, index) => {
        const state = Alpine2.$data(el);
        if (state) {
          stateMap[index] = JSON.parse(JSON.stringify(state));
        }
      });
      sessionStorage.setItem("__alpine_state__", JSON.stringify(stateMap));
    }
    restore() {
      const raw = sessionStorage.getItem("__alpine_state__");
      if (!raw) return;
      try {
        const stateMap = JSON.parse(raw);
        document.querySelectorAll("[x-data]").forEach((el, index) => {
          const state = Alpine2.$data(el);
          if (state) {
            Object.assign(state, stateMap[index]);
          }
        });
        sessionStorage.removeItem("__alpine_state__");
      } catch (e) {
        console.warn("Could not restore Alpine state", e);
      }
    }
  }
  __publicField(ReloadStateStore, "NAME", "reloadState");
  const stores = {
    [ReloadStateStore.NAME]: ReloadStateStore
  };
  function useStore(name) {
    return Alpine2.store(name);
  }
  document.addEventListener("DOMContentLoaded", () => {
    if (Alpine2) {
      for (const [key, StoreClass] of Object.entries(stores))
        Alpine2.store(key, new StoreClass());
    } else {
      document.addEventListener("alpine:init", () => {
        for (const key of Object.keys(stores)) {
          const store = useStore(key);
          Alpine2.store("reloadState", store);
        }
      });
    }
  });
  async function fetchWithRetry(url, retry = 3, delay = 100) {
    try {
      return await fetch(url);
    } catch (e) {
      if (retry > 0) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetchWithRetry(url, retry - 1).then(resolve).catch(reject);
          }, delay);
        });
      }
      throw e;
    }
  }
  const socket = io2("ws://localhost:4000", {
    transports: ["websocket"]
  });
  socket.on("connect", () => {
    console.log("live-reload: connected");
  });
  socket.on("reload page", async () => {
    console.log("live-reload: reloading page");
    const reloadStateStore = useStore("reloadState");
    reloadStateStore.capture();
    htmx2.ajax("GET", location.pathname, {
      target: "#root",
      swap: "innerHTML"
    }).then(() => {
      const root = document.querySelector("#root");
      if (root) {
        Alpine2.initTree(root);
        reloadStateStore.restore();
      }
    });
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
      head == null ? void 0 : head.append(styleTag);
    } else {
      const el2 = document.querySelector(`style[id="${style}"]`);
      const newStyleContent = await fetchWithRetry(style).then((r) => r.text());
      if (el2) el2.innerHTML = newStyleContent;
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
      body == null ? void 0 : body.append(scriptTag);
    } else {
      const el2 = document.querySelector(`script[id="${script}"]`);
      const newSriptContent = await fetchWithRetry(script).then((r) => r.text());
      if (el2) el2.innerHTML = newSriptContent;
    }
  });
  socket.on("disconnect", () => {
    console.log("live-reload: disconnected");
  });
  socket.on("connect_error", (err) => {
    console.error(
      "live-reload: socket encountered error: ",
      (err == null ? void 0 : err.message) ?? "unknown.",
      "Closing socket"
    );
  });
})(Alpine, htmx, io);
//# sourceMappingURL=bundle.js.map
