"use client"
import { useEffect} from "react";
import {useTasksContext} from "../../context/tasksContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {toast} from "react-hot-toast";

interface PageProps{
    params: {
      id: string;
  };
}

export default function Page({params}: PageProps) {

  const {tasks,createTask,updateTask} = useTasksContext();

  const router = useRouter();

  const {register,handleSubmit,setValue,formState:{
    errors
  }} = useForm();

  const onSubmit =  handleSubmit((data) => {
    console.log(data);
    if(params.id) {
      updateTask({id: params.id,title: data.title,
        description: data.description,})
      toast.success("Task updated");
    }
    if(!params.id){
      createTask(data.title,data.description);
      toast.success("Task created");
    }
    router.push("/");
  })

  useEffect(() => {
    if(params.id){
      const taskFound = tasks.find(task => task.id === params.id);
      setValue("title",taskFound!.title);
      setValue("description",taskFound!.description);
    }
  },[setValue,params.id,tasks])

  return (
    <form onSubmit={onSubmit} className="flex justify-center items-center h-full">
      <div className="bg-gray-700 p-10">
        <h2>New Task</h2>
        <input 
          placeholder="Write a title"
          className="bg-gray-800 py-3 px-4 my-2 block focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full" 
          {...register("title", { required: true })}
          />
        {errors.title && <span className="block text-red-400 mb-2">This field is required</span>}
        <textarea 
          placeholder="Write a description" 
          className="bg-gray-800 py-3 px-4 my-2 lock focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full" 
          {...register("description", { required: true })}
          />
        {errors.description && <span className="block text-red-400 mb-2">This field is required</span>}
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">Save</button>
      </div>
    </form>
  );
};