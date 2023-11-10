import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useEffect, useState } from "react";

// Typ Definition für einen Task
// Exportiert für externen Gebrauch in anderen Komponenten
export type TTask = {
    id: number,
    taskText: string,
    isCompleted: boolean
};

/* 
    Hilfsfunktion zum Generieren einer neuen einzigartigen Zahlen ID.
    Findet die höchste ID des übergebenen Arrays und gibt ein Inkrement davon zurück.
*/
const genNewId = (data: TTask[]) => {
    // Vergleichsvariable initial auf 0
    let maxId = 0;

    // Schleife durch das übergebene Task-Array
    data.forEach(entry => {
        // Wenn ID des aktuellen Eintrags höher als Vergleichsvariable
        // -> Setze Vergleichsvariable auf diese ID
        if (entry.id > maxId) maxId = entry.id;
    });

    // Gebe Vergleichsvariable (höchste gefundene ID) + 1 zurück
    return maxId + 1;
}

// Konstante für den Key unter dem die Tasks im LocalStorage gespeichert und gelesen werden sollen.
const TASK_STORE_KEY = 'TASKS';

// Eine Konstante mit Beispiel Tasks damit die App nicht leer ist, wenn man sie das erste mal öffnet ;)
const EXAMPLE_TASKS: TTask[] = [
    {
        id: 1,
        taskText: 'Aufräumen',
        isCompleted: false
    },
    {
        id: 2,
        taskText: 'Katze füttern',
        isCompleted: true
    },
    {
        id: 3,
        taskText: 'TypeScript ma richtig lernen',
        isCompleted: false
    },
    {
        id: 4,
        taskText: 'Ordentlich ausruhen',
        isCompleted: true
    },
];


/* 
    Komponente als Container für die gesamte Todo-List Funktionalität
*/
function Todos() {
    /* 
        Statespeicher für die Liste der Tasks.
        Wird mit leerem Array initialisiert und durch ein useEffect gefüllt.
    */
    const [tasks, setTasks] = useState<TTask[] | []>([]);

    /* 
        Side-Effect zum Holen der im LocalStorage gespeicherten Tasks.
        Sollten im LocalStorage keine gespeichert sein, werden BeispielTasks eingefüllt.
    */
    useEffect(() => {
        // Hole JSON-Repräsentation der im LocalStorage gespeicherten Tasks
        const storedTasksJson = localStorage.getItem(TASK_STORE_KEY);        

        // Wenn gespeicherte Tasks vorhanden, speichere sie geparst im State, sonst Beispiel Tasks
        // TODO: Evtl. möchte man die Beispieltasks nicht mehr. Dann müssen die hier raus ;)
        setTasks(storedTasksJson ? JSON.parse(storedTasksJson) : EXAMPLE_TASKS);
    }, []);

    /* 
        Side-Effect, der bei Änderungen der Tasks im State
        diese als JSON im LocalStorage speichert
    */
    useEffect(() => {
        // Wenn Liste nicht leer, speichere Tasks als JSON im LocalStorage
        if (tasks.length > 0) localStorage.setItem(TASK_STORE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    /* 
        Handler zum Erstellen und Hinzufügen eines neuen Tasks
        anhand eines übergebenen Task Strings.
    */
    const addTask = (newTaskText: string) => {
        // Speichere neue Taskliste mittels Kopie der alten plus dem neuen Eintrag
        setTasks([
            ...tasks,
            {
                id: genNewId(tasks),
                taskText: newTaskText,
                isCompleted: false
            }
        ]);

        // Speichere neue Taskliste mittels Kopie der alten plus dem neuen Eintrag
        // unter Verwendung einer Update Funktion als Callback (Immer sinnvoll, wenn alter Wert nötig ist)
        // setTasks(prev => [...prev, newTask]);
    };

    /* 
        Handler zum Ab- oder Anhaken eines Tasks.
        Wird anhand der ID gefunden und mit dem übergebenen Check-Wert manipuliert.
    */
    const checkTask = (id: number, isCompleted: boolean) => {
        // Verwende Setter für Tasks-State mit Callback
        setTasks(prevTasks => {
            // Finde anhand der übergebenen ID den Zieltask, der verändert werden soll
            const targetIdx = prevTasks.findIndex(task => task.id === id);

            // Toggle den isCompleted Wert des Zieltasks
            prevTasks[targetIdx].isCompleted = isCompleted;

            // Gebe neue Kopie des veränderten Tasksarray zurück
            return [...prevTasks];
        });
    };

    /* 
        TODO: Ein Handler zum Löschen eines Tasks per ID
    */
    const deleteTask = (id: number) => {};

    /* 
        TODO: Ein Handler zum Editieren des Textes eines Tasks anhand der ID
    */
    const editTaskText = (id: number, newTaskText: string) => {};

    return (
        /* 
            Wir rendern die TodoForm neben der TodoList und übergebenen ihnen per Props die nötigen Daten und Handler
        */
        <div>
            <h2 className="text-xl">Todos</h2>

            <TodoForm newTaskHandler={addTask} />

            <hr />

            <TodoList tasks={tasks} checkTaskHandler={checkTask} />
        </div>
    );
}

export default Todos;