import { createContext, useEffect, useState, ReactNode } from "react";
export interface Task{
    id: string
    title: string
    start: string
    end: string
    date: string
    note: string
    category: string
    status: 'completed'|'pending'
}
export interface CategoryOption{
    name:string
    bgcolor: string
    color:string
}

interface ContextType{
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    selectedDate: string
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>
    isFormOpen: boolean
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    editingTask: Task|null
    setEditingTask: React.Dispatch<React.SetStateAction<Task|null>>
    selected: string
    setSelected: React.Dispatch<React.SetStateAction<string>>
    options: CategoryOption[]
    addtask: (task: Omit<Task, 'id' | 'status'>) => void;
    updatetask: (id: string, updates: Partial<Task>) => void; 
    deletetask: (id: string) => void;
}

interface PlannerProviderProps{
    children: ReactNode
}
export const PlannerContext = createContext<ContextType|undefined>(undefined)
export const PlannerProvider: React.FC<PlannerProviderProps> = ({children})=>{
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [tasks,setTasks] = useState<Task[]>(()=>{
        const saved = localStorage.getItem('tasks')
        return saved?JSON.parse(saved):[]
    })
    const [isFormOpen,setIsFormOpen] = useState<boolean>(false)
    const [editingTask,setEditingTask] = useState<Task|null>(null)
    
    useEffect(()=>{
        if(tasks.length>0 || localStorage.getItem('tasks')){
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
    },[tasks])

    const addtask = (task:Omit<Task,'id'|'status'>)=>{
        const newTask: Task={
            ...task,
            id: crypto.randomUUID(),
            status: 'pending'
        }
        setTasks((prevtasks)=>[...prevtasks,newTask])
    };

    const updatetask = (id:string,updates:Partial<Task>)=>{
        setTasks(tasks.map(task=>task.id===id?{...task,...updates}:task))
    };

    const deletetask = (id:string)=>{
        setTasks(tasks.filter(task=>task.id!==id))
    }

    const [selected,setSelected] = useState<string>("dashboard")

    const options:CategoryOption[] = [
        {name:'Work', bgcolor:'bg-blue-500',color:"border-l-blue-500"},
        {name:'Personal', bgcolor:'bg-purple-500',color:"border-l-purple-500"},
        {name:'Exercise', bgcolor:'bg-green-500',color:"border-l-green-500"},
        {name:'Deep Work', bgcolor:'bg-orange-500',color:"border-l-orange-500"},
        {name:'Misc', bgcolor:'bg-red-500',color:"border-l-red-500"}
    ]

    
    

    return(
        <PlannerContext.Provider value={{tasks,selectedDate,setSelectedDate,addtask,updatetask,isFormOpen,setIsFormOpen, editingTask, setEditingTask, selected, setSelected, options, deletetask, setTasks}}>
                {children}
            </PlannerContext.Provider>
    )
    
};