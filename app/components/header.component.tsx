import CartIcon from './cart-icon.component';
import LoginButton from './login-button.component';
import Logo from './logo.component';
import Search from './search.component';
import UserProfileNav from './user-profile-nav.component';

interface IUser {
    isLoggedIn: boolean;
    avatar_url: string;
    username: string;
}

export const Header = ({ isLoggedIn, avatar_url, username }: IUser) => {
    return <header className="px-2 py-1 md:py-4 md:pb-3 md:px-0">
        <div className="container flex flex-row items-center justify-between gap-2 mx-auto">
            <Logo />
            <Search isMobile={false} />
            <nav className='flex flex-row items-center justify-center gap-2'>
                <CartIcon />
                {!isLoggedIn ? (
                    <LoginButton />
                ) : (
                    <UserProfileNav avatar_url={avatar_url} username={username} />
                )}
            </nav>
        </div>
        <div className="container mx-auto my-2">
            <Search isMobile={true} />
        </div>
    </header >;
};