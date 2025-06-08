import type { Context } from "hono";
import type { FC, PropsWithChildren } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";

export type RequestContextType = {
	theme: "light" | "dark";
	language: "en" | "es";
	query?: unknown;
	params?: unknown;
};

const defaultContext: RequestContextType = {
	theme: "light",
	language: "en",
};

const RequestContext = createContext<RequestContextType>(defaultContext);

export const useRequestContext = () => {
	return useContext(RequestContext);
};

export type RequestContextProviderProps = Partial<RequestContextType> & {
	c: Context;
};

export const RequestContextProvider: FC<
	PropsWithChildren<RequestContextProviderProps>
> = ({ children, c, ...props }) => (
	<RequestContext.Provider
		value={{
			theme: props.theme ?? defaultContext.theme,
			language: props.language ?? defaultContext.language,
			query: c.req.query(),
			params: c.req.param(),
		}}
	>
		{children}
	</RequestContext.Provider>
);
