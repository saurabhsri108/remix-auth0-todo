import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, {
        failureRedirect: '/auth/auth0/login',
    });
    return null;
};

export default function Product() {
    return (
        <div>
            <h1>Product</h1>
        </div>
    );
}