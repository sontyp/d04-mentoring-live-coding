
import { useRef, useState } from 'react';
import '../../css/App.scss';


function App() {
    // State für Wert eines Eingabefeldes (controlled input field)
    const [inputValue, setInputValue] = useState('');

    // Referenz für ein uncontrolled Eingabefeld
    const inputRef = useRef<HTMLInputElement>(null);

    // Change Handler für Eingabefeld ausgelagert
    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => setInputValue(evt.target.value);

    /* 
        Clickhandler für Button
        Holt aus dem uncontrolled Input Feld den Wert und gibt ihn aus
    */
    const handleClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Hole Wert aus uncontrolled Input Feld per Referenz
        const refInputValue = inputRef.current ? inputRef.current.value : '';

        // Gebe Wert aus
        console.log('Eingabewert: ', refInputValue);
    };

    return (
        <>
            <h1>React + TS Vite-Boilerplate</h1>

            {/* 
                Controlled Input
                -> Wert und onChange an Komponenten-State gebunden
            */}
            <input
                type="text"
                value={inputValue}
                // onChange Handler inline
                // onChange={evt => setInputValue(evt.target.value)}

                // onChange Handler ausgelagert referenziert
                onChange={handleInputChange}
            />

            {/* 
                Uncontrolled Input
                -> Nutzt seinen inneren State
                -> Wird per Referenz angesprochen
            */}
            <input
                type="text"
                ref={inputRef}
            />
            <button 
                onClick={handleClick}
            >Send</button>
        </>
    );
}

export default App;