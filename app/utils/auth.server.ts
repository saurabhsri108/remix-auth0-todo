import type { User } from '@prisma/client';
import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { sessionStorage } from '~/services/session.server';
import { prisma } from './client.server';


export const authenticator = new Authenticator<User>(sessionStorage);

let auth0Strategy = new Auth0Strategy({
    callbackURL: process.env.AUTH_CALLBACK_URL!,
    clientID: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    domain: process.env.AUTH0_CLIENT_DOMAIN!
}, async ({ accessToken, refreshToken, extraParams, profile }) => {
    return prisma.user.upsert({
        where: { email: profile.emails[0].value },
        create: {
            email: profile.emails[0].value,
            auth0_id: profile._json.sub,
            provider: profile.provider,
            locale: profile._json.locale || '',
            username: profile._json.nickname,
            firstname: profile._json.given_name,
            lastname: profile._json.family_name,
            avatar_url: profile._json.picture,
            email_verified: profile._json.email_verified
        },
        update: {}
    });
});

authenticator.use(auth0Strategy);