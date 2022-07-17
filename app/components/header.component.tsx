import { Form, NavLink } from '@remix-run/react';

interface IUser {
    isLoggedIn: boolean;
    avatar_url: string;
    username: string;
}

export const Header = ({ isLoggedIn, avatar_url, username }: IUser) => {
    return <header className="px-2 py-1 md:py-4 md:pb-3 md:px-0">
        <div className="container flex flex-row items-center justify-between gap-2 mx-auto">
            < NavLink to="/" >
                <div className="flex flex-row items-center justify-center gap-1 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6 lg:w-7" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <p className='p-1 mt-0 font-semibold text-md md:text-2xl'>remix-store</p>
                </div>
            </NavLink >
            <Form method="get" action="/" className='hidden text-lg lg:flex-row lg:items-center lg:justify-center lg:flex-1 lg:flex'>
                <div className="relative w-3/5">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input type="search" name="search" placeholder='Search for products...' className="w-full p-2 pl-10 border border-gray-500 rounded-none outline-none dark:border-light placeholder:text-gray-500 placeholder:font-normal dark:text-dark" />
                </div>
                <button type="submit" className='px-6 py-2 transition duration-200 ease-in-out border bg-dark border-dark hover:bg-darkhover focus:bg-darkhover active:bg-darkhover dark:border-light' aria-label="Search">Search</button>
            </Form>
            <nav className='flex flex-row items-center justify-center gap-2'>
                <NavLink to="/cart" className="flex items-center justify-start px-4 py-2 text-xl font-semibold">
                    <div className="relative flex items-center justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="absolute flex items-center justify-center w-full h-full text-xs font-semibold border-2 bg-secondary rounded-xl -top-2 -right-3 border-light">0</span>
                    </div>
                </NavLink>
                {!isLoggedIn ? (
                    <Form action="/auth/auth0/auth0" method="post">
                        <button type="submit" className="flex items-center justify-start px-4 py-2 pr-0 text-xl font-semibold transition duration-200 ease-in-out cursor-pointer lg:pr-4 hover:text-primary focus:text-primary active:text-primary hover:dark:text-secondary focus:dark:text-secondary active:dark:text-secondary" aria-label="Login">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span className='hidden ml-2 lg:block'>Login</span>
                        </button>
                    </Form>
                ) : (
                    <NavLink to="/profile" className="flex items-center justify-start px-4 py-2 pr-0 text-xl font-semibold lg:pr-4 ">
                        <img src={avatar_url} alt="Profile Avatar" className='inline-block w-6 h-6 rounded-full sm:w-7 sm:h-7 lg:w-8 lg:h-8 ring-2 ring-white' />
                        <span className='hidden ml-3 text-md lg:block'>{username}</span>
                    </NavLink>
                )}
            </nav>
        </div>
        <div className="container mx-auto my-2">
            <Form method="get" action="/" className='flex flex-row items-center justify-center flex-1 text-lg lg:hidden'>
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input type="search" name="search" placeholder='Search for products...' className="w-full p-2 pl-8 text-sm border border-gray-500 rounded-none outline-none sm:pl-10 sm:text-lg dark:border-light placeholder:text-gray-500 placeholder:font-normal dark:text-dark" />
                </div>
                <button type="submit" className='px-6 py-2 text-sm transition duration-200 ease-in-out border sm:text-lg bg-dark border-dark hover:bg-darkhover focus:bg-darkhover active:bg-darkhover dark:border-light' aria-label="Search">Search</button>
            </Form>
        </div>
    </header >;
};