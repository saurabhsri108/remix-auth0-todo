import { Form } from '@remix-run/react';

export default function LoginButton() {
    return <Form action="/auth/auth0/auth0" method="post">
        <button type="submit" className="flex items-center justify-start px-4 py-2 pr-0 text-xl font-semibold transition duration-200 ease-in-out cursor-pointer lg:pr-4 hover:text-primary focus:text-primary active:text-primary hover:dark:text-secondary focus:dark:text-secondary active:dark:text-secondary" aria-label="Login">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className='hidden ml-2 lg:block'>Login</span>
        </button>
    </Form>;
}