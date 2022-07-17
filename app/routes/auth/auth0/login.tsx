import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

// redirect to the home page if logged in user lands here
export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/',
    });
};
