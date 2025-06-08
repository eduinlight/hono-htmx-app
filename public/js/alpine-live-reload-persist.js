document.addEventListener("alpine:init", () => {
  Alpine.store("reloadState", {
    capture() {
      const stateMap = {};
      document.querySelectorAll("[x-data]").forEach((el, index) => {
        const state = Alpine.$data(el);
        if (state) {
          stateMap[index] = JSON.parse(JSON.stringify(state)); // deep copy
          index++;
        }
      });
      sessionStorage.setItem("__alpine_state__", JSON.stringify(stateMap));
    },
    restore() {
      const raw = sessionStorage.getItem("__alpine_state__");
      if (!raw) return;
      try {
        const stateMap = JSON.parse(raw);
        document.querySelectorAll("[x-data]").forEach((el, index) => {
          const state = Alpine.$data(el);
          if (state) {
            Object.assign(state, stateMap[index])
          }
        });
        sessionStorage.removeItem("__alpine_state__");
      } catch (e) {
        console.warn("Could not restore Alpine state", e);
      }
    },
  });
});
