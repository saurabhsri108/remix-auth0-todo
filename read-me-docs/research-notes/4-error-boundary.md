## Error Boundary

> [Back to README.md](../README.md)

Every route can create an error boundary for itself and its children so that just the route that blew up, can be pin-pointed exactly where it is.

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
