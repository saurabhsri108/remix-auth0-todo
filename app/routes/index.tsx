import type { LoaderFunction } from '@remix-run/node';
import { NavLink } from '@remix-run/react';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, {
        failureRedirect: '/auth/auth0/login',
    });
    return null;
};

export default function Index() {
    return <nav className='flex flex-col gap-2'>
        <NavLink prefetch='render' to='/product' >Products</NavLink>
        <NavLink prefetch='render' to='/order' >Orders</NavLink>
        <NavLink prefetch='render' to='/cart' >Cart</NavLink>
        <NavLink prefetch='render' to='/wishlist' >Wishlist</NavLink>
        <NavLink prefetch='render' to='/user' >User</NavLink>
    </nav>;
};