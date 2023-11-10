import { TTask } from "./Todos";
import Task from "./Task";

/* 
    Typdefinition der TodoList Props
    Enthält die Liste der Tasks und einen Handler
    zum An- und Abhaken eines bestimmten Tasks per ID (Wird hier nur an die jeweiligen Tasks durchgereicht).
*/
type TodoListProps = {
    tasks: TTask[],
    checkTaskHandler: (id: number, isCompleted: boolean) => void
};

/* 
    Komponente zum Anzeigen einer ganzen Liste von Tasks.
    Könnte um Sortierfunktion, etc. erweitert werden.
*/
function TodoList({ tasks, checkTaskHandler }: TodoListProps) {
    /* 
        Erstelle ein Array von Task Elementen für jeden Task des übergebenen Arrays
    */
    const taskItems = tasks.map(task => {
        return <Task
            task={task}
            checkTaskHandler={checkTaskHandler}
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