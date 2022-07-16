import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

// based on the login state we redirect them to the login page or the page they were trying to access
export const loader: LoaderFunction = ({ request }) => {
    return authenticator.authenticate('auth0', request, {
        successRedirect: '/',
        failureRedirect: '/auth/auth0/login',
    });
};