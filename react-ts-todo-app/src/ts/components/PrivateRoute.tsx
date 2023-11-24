import { Outlet, Navigate, useLocation } from "react-router-dom";

type PrivateRouteProps = {
    isLoggedIn: boolean,
};

export default function PrivateRoute({isLoggedIn}: PrivateRouteProps) {
    const location = useLocation();

    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/login' replace state={{from: location}}/>
    );
}