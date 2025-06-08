export const { FRONT_PORT, ENV } = process.env;

export const IS_DEV = ENV === "development";

export const IS_PROD = ENV === "production";
