import { useState } from "react";

/* 
    PropTyp Definition.
    Enthält den Handler zum Hinzufügen eines neuen Tasks.
*/
type TodoFormProps = {
    newTaskHandler: (newTask: string) => void
};


/* 
    Komponente zum Anlegen eines neuen Tasks.
*/
function TodoForm({ newTaskHandler }: TodoFormProps) {
    // Statespeicher für das controlled Eingabefeld des neuen Tasks
    const [newTask, setNewTask] = useState('');

    /* 
        Indikator darüber, ob der Hinzufüge Button aktiviert sein sollte 
        in Abhängigkeit davon, ob das Feld Text beinhaltet oder leer ist.
        Braucht man nicht als Statevariable anlegen, da es ohnehin von einem State abhängig ist.
    */
    const hasText = newTask.length > 0;

    // Handler zum setzen des neuen Werts des controlled Eingabefelds
    const handleTaskChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(evt.target.value);
    };

    /* 
        Submithandler für das Formular.
        Übergibt den neuen Tasktext aus dem Statespeicher
        an den übergebenen Handler aus den Props.
    */
    const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        // Unterdrücke Standard-Eventbehandlung des Browsers
        evt.preventDefault();
        
        // Reiche den neuen Tasktext an die Elternkomponente hoch
        newTaskHandler(newTask);

        // Setze das Eingabefeld zurück
        setNewTask('');
    };

    return (
        <form
            className="flex items-center justify-center"
            onSubmit={handleFormSubmit}
        >
            <div className="flex rounded-lg shadow-sm">
                <input
                    type="text"
                    className="py-3 px-4 block w-full border-green-400 shadow-sm rounded-s-lg text-sm focus:z-10 outline-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="New task..."
                    autoFocus
                    value={newTask}
                    onChange={handleTaskChange}
                />
                <button
                    type="submit"
                    /* Aktiviere den Button nur, wenn Text im Eingabefeld ist */
                    disabled={!hasText}
                    className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-green-600 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                    Create
                </button>
            </div>
        </form>
    );
}

export default TodoForm;