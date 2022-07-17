import { Form } from '@remix-run/react';

export default function Search({ isMobile }: { isMobile: boolean; }) {
    return isMobile ? (
        <Form method="get" action="/" className='flex flex-row items-center justify-center flex-1 text-lg lg:hidden'>
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input type="search" name="search" placeholder='Search for products...' className="w-full p-2 pl-8 text-sm border border-gray-500 rounded-none outline-none sm:pl-10 sm:text-lg dark:border-light placeholder:text-gray-500 placeholder:font-normal dark:text-dark" />
            </div>
            <button type="submit" className='px-6 py-2 text-sm transition duration-200 ease-in-out border sm:text-lg bg-dark text-light border-dark hover:bg-darkhover focus:bg-darkhover active:bg-darkhover dark:border-light' aria-label="Search">Search</button>
        </Form>
    ) : (

        <Form method="get" action="/" className='hidden text-lg lg:flex-row lg:items-center lg:justify-center lg:flex-1 lg:flex'>
            <div className="relative w-3/5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input type="search" name="search" placeholder='Search for products...' className="w-full p-2 pl-10 border border-gray-500 rounded-none outline-none dark:border-light placeholder:text-gray-500 placeholder:font-normal dark:text-dark" />
            </div>
            <button type="submit" className='px-6 py-2 transition duration-200 ease-in-out border bg-dark border-dark hover:bg-darkhover focus:bg-darkhover active:bg-darkhover dark:border-light text-light' aria-label="Search">Search</button>
        </Form>
    );
}