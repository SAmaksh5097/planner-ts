import React, { useContext } from 'react'
import Notepad from './Components/Notepad'
import { ListPlus } from 'lucide-react'
import { PlannerContext } from './Context/PlannerContext'

const QuickActions = () => {
  const {setIsFormOpen, isFormOpen, setEditingTask} = useContext(PlannerContext)

  const handleclick = ()=>{
    setIsFormOpen(true)
    setEditingTask(null)
  }
  return (
    <div className='order-last lg:order-0  h-full  w-full lg:w-[20%] p-4 flex flex-col gap-5  '>
      <div className=' flex flex-row lg:flex-col items-center justify-center p-4 gap-3 text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all' onClick={handleclick} >
        <ListPlus className='w-10 h-10'/>
        <h1>Add event/task</h1>
      </div>
      <Notepad/>
      
    </div>
  )
}

export default QuickActions
