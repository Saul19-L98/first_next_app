"use client"
import { createContext,ReactNode,useContext,useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";

type Task = {
    id: string;
    title: string;
    description: string
};

type Tasks = Task[];

interface TasksContext {
    tasks:Tasks;
    createTask: (title: string, description: string) => void;
    deleteTask: (id:string) => void;
    updateTask: (taskToUpdate:Task) => void;
}

interface TasksProviderProps {
    children: ReactNode;
}

export const TasksContext = createContext<TasksContext>({} as TasksContext);

export const TasksProvider = ({children}:TasksProviderProps) => {

    const [tasks,setTasks] = useState<Tasks>([{
        id:"dkfdf1",
        title: "Task 1",
        description: "Description 1"
    },
    {
        id:"dkfdf2",
        title: "Task 2",
        description: "Description 2"
    },
    {
        id:"dkfdf3",
        title: "Task 3",
        description: "Description 3"
    }]);

    useEffect(() => {
        const item = localStorage.getItem("tasks");
        const tasks = JSON.parse(item!);
        if(tasks){
            setTasks(tasks);
        }
    },[])

    useEffect( () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks])

    const createTask = (title:string,description:string) => 
    setTasks([
        ...tasks,
        {
            id: uuidv4(),
            title,
            description,
        }
    ]);

    const deleteTask = (id:string) => {
        setTasks([...tasks.filter(task => task.id !== id)]);
    };

    const updateTask = (taskToUpdate:Task) => {
        setTasks([...tasks.map(task => task.id === taskToUpdate.id ? {...task,...taskToUpdate} : task)]);
    };

    return (
        <TasksContext.Provider value={{tasks,createTask,deleteTask,updateTask}}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTasksContext = () => {
    const context = useContext(TasksContext);
    if(!context) throw new Error("useTasksContext must be used within a TasksProvider");
    return context;
};