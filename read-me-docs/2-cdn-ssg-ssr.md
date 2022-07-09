## CDN Caching, Static Site Generation, and Server Side Rendering

> [Back to README.md](../README.md)

1. **SSG (Static Site Generation)**: Anytime we make a request to the server to get the page, the server generates the page, and this cost money. If there is any change in data, in any file among the many file available, every single page is being rebuild by the server costing more money.

2. **SSR (Server Side Rendering)**: Only the page being requested is build everytime. Every visitor's request is a new page build. The data is always fresh and each build cost money.

3. **CDN (Content Delivery Network)**: This sits between the client and server. When used with the cache-control, along with SSR, it can save a lot of money and serve page quite fast from the second request onwards for the same page, for the max-age seconds provided. After that, the request is sent again to the server.

   Setting max-age to a year, 31536000 seconds, means the CDN will never look for the server for an year. This is great for static assets with hashes. So, in webpack, we see all the css and js are appended with hash. This makes CDN store there URLs for a year. Anytime the developer change the CSS or JS, the hash changes, which in-turn change the URLs requested by the browser hence invalidating the previous cached version and the new styles and scripts are cached.

   The files where data changes on regular intervals, this max-age cache-control is bad. It means, after the data has expired, the CDN will still keep sending the cached pages with stale data.

   **Targeted purge + s-maxage=3.154e7**: As developers we can purge the s-maxage in CDN but not max-age. This requires few scripts but doable.

4. **ISR (Incremental Static Regeneration)**: This is interesting. It kind of combines SSG and SSR in a way. Here, we make a big build and this serves current static pages and its fast. Then, every smaller builds requiring changes in single or few pages, builds only those pages. While the build is happening, if the request arrives, the stale data is sent back. As soon as the build completes, the current page is ready to be served again. It's fast and cost efficient.

   ISR depends on "Stale While Revalidate", a part of HTTP caching. SSR Stale While Revalidate.

   **max-age=1, stale-while-revalidate=3.154e7**

5. The point is **ISR === SSR with state-while-revalidate**. Then, the real question is, **how often do we want to rebuild?** Here, everything is fast. Just the first person after max-age expires and if data changes, gets a stale response.

   So, **max-age=1, stale-while-revalidate=3.154e7** means that everyone will get fast response but sometimes stale, and the server will keep refreshing the data every second on the background.

6. Only Build What's Visited instead of everything every single deploy.

7. max-age: Browser caches it for specified time period as well as CDN.

8. s-maxage: CDN caches it for this specified time period. Can be purged.

9. stale-while-revalidate:

10. In browser we see, X-Cache: HIT or MISS in Headers.

11. **In Remix, each page can have different cache-control. Each URL can have their own unique cache-controls.**
