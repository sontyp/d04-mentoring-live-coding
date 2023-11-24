import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export interface IUser {
    id: number,
    name: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
};

export default function Users() {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users/')
            .then(resp => setUsers(resp.data))
            .catch(err => console.error(err));
    }, []);

    const usersList = users.map(user => {
        return <li><NavLink to={`/users/${user.id}`} className='hover:text-red-400'>{user.name}</NavLink></li>
    });

    return (
        <ul>
            {usersList}
        </ul>
    );
}