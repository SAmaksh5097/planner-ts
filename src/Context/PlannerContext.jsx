import { createContext, useEffect, useState } from "react";

export const PlannerContext = createContext()
export const PlannerProvider = ({children})=>{
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [tasks,setTasks] = useState(()=>{
        const saved = localStorage.getItem('tasks')
        return saved?JSON.parse(saved):[]
    })
    const [isFormOpen,setIsFormOpen] = useState(false)
    const [editingTask,setEditingTask] = useState(null)
    
    useEffect(()=>{
        if(tasks.length>0 || localStorage.getItem('tasks')){
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
    },[tasks])

    const addtask = (task)=>{
        setTasks((prevtasks)=>[...prevtasks,{...task,id:crypto.randomUUID(),status:'pending'}])
    };

    const updatetask = (id,updates)=>{
        setTasks(tasks.map(task=>task.id===id?{...task,...updates}:task))
    };

    const deletetask = (id)=>{
        setTasks(tasks.filter(task=>task.id!==id))
    }

    const [selected,setSelected] = useState("dashboard")

    const options = [
        {name:'Work', bgcolor:'bg-blue-500',color:"border-l-blue-500"},
        {name:'Personal', bgcolor:'bg-purple-500',color:"border-l-purple-500"},
        {name:'Exercise', bgcolor:'bg-green-500',color:"border-l-green-500"},
        {name:'Deep Work', bgcolor:'bg-orange-500',color:"border-l-orange-500"},
        {name:'Misc', bgcolor:'bg-red-500',color:"border-l-red-500"}
    ]

    
    

    return(
        <PlannerContext.Provider value={{tasks,selectedDate,setSelectedDate,addtask,updatetask,isFormOpen,setIsFormOpen, editingTask, setEditingTask, selected, setSelected, options, deletetask}}>
                {children}
            </PlannerContext.Provider>
    )
    
};