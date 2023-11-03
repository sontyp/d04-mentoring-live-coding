// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import einer Bild-Datei aus dem assets-Ordner
import reactLogo from '../../assets/react.svg';

// Import der zugehoerigen CSS-Datei
import '../../css/App.scss';

// Definition einer Komponente
// Am besten gleich als export Statement schreiben, um es nachher nicht zu vergessen.
export default function App() {
    // Typischer State fuer Zahlenwerte
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');


    // Typischer Clickhandler
    function handleClick(evt) {
        setCount(count + 1);
    }

    // onChange Handler als Arrow-Function
    const handleChange = (evt) => {
        setName(evt.target.value);
    };

    return (
        <div className='app'>
            <h1>Hallo React!</h1>

            {/* Ein Beispiel fuer Conditional Rendering */}
            {
                (name.length > 0) && <h2>Moin, {name}!</h2>
            }

            <div>
                {/* Einbindung eines Bild-Assets aus dem assets-Ordner */}
                <img src={reactLogo} alt="Logo von react" />
            </div>

            {/* Typischer Button, der per Click den numerischen State um 1 erhoeht */}
            <button
                onClick={handleClick}
            >You clicked me {count} times!</button>

            {/* 
                Ein Beispiel fuer ein Controlled Input, bei dem das value-Attribut an eine Statevariable gebunden ist, 
                und der onChange Handler diese ueber den Setter manipuliert.
            */}
            <label>
                Tell me your name
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
}
