import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {Task} from '../Context/PlannerContext'
interface Props{
    tasks: Task[]
    startDate: string
    endDate: string
}
const WeeklyProgress: React.FC<Props> = ({tasks}) => {
    interface Details{
        completed: number
        pending: number
        total: number
    }
    const chartData = useMemo(()=>{
        const bucket:Record<string,Details>= {
            'Mon':{completed:0,pending:0,total:0},
            'Tue':{completed:0,pending:0,total:0},
            'Wed':{completed:0,pending:0,total:0},
            'Thu':{completed:0,pending:0,total:0},
            'Fri':{completed:0,pending:0,total:0},
            'Sat':{completed:0,pending:0,total:0},
            'Sun':{completed:0,pending:0,total:0}
        }
        const week = ['Mon','Tue','Wed','Thu', 'Fri', 'Sat', 'Sun']

        tasks.forEach(task=>{
            const date = new Date(task.date)
            const day = date.toLocaleDateString('en-US',{weekday:'short'})
            if(bucket[day]){
                if(task.status==='completed'){
                    bucket[day].completed++;
                }
                else{
                    bucket[day].pending++;
                }
                bucket[day].total++;
            }
        })
        return week.map(day=>({
            day,
            completed: bucket[day].completed,
            pending: bucket[day].pending,
            total: bucket[day].total
        }))
    },[tasks])
    
    const maxTasks = Math.max(...chartData.map(d => d.total)) || 5

  return (
    <div className='border p-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-700/50 shadow-md  w-full h-fit lg:w-2/3'>
        <h1 className='text-2xl font-medium'>Weekly Progress</h1>
        <div className='flex justify-between mb-4'>
            <h1 className='text-sm text-slate-400'>Tasks Completed vs. Pending</h1>
            <div className='flex gap-4 text-xs'>
                <div className='flex items-center gap-1'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <h1>Completed</h1>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full'></div>
                    <h1>Pending</h1>
                </div>
            </div>
        </div>
        
        <div className=' w-full overflow-x-auto no-scrollbar'>
            <div className='flex justify-between items-end h-48 gap-2 w-full'>
                {chartData.map((data,index) => (
                    <div key={index} className='flex flex-col items-center gap-2 flex-1 h-full justify-end group cursor-pointer'>
                            
                        {/* The Bar */}
                        <div className='w-full max-w-[40px] h-full flex flex-col justify-end rounded-t-md overflow-hidden relative bg-gray-200  dark:bg-white'>
                            
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${(data.pending / maxTasks) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className='w-full bg-slate-300 dark:bg-slate-600/50'
                            />
                            
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${(data.completed / maxTasks) * 100}%` }}
                                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                                className='w-full bg-blue-500'
                            />
                        </div>

                        <span className='text-[10px] md:text-xs font-medium text-slate-400 uppercase'>
                            {data.day}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      
    </div>
  )
}

export default WeeklyProgress