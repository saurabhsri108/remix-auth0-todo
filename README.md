# Remix R&D

## Aim

To build a full functional todo app or perhaps a Kanban Board to understand how remix works in depth. The goal is to learn data flow, architecture, styling, authentication, forms, etc. in remix.

## Philosophy of Remix

1. Embracing the server/client model, including separation of source code from content/data.
2. Working with the foundations of the web: Browser, HTTP, HTML.
3. JS for augmenting the user experience by emulating browser behavior.
4. No over-abstraction of underlying technologies.

### Server/Client Model

1. The underlying philosophy here is that as developers, we have total control over server's speed, but not on user's network speed.
2. This then puts trust over today's infrastructure's TTFB and aims to not use static files and always serve fresh dynamic content.
3. Fixing content (say typo) happens in seconds: no rebuilds, no redeploys, not even HTTP caching.
4. Because we cannot control user's network speed, it's better to send as less stuff over the network as possible: JSON, CSS, JS.
5. So, in case of fetching a list of some data, in remix, we can do the fetch action on server's end and then send only filtered list to the client. This results in size reduction of files sent over the network.

### Web Standards, HTTP, and HTML

1. The philosophy here is that remix will use the solid web standard technologies that have been around for a long time rather than inventing their own or using any 3rd party one. For instance, to fetch; they use Web Fetch API.
2. Standards like Request, Response, URLSearchParams, and URL are used on the remix server end regardless of where we choose to deploy.
3. For data mutations, HTML forms are augmented. For prefetching, rel="prefetch" is used. Basically, the caching mechanism is now the task of browser.
4. If the browser has a standard API for some task, Remix aims to use it.

### Progressive Enhancement

1. Remix has both read and write API for data. Remix embraces the <form> for data mutations and augments it. This enables the data layer of a Remix app to function with or without JavaScript on the page.
2. Adding JavaScript allows Remix to speed up user experience:
   - Not downloading and evaluating JavaScript and CSS assets.
   - Only fetching data for the parts of the layout that change.
3. This also allows optimistic UI on data actions (create, read, update, delete, etc.)
4. Mutation is built into remix so it knows when to refetch data that could have been changed after a mutation, ensuring different parts of the page don't get out of sync.

## What is Remix?

1. Remix is 4 things:
   - A compiler
   - A server side HTTP handler
   - A server framework
   - A browser framework
2. As per the developers of Remix, it's "a compiler for React Router" because everything about Remix takes advantage of nested routes.

### Compiler

Everthing starts with the compiler: remix build. It uses "esbuild" to create few things:

1. A server HTTP handler, usually in **server/build/index.js**.
2. A browser build, usually in **public/build/\***.
3. **An asset manifest:** used by both the client and server to know the entire dependency graph. Useful for preloading resources in the initial server render as well as prefetching them for client side transitions. Helps remix elimate the "render+fetch" waterfalls common in web-apps today.

### HTTP Handler and Adapters

1. Remix runs on server, but is not a server itself. It's just a handler given to the JavaScript server. It's built on Web Fetch API instead of Node.js. This enables it to run in any Node.js server: Vercel, Netlify, etc. as well as non-Node.js environments like Cloudflare workers and Deno Deploy.

2. Remix adapters (handlers) convert the server's request/response API into the Fetch API on the way in, and then adapting the Fetch Response coming from Remix into the server's response API.

### Server Framework

1. Remix is the View and Controller, but it leaves the Model to developers in terms of MVC web frameworks.
2. Lots of databases, ORMs, mailers, etc. in the JS Ecosystem can fill the space of Models.
3. Remix also has helpers around the Fetch API for cookie and session management.
4. Remix is UI Focused framework. Remix routes modules take on the responsibilities of both View and Controllers.
5. Remix can handle an entire URL or just a segment of the URL. When a route maps to just a segment, the nested URL segments become nested layouts in the UI.
6. In this way, point 5, each "view" (layout) becomes its own controller and then Remix will aggregate the data and components to build the complete UI.
7. Remix route module can contain both the UI and the interactions with the models in the same file - nice ergonomics and productivity.
8. Route modules have 3 primary exports:
   - **loader:** They only run on the server and provide data to the component on GET requests.
   - **action:** They only run on the server and handle POST, PUT, PATCH, and DELETE requests. They can also provide data to the component.
   - **default:** The default export is the component that will be rendered when a route matches the URL. This runs both on the server and the client.
9. In this way, we can use **loader**, **action**, and **default** to use Remix as a server side framework without using any browser JavaScript at all. Think of Remix routes as react components that are already their own API route and already know how to load and submit data to themselves on the server.

### Browser Framework

1. Once Remix has served the document to the browser, it "hydrates" the page with its browser build's JavaScript modules.
2. So, if a link is clicked, then Remix simply fetches the data for the new page and updates the UI. This helps performance as:
   - Assets don't need to be re-downloaded (or pulled from the cache)
   - Assets don't need to be parsed by the browser again
   - The data fetched in much smaller than the entire document (sometimes orders of magnitude)
3. Built in optimizations for client side navigation knows which layout will persist between the two URLs, so it only fetches the data for the ones that are changing.
4. This approach has UX benefits like not resetting the scroll position of a sidebar nav and allowing the developers to move focus to something that makes more sense than the top of the document.
5. **The browser framework knows about the compiler's asset manifest.** It can match the URL of the link, read the manifestm, and then prefetch all the data, JavaScript modules, and even CSS resources for the next page. This makes Remix apps feel fast even when networks are slow.
6. **Browser Framework reaches into the controller level of the backend.**

## Optimistic UI

It's a pattern to avoid showing busy spinners in our UI and make our app feel like it's responding instantly to user interactions that change data on the server. It will take some time to make it to the server to be processed, we often have enough information in the UI that sent it to fake it. If it fails for some reason, we can then notify the user that there was a problem. In remix, this can be done using **useTransition** and **useFetcher**.

Remix automatically does the auto-cancellation/abortion of multiple request to backend and only values the last action. So, in case you press delete button multiple times, only the last press is accepted. Rest is cancelled POST. This is browser default which gets messed up in regular JS apps due to JS!

## Side Info

1. Remix uses "tree shaking" to remove server code from browser bundles. Anything inside of Route module "loader", "action", and "headers" exports will be removed. It's a great approach but suffers from ecosystem compatibility.

2. When importing a third-party module, Remix checks the **package.json** of that package for **"sideEffects": false**. If that is configured, Remix knows it can safely remove the code from the client bundles. Without it, the imports remain because code may depend on the module's side effects.

3. Since the code runs on both server and client, sometimes the need of **typeof window === "undefined"** check will arise. However, Deno supports window! So, it's better to check **typeof document === "undefined"** instead which works everywhere.

## Some important topics

- **[HTTP Caching](./read-me-docs/1-http-caching.md)**
- **[CDN Caching, Static Site Generation, and Server Side Rendering](./read-me-docs/2-cdn-ssg-ssr.md)**
- **[Data Flow](./read-me-docs/3-data-flow.md)**
- **[Error Boundary](./read-me-docs/4-error-boundary.md)**

## Most Important Docs Sources

1. **[API Conventions](https://remix.run/docs/en/v1/api/conventions)**
1. **[Remix Packages](https://remix.run/docs/en/v1/api/remix)**
