import { useEffect, useState } from 'react';	

type Task = {
    id: string;
    title: string;
    description: string
};

type Tasks = Task[];

interface UseLocalStorageProps {
    key: string;
    initialValue: Tasks;
}

export  function useLocalStorage(storageItems: UseLocalStorageProps):[Tasks,React.Dispatch<React.SetStateAction<Tasks>>]{

    const [state,setState] = useState<Tasks>(storageItems.initialValue);

    useEffect(() => {
        const item = localStorage.getItem(storageItems.key);
        const tasks = JSON.parse(item!);
        if(tasks){
            setState(tasks);
        }
    },[storageItems.key])

    useEffect( () => {
        localStorage.setItem(storageItems.key, JSON.stringify(state));
    },[state,storageItems.key])

    return [state,setState];
}