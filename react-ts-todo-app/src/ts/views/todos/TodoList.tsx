import { TTask } from "./todos.types";
import Task from "./Task";

/* 
    Typdefinition der TodoList Props
    Enthält die Liste der Tasks und einen Handler
    zum An- und Abhaken eines bestimmten Tasks per ID (Wird hier nur an die jeweiligen Tasks durchgereicht).
*/
type TodoListProps = {
    tasks: TTask[],
    checkTaskHandler: (id: number, isCompleted: boolean) => void,
    deleteTaskHandler: (id: number) => void,
    editTaskHandler: (id: number, newText: string) => void
};

/* 
    Komponente zum Anzeigen einer ganzen Liste von Tasks.
    Könnte um Sortierfunktion, etc. erweitert werden.
*/
function TodoList({ tasks, checkTaskHandler, deleteTaskHandler, editTaskHandler }: TodoListProps) {
    /* 
        Erstelle ein Array von Task Elementen für jeden Task des übergebenen Arrays
    */
    const taskItems = tasks.map(task => {
        return <Task
            task={task}
            checkTaskHandler={checkTaskHandler}
            deleteTaskHandler={deleteTaskHandler}
            editTaskHandler={editTaskHandler}
            key={task.id}
        />;
    });

    return (
        <ul>
            {taskItems}
        </ul>
    );
}

export default TodoList;