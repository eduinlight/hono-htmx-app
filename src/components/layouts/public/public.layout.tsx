import { html } from "hono/html";
import { type FC, type PropsWithChildren } from "hono/jsx";
import { useRequestContext } from "../../providers";
import { IS_DEV } from "../../../config";

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
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <noscript>"You need to enable JavaScript to run this app."</noscript>
        <div id="root">${children}</div>
        <script src="/htmx.min.js"></script>
        <script src="/alpinejs.min.js"></script>
        ${IS_DEV &&
        html`
          <script type="module" src="/socket.io.min.js"></script>
          <script type="module" src="/live-reload.js"></script>
        `}
      </body>
    </html>`;
};
