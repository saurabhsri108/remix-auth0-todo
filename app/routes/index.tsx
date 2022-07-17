import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Header } from '~/components/header.component';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request);
    return user;
};

export const action: ActionFunction = async ({ request }) => {
    const body = await request.formData();
    const search_param = body.get('search');
    console.log(search_param);
    return json(search_param);
};

export default function Index() {
    const user = useLoaderData();
    const { avatar_url, username } = user || { avatar_url: '', username: '' };
    return <main className='p-0 m-0 bg-light text-dark dark:bg-dark dark:text-light'>
        <Header isLoggedIn={!!user} avatar_url={avatar_url} username={username} />
    </main>;
};