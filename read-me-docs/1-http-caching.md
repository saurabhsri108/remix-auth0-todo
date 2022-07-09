## HTTP Caching

> [Back to README.md](../README.md)

> [YouTube Source: Remix Run - Introduction to HTTP Caching](https://www.youtube.com/watch?v=3XkU_DXcgl0)

1. Browsers have automatic caching. If one clicks back and forth, it caches by default: disk-cache.

2. Headers on server side is where we define the behavior of cache: **cache-control**

3. **cache-control=no-store**: Browser stops caching the file with this configuration on server.

4. **cache-control=max-age=0, must-revalidate**: This alone makes the browser validate the file requested every 0 seconds. Technically, it validates if any difference between previous and new file. If difference is there, then fetch a fresh copy otherwise from disk-cache. This alone however doesn't work. It requires **_etag_**.

5. **etag=md5(html)**: This goes in header with above config. Then a check using **if-none-match**:

   ```js
   let server = createServer((request, response) => {
     switch (request.url) {
       case '/': {
         let html = createPage('Home'); // some function which generates a html page
         let etag = md5(html); // create a md5 hash
         if (etag === request.headers['if-none-match']) {
           response.writeHead(304);
           response.end();
         } else {
           response.writeHead(200, {
             'cache-control': 'max-age=0, must-revalidate',
             etag,
           });
           response.end(html);
         }
       }
     }
   });
   ```

6. This should make the browser to make a request and if the html is not modified, then it will use it from the cache. This will use etag. Here, we are still downloading header info as we are still talking with the server.

7. So, if we set the max-age=10, this means for the next 10 seconds, browser will not even send a single request to the server. Once the time expires, it will send the request again and check the etag to match the hash, and then again for the next 10 seconds, will not hit the server.

8. So, in remix, we do the whole thing like:

   ```js
   export headers() {
       return {
           "Cache-Control": "max-age=3600, must-revalidate"
       }
   }
   ```

9. Advanced Header example:

   ```js

   ```
