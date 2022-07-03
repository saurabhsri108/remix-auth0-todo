import { Authenticator } from 'remix-auth'
import { Auth0Strategy } from 'remix-auth-auth0'

export const authenticator = new Authenticator<User>(sessionStorage)

let auth0Strategy = new Auth0Strategy({
    callbackURL: '/auth/callback',
    clientID: process.env.AUTH0_CLIENT_ID ?? '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
    domain: process.env.AUTH0_CLIENT_DOMAIN ?? ''
}, async ({ accessToken, refreshToken, extraParams, profile }) => {
    return User.findOrCreate({ email: profile.emails[0].value })
})

authenticator.use(auth0Strategy)