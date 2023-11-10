
import '../../css/App.scss';


import Todos from './Todos';

function App() {
    
    return (
        <div className='container mx-auto w-96'>
            <h1 className='text-2xl'>My Todo-App</h1>

            <Todos />
        </div>
    );
}

export default App;