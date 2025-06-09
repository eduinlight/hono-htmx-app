import { html } from "hono/html";
import type { FC, PropsWithChildren } from "hono/jsx";
import { IS_DEV } from "../../../config";
import { useRequestContext } from "../../providers";

export type PublicLayoutProps = {
  title: string;
};

export const PublicLayout: FC<PropsWithChildren<PublicLayoutProps>> = ({
  children,
  title,
}) => {
  const { theme } = useRequestContext();

  return html`<!doctype html>
    <html data-theme="${theme}">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Exposelocal - ${title}</title>
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="/css/material-icons.css" />
        <script defer src="/js/htmx.min.js"></script>
        <script defer src="/js/alpinejs.min.js"></script>
        <script defer src="/js/socket.io.min.js"></script>
      </head>
      <body>
        <noscript>"You need to enable JavaScript to run this app."</noscript>
        <div id="root">${children}</div>
        ${IS_DEV &&
    html`
          <script type="module" src="/js/bundle.js"></script>
          <script type="module" src="/js/live-reload-client.js"></script>
        `
    }
      </body>
    </html>`;
};
