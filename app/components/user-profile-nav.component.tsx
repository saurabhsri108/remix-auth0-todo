import { NavLink } from '@remix-run/react';

interface IUserProfileNav {
    avatar_url: string;
    username: string;
}

export default function UserProfileNav({ avatar_url, username }: IUserProfileNav) {
    return <NavLink to="/profile" className="flex items-center justify-start px-4 py-2 pr-0 text-xl font-semibold lg:pr-4 ">
        <img src={avatar_url} alt="Profile Avatar" className='inline-block w-6 h-6 rounded-full sm:w-7 sm:h-7 lg:w-8 lg:h-8 ring-2 ring-white' />
        <span className='hidden ml-3 text-md lg:block'>{username}</span>
    </NavLink>;
}