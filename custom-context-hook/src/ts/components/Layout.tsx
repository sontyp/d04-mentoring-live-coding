import useUser from "../hooks/useUser";
import UserGreeting from './UserGreeting';
import UserDetails from './UserDetails';


export default function Layout() {
    const { user, submitNewUser } = useUser();

    return (
        <div className={ user ? user.preferredColorMode : 'light'}>
            <h1>Custom Context Hook Example</h1>
            <UserGreeting user={user} />
            <UserDetails user={user} submitUserHandler={submitNewUser} />
        </div>
    );
}