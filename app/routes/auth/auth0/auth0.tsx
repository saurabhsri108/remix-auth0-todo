import type { ActionFunction, LoaderFunction, } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

// redirect to the auth0 login page if direct access is attempted to the auth0 page
export const loader: LoaderFunction = () => redirect('/auth/auth0/login');

// post request sent to this route would be handled by the authenticator and redirect you to the Auth0's login page
export const action: ActionFunction = ({ request }) => {
    return authenticator.authenticate('auth0', request);
};