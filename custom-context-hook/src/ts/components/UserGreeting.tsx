import { TUser } from "./App";

type TUserGreetingProps = {
    user: TUser | null
};

export default function UserGreeting({user}: TUserGreetingProps) {

    return (
        <p>
            {user ? `Welcome ${user.username}!` : 'Please submit user details...'}
        </p>
    );
}