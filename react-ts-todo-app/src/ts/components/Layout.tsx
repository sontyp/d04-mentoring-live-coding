import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

type LayoutProps = {
    user: {
        username: string,
        isLoggedIn: boolean
    }
};

export default function Layout({user}: LayoutProps) {
    const location = useLocation();
    
    useEffect(() => {
        console.log('current location:', location);
    }, [location]);

    return (
        <div className='container mx-auto w-96 border border-red-700 p-2'>
            <header className="border border-blue-700 p-2 m-2">
                <h1 className='text-2xl'>My Todo-App</h1>
                <nav className="flex gap-2">
                    <NavLink to={'/'} className={(location.pathname === '/') ? 'active' : ''}>Home</NavLink>
                    <NavLink to={'/hello'} className={(location.pathname === '/hello') ? 'active' : ''}>Helloooo</NavLink>
                    <NavLink to={'/counter/5'} className={(location.pathname === '/counter/5') ? 'active' : ''}>Countdown</NavLink>
                    <NavLink to={'/users'} className={(location.pathname === '/users') ? 'active' : ''}>Users</NavLink>
                    <NavLink to={'/todos'} className={`text-red-900 ${(location.pathname === '/') ? 'active' : ''}`}>Todos</NavLink>
                    <NavLink to={'/private'} className={`text-red-900 ${(location.pathname === '/') ? 'active' : ''}`}>Private Area</NavLink>
                </nav>
                <p>{user.isLoggedIn ? `Welcome back ${user.username}!` : 'Please log in...'}</p>
            </header>

            <main className="border border-green-700 p-2 m-2">
                <Outlet />
            </main>

            <footer>
                {/* TODO Mit sinnvollem Content befüllen... */}
            </footer>
        </div>
    );
}