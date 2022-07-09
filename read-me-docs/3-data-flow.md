## Data Flow Path in Remix

> [Back to README.md](../README.md)

### Server

1. **File: entry.server.tsx**
2. After custom developer server (express and others) are done, this file gets executed.
3. It renders markup as String with <!DOCTYPE html>

### Client

1. **File: entry.client.tsx**
2. This file hydrates the page after serve.

### Root

1. **File: root.tsx**

### Links

```jsx
import styles from '../styles/index.css';
export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
```
