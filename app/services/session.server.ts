import { createCookieSessionStorage } from '@remix-run/node';

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '_session', // any name we want
        // domain: 'ibcoder.com',
        sameSite: 'lax', // helps with CSRF
        path: '/', // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, we don't want to expose the cookie to JavaScript, just http
        secrets: [process.env.SESSION_SECRET!], // replace with your own secret
        secure: process.env.NODE_ENV === 'production', // only send cookie over https
    }
});