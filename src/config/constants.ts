export const { PORT, ENV, LIVE_RELOAD_PORT } = process.env;

export const IS_DEV = ENV === "development";

export const IS_PROD = ENV === "production";
