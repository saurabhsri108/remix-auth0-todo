## Using Sessions

> [Back to README.md](../README.md)

1. Session is a data structure that an application uses to store temporary data that is useful only during the time a user is interacting with the application, it is also specific to the user.

2. This temporary storage could be on the file system in text files, on a database or in the internal memory of the program executing the application.

3. Client (sends http request cookie = session_id) -> Server (receives client request and sends further to) -> Server Datastore (searches the user_id using session_id and executes) -> Code (code execution and interaction with) -> Database (retreives data and send it back to ) -> Code (which uses this personalized data to create personalized page and sends it to ) -> Server (which sends it to ) -> Client (along with http response cookie = session_id)

4. One connection means one session_id. It only identifies connection to the server. User identification is not its job.

5. Once we close the browser tab, the session is gone! Poof!

6. Session Storage in browsers have 5mb max size capacity. Cookies have 4kb.

7. They aren't sent with the requests automatically. Cookies are sent.

8. Browser only thing.

### Remix example

```js
import { createCookieSessionStorage } from '@remix-run/node'; // or "@remix-run/cloudflare"

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
        name: '_session', // any name we want
        // optional below
        domain: 'ibcoder.com',
        sameSite: 'lax', // helps with CSRF
        path: '/', // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, we don't want to expose the cookie to JavaScript, just http
        secrets: [process.env.SESSION_SECRET!], // replace with your own secret
        secure: process.env.NODE_ENV === 'production', // only send cookie over https
    },
  });

export { getSession, commitSession, destroySession };
```
