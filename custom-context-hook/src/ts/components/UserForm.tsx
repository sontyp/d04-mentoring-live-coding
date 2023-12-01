

import { useState } from "react";
import { TColorMode, TUser } from "./App";

type TUserFormProps = {
    user: TUser | null
    submitUserDetails: (username: string, prefferredColorMode: TColorMode) => void
};

export default function UserForm({user, submitUserDetails}: TUserFormProps) {
    const [username, setUsername] = useState(user ? user.username : '');
    const [preferredColorMode, setPreferredColorMode] = useState(user ? user.preferredColorMode : 'light');

    const handleUserSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        submitUserDetails(username, preferredColorMode);
    };

    return (
        <form
            className='user-form'
            onSubmit={handleUserSubmit}
        >
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={evt => setUsername(evt.target.value)}
                />
            </label>

            <label>
                Preferred color mode:
                <select
                    value={preferredColorMode}
                    // übergebe den Select-Value per Type-Assertion an setPreferredColorMode
                    onChange={evt => setPreferredColorMode(evt.target.value as TColorMode)}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>

            <button
                type='submit'
                disabled={username.length === 0}
            >Submit</button>
        </form>
    );
}