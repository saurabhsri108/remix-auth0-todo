import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, {
        failureRedirect: '/auth/auth0/login',
    });
    return null;
};

export default function Wishlist() {
    return (
        <div>
            <h1>Wishlist</h1>
        </div>
    );
}