import { NavLink } from '@remix-run/react';

export default function Index() {
    return <nav className='flex flex-col gap-2'>
        <NavLink prefetch='render' to='/product' >Products</NavLink>
        <NavLink prefetch='render' to='/order' >Orders</NavLink>
        <NavLink prefetch='render' to='/cart' >Cart</NavLink>
        <NavLink prefetch='render' to='/wishlist' >Wishlist</NavLink>
        <NavLink prefetch='render' to='/user' >User</NavLink>
    </nav>;
};