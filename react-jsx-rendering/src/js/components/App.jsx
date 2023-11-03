import employeeData from '../../data/employees.json';

import * as config from '../config.js';

// Import der zugehoerigen CSS-Datei
import '../../css/App.scss';

// Definition einer Komponente
// Am besten gleich als export Statement schreiben, um es nachher nicht zu vergessen.
export default function App() {
    const title = "Employee Directory";
    const introText = "Welcome to our Employee Directory, your one-stop destination for discovering and connecting with the talented individuals who make our organization thrive.";

    // List-Rendering der Employees ausserhalb des JSX unter Verwendung der Employee-Komponente
    // const employees = employeeData.map(employee => {
    //     return <Employee employee={employee} key={employee.employeeID} />;
    // });

    const employees = employeeData.map(employee => {
        
        /* 
            Conditional Rendering als Variable ausgelagert
        */
        let phoneNumber = null;
        if (config.userAccessGroup === config.ACCESS_GROUPS.admins) {
            phoneNumber = (
                <div className='employee-special-data'>
                    <p>Phone-No.: {employee.address.phone}</p>
                </div>
            );
        }

        /* 
            Conditional Rendering mit ternaerem Operator als Konstante ausgelagert
        */
        const confidential = (config.userAccessGroup === config.ACCESS_GROUPS.admins)
            ? <p>Phone-No.: {employee.address.phone}</p>
            : <p>Login as an administrator to see the phone number!</p>;

        // Liste der Territorial IDs ausgelagert in einem Array von li-Elementen als Komponente
        const territoryIDs = employee.territoryIDs.map(territoryID => <li key={territoryID}>{territoryID}</li>);

        return (
            <div className='employee-card' key={employee.employeeID} >
                <h3>ID: {employee.employeeID}</h3>
                <h4>Name: {`${employee.firstName} ${employee.lastName}`}</h4>
                <p>Title: {employee.title}</p>

                {/* Conditional Rendering im JSX (Anzeigen oder nicht) */}
                {
                    config.userAccessGroup === config.ACCESS_GROUPS.admins
                    &&
                    <div className='employee-special-data'>
                        <p>Phone-No.: {employee.address.phone}</p>
                    </div>
                }

                {/* 
                    Conditional Rendering im JSX per ternaerem Operator
                    (Zeige je nach Ergebnis der Bedingung etwas anderes an)
                */}
                <div className='employee-special-data'>
                    {
                        (config.userAccessGroup === config.ACCESS_GROUPS.admins)
                            ? <p>Phone-No.: {employee.address.phone}</p>
                            : <p>Login as an administrator to see the phone number!</p>
                    }
                </div>

                {/* 
                    Anzeige der ausgelagerten Variable.
                    Kann JSX oder null sein.
                    Wenn null, wird nichts angezeigt...
                */}
                {phoneNumber}

                
                <div className='employee-special-data'>
                    {confidential}
                </div>

                <div>
                    <h4>Notes</h4>
                    <p>{employee.notes}</p>
                </div>


                <div>
                    <h4>Territories:</h4>
                    <ul>
                        {territoryIDs}
                    </ul>
                </div>
            </div>
        );
    });

    return (
        <div className='app'>
            <h1>{title}</h1>
            <p>{introText}</p>

            {employees}
        </div>
    );
}


// Ausgelagert als eigene Komponente mit den Daten eines Employee-Eintrags als prop uebergeben
function Employee({ employee }) {

    return (
        <div className='employee-card' >
            <h3>ID: {employee.employeeID}</h3>
            <h4>Name: {`${employee.firstName} ${employee.lastName}`}</h4>
            <p>Title: {employee.title}</p>
        </div>
    );
}
