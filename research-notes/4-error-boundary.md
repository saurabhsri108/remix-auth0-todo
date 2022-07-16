## Error Boundary

> [Back to README.md](../README.md)

> [Original Source](https://remix.run/docs/en/v1/guides/errors)

- Remix will automatically catch errors and render the nearest error boundary for errors thrown while:

  - rendering in the browser
  - rendering on the server
  - in a loader during the initial server rendered document request
  - in an action during the initial server rendered document request
  - in a loader during a client-side transition in the browser (Remix serializes the error and sends it over the network to the browser)
  - in an action during a client-side transition in the browser

- Every route can create an error boundary for itself and its children so that just the route that blew up, can be pin-pointed exactly where it is.

  ```tsx
  export function ErrorBoundary({ error }: { error: Error }) {
    console.log(error);
    return (
      <Document>
        <div className="error">
          <div>
            <h1>Error</h1>
            <p>{error.message}</p>
          </div>
        </div>
      </Document>
    );
  }
  ```

- Make sure to render the Scripts, Meta, and Links components because the whole document will mount and unmount when the root error boundary is rendered.

  ```tsx
  export function ErrorBoundary({ error }) {
    console.error(error);
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
          {/* add the UI you want your users to see */}
          <Scripts />
        </body>
      </html>
    );
  }
  ```

- Each route in the hierarchy is a potential error boundary. If a nested route exports an error boundary, then any errors below it will be caught and rendered there. This means that the rest of the surrounding UI in the parent routes continue to render normally so the user is able to click another link and not lose any client-side state they might have had.

- If a route doesn't have an error boundary, the error "bubbles up" to the closest error boundary, all the way to the root, so you don't have to add error boundaries to every route--only when you want to add that extra touch to your UI.
