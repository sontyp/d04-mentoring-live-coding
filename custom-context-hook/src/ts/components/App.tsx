
import { useState } from 'react';
import '../../css/App.scss';

export type TColorMode = 'light' | 'dark';

export type TUser = {
    username: string,
    preferredColorMode: TColorMode;
};

// const exampleUser: TUser = {
//     username: 'peter',
//     preferredColorMode: 'light'
// };

import { UserProvider } from '../hooks/useUser';
import Layout from './Layout';

function App() {


    return (
        <UserProvider>
            <Layout />
        </UserProvider>
    );
}

export default App;