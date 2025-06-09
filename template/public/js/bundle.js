var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function(Alpine2) {
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
})(Alpine);
//# sourceMappingURL=bundle.js.map
