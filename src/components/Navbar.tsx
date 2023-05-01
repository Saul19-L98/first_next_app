"use client"
import {useRouter} from "next/navigation";
import {useTasksContext} from "../context/tasksContext";

export const Navbar = () => {
    const {tasks} = useTasksContext();
    console.log(tasks)
    const router = useRouter();
    return(
        <header className="flex justify-between items-center bg-gray-800 px-28 py-3">
            <h1 className="font-bold text-3xl text-white">Task App 
                <span className="text-sm text-slate-300 ml-3"> {tasks.length} tasks</span>
            </h1>
            <div>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push("/new")}
                >
                    Add task 📃
                </button>
            </div>
        </header>
    ) 
}