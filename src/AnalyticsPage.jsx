import React, { useContext, useMemo, useState } from 'react'
import { PlannerContext } from './Context/PlannerContext'
import APHeader from './Components/APHeader'
import MetricCard from './Components/MetricCard'
import { motion, AnimatePresence } from 'framer-motion'
import WeeklyProgress from './Components/WeeklyProgress'
import Focus from './Components/Focus'

const AnalyticsPage = () => {
  
  const {tasks} = useContext(PlannerContext)
  const [startDate, setStartDate] = useState(()=>{
    const d = new Date()
    d.setDate(d.getDate()-7)
    return d.toISOString().split('T')[0]
  })
  const [endDate,setEndDate] = useState(new Date().toISOString().split('T')[0])

  const filtertask = useMemo(()=>{
    return tasks.filter(task=>{
      return task.date>=startDate && task.date<=endDate
    },[tasks,startDate,endDate])
  })

  const total = filtertask.length;
  const completed = filtertask.filter(task=>task.status==="completed").length;
    
  return (
    <div className='flex-1 w-full overflow-y-auto px-4 py-6 flex flex-col gap-6 bg-white dark:bg-slate-800 transition-colors duration-300 '>
      <APHeader startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate}/>
      <div className=' justify-evenly gap-4 flex flex-col md:flex-row'>
        <AnimatePresence mode='popLayout'>
          <MetricCard name="Total Tasks" total = {total} completed={completed} heading="tasks completed"/>
          <MetricCard name="Completion Rate" total = {total} completed={completed} heading="%"/>
        </AnimatePresence>
      </div>
      <div className=' w-full flex flex-col lg:flex-row justify-center items-center gap-5'>
        <WeeklyProgress startDate={startDate} endDate={endDate} tasks={filtertask}/>
        <Focus tasks={filtertask}/>
      </div>

        
    </div>
  )
}

export default AnalyticsPage
