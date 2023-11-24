import { useLocation, useNavigate } from "react-router-dom";

type LoginProps = {
    user: {
        username: string,
        isLoggedIn: boolean
    },
    loginHandler: () => void,
    logoutHandler: () => void
};

export default function Login({user, loginHandler, logoutHandler}: LoginProps) {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state);

    const handleLogin = () => {
        loginHandler();

        if (location.state?.from) navigate(location.state.from);
    };

    return (
        <div>
            <button 
                    className="border border-black p-1 rounded mx-2 active:bg-green-200 disabled:bg-gray-200 disabled:text-gray-600"
                    onClick={handleLogin}
                    disabled={user.isLoggedIn}
                >Login</button>
                <button 
                    className="border border-black p-1 rounded mx-2 active:bg-green-200 disabled:bg-gray-200 disabled:text-gray-600"
                    onClick={logoutHandler}
                    disabled={!user.isLoggedIn}
                >Logout</button>
        </div>
    );
}