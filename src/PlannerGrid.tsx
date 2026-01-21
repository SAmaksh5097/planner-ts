import React, { useContext } from 'react'
import { PlannerContext } from './Context/PlannerContext'
import { AnimatePresence } from 'framer-motion'
import Form from './Components/Form'
import TaskCard from './Components/TaskCard'

const PlannerGrid = () => {
  const { tasks, selectedDate, setSelectedDate, isFormOpen } = useContext(PlannerContext)!

  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const dailytasks = tasks
    .filter(task => task.date === selectedDate)
    .sort((a, b) => a.start.localeCompare(b.start))

  return (
    <div className='order-2 lg:order-0 w-full lg:flex-1 px-4 lg:px-10 py-5 bg-slate-100 dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 flex flex-col gap-4 items-center relative overflow-y-auto h-screen no-scrollbar'>
      
      <div className='flex gap-4 w-full justify-center lg:justify-start top-0 bg-inherit py-2 z-10'>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={changeDate} 
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg outline-none cursor-pointer"
        />
      </div>
      
      {isFormOpen && (
        <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
           <Form />
        </div>
      )}

      <div className='border rounded-2xl p-6 flex flex-col w-full bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700 h-fit mb-10'>
        <h2 className="text-xl font-bold mb-6 border-b pb-2 dark:border-slate-700 text-slate-900 dark:text-white">
          Schedule for {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
        </h2>

        {dailytasks.length > 0 ? (
          <div className="flex flex-col w-full gap-3">
            <AnimatePresence mode='popLayout'>
              {dailytasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <h1 className="text-lg">Your day is clear!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlannerGrid;