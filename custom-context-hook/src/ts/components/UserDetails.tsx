
import { TColorMode, TUser } from "./App";
import UserForm from "./UserForm";

type TUserDetailsProps = {
    user: TUser | null,
    submitUserHandler: (username: string, preferredColorMode: TColorMode) => void
};

export default function UserDetails({ user, submitUserHandler }: TUserDetailsProps) {

    return (
        <div style={{
            width: '80%',
            margin: '0 auto',
            padding: '2em',
            border: '1px solid black'
        }}>
            <div style={{
                backgroundColor: 'gray',
                color: 'white'
            }}>
                <pre>
                    {JSON.stringify(user)}
                </pre>
            </div>
            <UserForm user={user} submitUserDetails={submitUserHandler} />
        </div>
    );
}