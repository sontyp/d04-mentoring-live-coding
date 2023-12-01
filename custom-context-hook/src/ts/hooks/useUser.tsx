import { PropsWithChildren, createContext, useContext, useState } from "react";

import { TColorMode } from "../components/App";

export type TUser = {
    username: string,
    preferredColorMode: TColorMode;
};

type TUserContextValue = {
    user: TUser | null,
    submitNewUser: (username: string, preferredColorMode: TColorMode) => void
};

const UserContext = createContext<TUserContextValue>({
    user: null,
    submitNewUser: (username, preferredColorMode) => {}
});

export const UserProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<TUser | null>(null);

    const submitNewUser = (username: string, preferredColorMode: TColorMode) => {
        setUser({
            username,
            preferredColorMode
        });
    };

    return (
        <UserContext.Provider value={{
            user,
            submitNewUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default function useUser() {
    const { user, submitNewUser } = useContext(UserContext);

    return { user, submitNewUser };
}