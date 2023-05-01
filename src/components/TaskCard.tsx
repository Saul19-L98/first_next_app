"use client"
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useTasksContext } from "../context/tasksContext";
import {toast} from "react-hot-toast";

interface TaskCardProps{
    task:{
        id: string;
        title: string;
        description: string;
    }
}

export const TaskCard = ({task}:TaskCardProps) => {

    const {deleteTask} = useTasksContext();
    const router = useRouter();

    const handleDelete = (event:MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteTask(task.id);
        toast.success("Task deleted");
    }

    return(
        <div className="bg-slate-700 hover:bg-slate-600 cursor-pointer px-20 py-5 m-2" onClick={() => router.push(`/edit/${task.id}`)}>
            <div className="flex justify-between">
                <h2>{task.title}</h2>
                <button 
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">Delete</button>
            </div>
            <p className="text grey-300">{task.description}</p>
            <span className="text-gray-400 text-xs" >{task.id}</span>
        </div>
    )
};
