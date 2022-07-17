import { NavLink } from '@remix-run/react';

export default function CartIcon() {
    return <NavLink to="/cart" className="flex items-center justify-start px-4 py-2 text-xl font-semibold">
        <div className="relative flex items-center justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute flex items-center justify-center w-full h-full text-xs font-semibold border-2 bg-secondary rounded-xl -top-2 -right-3 border-light">0</span>
        </div>
    </NavLink>;
}