import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../../css/App.scss';

import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import Todos from '../views/todos/Todos';
import Login from './Login';
import Counter from '../views/counter/Counter';
import Users from '../views/users/Users';
import User from '../views/users/User';

function App() {
    const [user, setUser] = useState({
        username: 'peter',
        isLoggedIn: false
    });

    useEffect(() => {
        console.log(user);
    }, [user]);

    const loginUser = () => {
        if (!user.isLoggedIn) setUser(prevUser => ({ ...prevUser, isLoggedIn: true }));
    };
    const logoutUser = () => {
        if (user.isLoggedIn) setUser(prevUser => ({ ...prevUser, isLoggedIn: false }))
    };


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout user={user} />}>
                    <Route index element={<h2>Home</h2>} />
                    <Route path='/hello' element={<h2>Hello World!</h2>} />
                    <Route path='/login' element={<Login user={user} loginHandler={loginUser} logoutHandler={logoutUser} />}/>
                    <Route path='/counter/:start' element={<Counter />}/>
                    <Route path='/users' element={<Users />}/>
                    <Route path='/users/:userId' element={<User />}/>

                    <Route element={<PrivateRoute isLoggedIn={user.isLoggedIn} />}>
                        <Route path='/todos' element={<Todos />} />
                        <Route path='/private' element={<h2>Super private stuff....</h2>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;