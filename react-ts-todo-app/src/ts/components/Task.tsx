// Import des Task-Typen aus der Todos.tsx
import { TTask } from "./Todos";


// Typ für die Props, die in einen Task wandern
type TaskProps = {
    task: TTask,
    checkTaskHandler: (id: number, isCompleted: boolean) => void
};

/* 
    Komponente zur Darstellung eines Tasks.
    Erhält neben den Task-Informationen noch einen Handler zum An- und Abhaken eines Tasks.
*/
function Task({task, checkTaskHandler}: TaskProps) {
    /* 
        Changehandler für die Checkbox des Tasks.
        Ruft den übergebenen Handler zum An- und Abhaken auf
        und übergibt diesem die ID und den veränderten Checked-Zustand
    */
    const handleCheckChange = () => {
        // Übergebe Task ID und negierten isCompleted Zustand (Toggle)
        checkTaskHandler(task.id, !task.isCompleted);
    };

    return (
        <li>
            <label className={task.isCompleted ? 'line-through' : ''}>
                <input 
                    type="checkbox" 
                    className="shrink-0 mt-0.5 mx-2 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    checked={task.isCompleted}
                    onChange={handleCheckChange}
                />
                {task.taskText}
            </label>
        </li>
    );
}

export default Task;