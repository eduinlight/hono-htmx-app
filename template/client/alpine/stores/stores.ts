import Alpine from "alpinejs";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class ExampleStore {
	public static NAME = "example";
}

const stores = {
	[ExampleStore.NAME]: ExampleStore,
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
	}
});
