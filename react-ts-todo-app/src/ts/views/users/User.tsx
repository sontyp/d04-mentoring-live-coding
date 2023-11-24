import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "./Users";
import axios from "axios";

export default function User() {
    const { userId } = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<IUser>('https://jsonplaceholder.typicode.com/users/' + userId)
            .then(resp => setUser(resp.data))
            .catch(err => console.error(err));
    }, [userId]);


    const handleBackBtnClick = () => {
        navigate(-1);
    };

    return (
        <div className="border border-black p-2">
            <button
                onClick={handleBackBtnClick}
                className="rounded-md p-1 border border-black hover:bg-red-200 active:bg-red-400"
            >Back to list</button>
            <h4>#{userId} {user?.name}</h4>
            <p>E-Mail: {user?.email}</p>
        </div>
    );
}