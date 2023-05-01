"use client"
import {useTasksContext} from "../context/tasksContext";
import {TaskCard} from "../components/TaskCard";

function Page() {
  const {tasks} = useTasksContext();
  console.log(tasks);

  return (
    <div className="flex justify-center">
      <div className="w-7/12 "> 
        {
          tasks?.map((task) => {
            return (
              <TaskCard 
                key={task.id} 
                task={task}/>
            );
          })
        }
    </div>
    </div>
  );
};

export default Page;