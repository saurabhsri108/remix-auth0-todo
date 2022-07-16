import type { LoaderFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { authenticator } from '~/utils/auth.server';

// redirect to the home page if logged in user lands here
export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/',
    });
};

export default function Login() {
    return (
        <Form action="/auth/auth0/auth0" method="post">
            <button type="submit">Login with Auth0</button>
        </Form>
    );
}
