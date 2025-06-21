// @ts-ignore
import morph from "@alpinejs/morph";
import Alpine from "alpinejs";

export * from "./stores/";

// @ts-ignore
window.Alpine = Alpine;

Alpine.plugin(morph);
Alpine.start();
