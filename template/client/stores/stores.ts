import Alpine from "alpinejs";
import { ReloadStateStore } from "./alpine-live-reload-persist.store";

const stores = {
	[ReloadStateStore.NAME]: ReloadStateStore,
} as const;

type Stores = typeof stores;
type StoreInstances = {
	[K in keyof Stores]: InstanceType<Stores[K]>;
};

export function useStore<K extends keyof Stores>(name: K): StoreInstances[K] {
	return Alpine.store(name) as StoreInstances[K];
}

document.addEventListener("DOMContentLoaded", () => {
	if (Alpine) {
		for (const [key, StoreClass] of Object.entries(stores))
			Alpine.store(key, new StoreClass());
	} else {
		document.addEventListener("alpine:init", () => {
			for (const key of Object.keys(stores)) {
				const store = useStore(key);
				Alpine.store("reloadState", store);
			}
		});
	}
});
