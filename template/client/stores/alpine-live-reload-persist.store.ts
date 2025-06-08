import Alpine from "alpinejs";

type StateMap = Record<number, string>;

export class ReloadStateStore {
	static NAME = "reloadState";

	public capture() {
		const stateMap: StateMap = {};
		document.querySelectorAll<HTMLElement>("[x-data]").forEach((el, index) => {
			const state = Alpine.$data(el);
			if (state) {
				stateMap[index] = JSON.parse(JSON.stringify(state)); // deep copy
			}
		});
		sessionStorage.setItem("__alpine_state__", JSON.stringify(stateMap));
	}

	public restore() {
		const raw = sessionStorage.getItem("__alpine_state__");
		if (!raw) return;
		try {
			const stateMap: StateMap = JSON.parse(raw);
			document
				.querySelectorAll<HTMLElement>("[x-data]")
				.forEach((el, index) => {
					const state = Alpine.$data(el);
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
