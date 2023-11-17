import { TTask } from "./todos.types";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useEffect, useState } from "react";


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
    // useEffect(() => {
    //     console.log('running...');

    //     // Speichere Tasks als JSON im LocalStorage
    //     if (tasks.length > 0) localStorage.setItem(TASK_STORE_KEY, JSON.stringify(tasks));
    // }, [tasks]);


    const saveTasksToLocalStorage = (tasks: TTask[]) => {
        // Speichere Tasks als JSON im LocalStorage
        localStorage.setItem(TASK_STORE_KEY, JSON.stringify(tasks));
    };

    /* 
        Handler zum Erstellen und Hinzufügen eines neuen Tasks
        anhand eines übergebenen Task Strings.
    */
    const addTask = (newTaskText: string) => {
        // Speichere neue Taskliste mittels Kopie der alten plus dem neuen Eintrag
        const newTask = {
            id: genNewId(tasks),
            taskText: newTaskText,
            isCompleted: false
        };


        // setTasks([
        //     ...tasks,
        //     newTask
        // ]);

        // Speichere Tasks persistent im LocalStorage
        // saveTasksToLocalStorage();

        /* 
            ACHTUNG! Der Zugriff auf Tasks nach Anstoß des Stateupdates
            garantiert NICHT, dass die Tasks da schon geupdatet sind.
            Operationen mit Abhängigkeit auf den geupdateten State,
            könnten daher besser im Callback eines Stateupdates durchgeführt werden.
        */

        // Speichere neue Taskliste mittels Kopie der alten plus dem neuen Eintrag
        // unter Verwendung einer Update Funktion als Callback (Immer sinnvoll, wenn alter Wert nötig ist)
        setTasks(prev => {
            const updatedTasks = [...prev, newTask];

            // Speichere Tasks persistent im LocalStorage
            saveTasksToLocalStorage(updatedTasks);

            return updatedTasks;
        });


        // const newTaskList = [
        //     ...tasks,
        //     newTask
        // ];

        // setTasks(newTaskList);
        // saveTasksToLocalStorage(newTaskList);
    };

    /* 
        Handler zum Ab- oder Anhaken eines Tasks.
        Wird anhand der ID gefunden und mit dem übergebenen Check-Wert manipuliert.
    */
    const checkTask = (id: number, isCompleted: boolean) => {
        // Verwende Setter für Tasks-State mit Callback
        // setTasks(prevTasks => {
        //     // Finde anhand der übergebenen ID den Zieltask, der verändert werden soll
        //     const targetIdx = prevTasks.findIndex(task => task.id === id);

        //     // Toggle den isCompleted Wert des Zieltasks
        //     prevTasks[targetIdx].isCompleted = isCompleted;

        //     const tasksCopy = [...prevTasks];

        //     // Speichere Tasks persistent im LocalStorage
        //     saveTasksToLocalStorage(tasksCopy);

        //     // Gebe neue Kopie des veränderten Tasksarray zurück
        //     return tasksCopy;
        // });

        // Erstelle Kopie der bisherigen Tasks
        const tasksCopy = [...tasks];

        // Finde anhand der übergebenen ID den Zieltask, der verändert werden soll
        const targetIdx = tasksCopy.findIndex(task => task.id === id);

        // Toggle den isCompleted Wert des Zieltasks
        tasksCopy[targetIdx].isCompleted = isCompleted;

        // Speichere Tasks persistent im LocalStorage
        saveTasksToLocalStorage(tasksCopy);

        setTasks(tasksCopy);
    };

    /* 
        Ein Handler zum Löschen eines Tasks per ID
    */
    const deleteTask = (id: number) => {
        console.log(`Delete Task with ID ${id}`);

        // Erstelle Kopie der Tasks im State
        const tasksCopy = [...tasks];

        // Finde anhand der übergebenen ID den Zieltask, der verändert werden soll
        const targetIdx = tasksCopy.findIndex(task => task.id === id);

        // Entferne den Zieltask
        tasksCopy.splice(targetIdx, 1);

        // Speichere veränderte Kopie der Tasks im LocalStorage
        saveTasksToLocalStorage(tasksCopy);

        // Führe Stateupdate mit veränderter Kopie der Tasks durch
        setTasks(tasksCopy);
    };

    /* 
        Ein Handler zum Editieren des Textes eines Tasks anhand der ID
    */
    const editTaskText = (id: number, newTaskText: string) => {
        // Erstelle Kopie der Tasks im State
        const tasksCopy = [...tasks];

        // Finde anhand der übergebenen ID den Zieltask, der verändert werden soll
        const targetIdx = tasksCopy.findIndex(task => task.id === id);

        // Überschreibe TaskText des Zieltasks
        tasksCopy[targetIdx].taskText = newTaskText;

        // Speichere veränderte Kopie der Tasks im LocalStorage
        saveTasksToLocalStorage(tasksCopy);

        // Führe Stateupdate mit veränderter Kopie der Tasks durch
        setTasks(tasksCopy);
    };

    return (
        /* 
            Wir rendern die TodoForm neben der TodoList und übergebenen ihnen per Props die nötigen Daten und Handler
        */
        <div>
            <h2 className="text-xl">Todos</h2>

            <TodoForm newTaskHandler={addTask} />

            <hr />

            <TodoList
                tasks={tasks}
                checkTaskHandler={checkTask}
                deleteTaskHandler={deleteTask}
                editTaskHandler={editTaskText}
            />

            <button
                onClick={() => setTasks(() => {
                    saveTasksToLocalStorage([]);

                    return [];
                })}
            >Clear Tasks</button>
        </div>
    );
}

export default Todos;