import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, {
        failureRedirect: '/auth/auth0/login',
    });
    return null;
};

export default function Order() {
    return (
        <div>
            <h1>Order</h1>
        </div>
    );
}