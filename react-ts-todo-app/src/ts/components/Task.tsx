// Import des Task-Typen aus der todos.types.ts
import { useState } from "react";
import { TTask } from "./todos.types";


// Typ für die Props, die in einen Task wandern
type TaskProps = {
    task: TTask,
    checkTaskHandler: (id: number, isCompleted: boolean) => void,
    deleteTaskHandler: (id: number) => void,
    editTaskHandler: (id: number, newText: string) => void
};

/* 
    Komponente zur Darstellung eines Tasks.
    Erhält neben den Task-Informationen noch einen Handler zum An- und Abhaken eines Tasks.
*/
function Task({task, checkTaskHandler, deleteTaskHandler, editTaskHandler}: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);

    /* 
        Changehandler für die Checkbox des Tasks.
        Ruft den übergebenen Handler zum An- und Abhaken auf
        und übergibt diesem die ID und den veränderten Checked-Zustand
    */
    const handleCheckChange = () => {
        // Übergebe Task ID und negierten isCompleted Zustand (Toggle)
        checkTaskHandler(task.id, !task.isCompleted);
    };

    const handleDeleteClick = () => {
        // Übergebe Task ID an DeleteHandler aus den Props
        deleteTaskHandler(task.id);
    };

    const handleEditClick = () => {
        // editTaskHandler(task.id, 'Beispieltext');

        setIsEditing(!isEditing);
    };

    const handleTaskTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        // Hole den Text Wert aus dem change-Event
        const newText = evt.target.value;

        // Übergebe extrahierten Text Wert an den übergebenen Handler zum Editieren
        editTaskHandler(task.id, newText);
    };

    return (
        <li style={{
            display: 'flex',
            gap: '0.2em'
        }}>
            <label className={task.isCompleted ? 'line-through' : ''}>
                <input 
                    type="checkbox" 
                    className="shrink-0 mt-0.5 mx-2 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    checked={task.isCompleted}
                    onChange={handleCheckChange}
                />
                {
                    isEditing  
                    ? <input type="text" value={task.taskText} onChange={handleTaskTextChange} />
                    : task.taskText
            }
            </label>

            <button
                onClick={handleEditClick}
                style={{
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '0 8px'
                }}
            >Edit</button>

            <button
                onClick={handleDeleteClick}
                style={{
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '0 8px'
                }}
            >x</button>
        </li>
    );
}

export default Task;