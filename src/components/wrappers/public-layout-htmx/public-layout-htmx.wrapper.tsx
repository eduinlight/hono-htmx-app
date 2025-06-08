import type { Context } from "hono";
import { PublicLayout, type PublicLayoutProps } from "../../layouts/public";
import { HONO_CONTEXT_KEY_IS_HTMX_REQUEST } from "../../../middlewares";
import type { FC, PropsWithChildren } from "hono/jsx";
import { Fragment } from "hono/jsx";
import { RequestContextProvider } from "../../providers";

export type PublicLayoutHtmxWrapperProps = PublicLayoutProps & {
  c: Context;
};

export const PublicLayoutHtmxWrapper: FC<
  PropsWithChildren<PublicLayoutHtmxWrapperProps>
> = ({ children, c, ...props }) => (
  <RequestContextProvider c={c}>
    {c.get(HONO_CONTEXT_KEY_IS_HTMX_REQUEST) ? (
      <Fragment>{children}</Fragment>
    ) : (
      <PublicLayout {...props}>{children}</PublicLayout>
    )}
  </RequestContextProvider>
);
