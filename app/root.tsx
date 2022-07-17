import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }, { rel: "icon", href: "/favicon.png" }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Store",
  viewport: "width=device-width,initial-scale=1",
});


export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error; }) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className='flex flex-col items-center justify-center w-screen h-screen px-4 text-center'>
          <section className='flex flex-col gap-2 p-4 bg-red-200 border-2 border-red-700 rounded-sm'>
            <h1 className='text-4xl font-semibold text-red-700'>{error.name}</h1>
            <p className='text-lg font-semibold text-red-600'>{error.message}</p>
            {process.env.NODE_ENV === 'development' ? (
              <pre className='text-xs text-left'>
                {error.stack}
              </pre>
            ) : (
              <p className='text-lg font-semibold text-red-600'>
                Contact your administrator!
              </p>
            )}
          </section>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className='flex flex-col items-center justify-center w-screen h-screen px-4 text-center'>
          <section className='flex flex-col gap-2 p-4 bg-red-200 border-2 border-red-700 rounded-sm'>
            <h1 className='text-4xl font-semibold text-red-700'>{caught.status} {caught.statusText}</h1>
          </section>
        </main>
        <Scripts />
      </body>
    </html>
  );
}