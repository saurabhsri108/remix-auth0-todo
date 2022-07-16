## Not Found: 404

> [Back to README.md](../README.md)

> [Original Source](https://remix.run/docs/en/v1/guides/not-found)

- There are two primary cases where a Remix site should send a 404:

  - The URL doesn't match any routes in the app: This is handled by Remix.
  - Your loader didn't find any data: This needs to be handled by developers.

```tsx
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
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
```

- This mechanism isn't just limited to 404s. You can throw any response from a loader or action to send your app down the catch boundary path.
