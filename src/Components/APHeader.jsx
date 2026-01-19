import { Calendar, ChartColumn } from 'lucide-react'
import React from 'react'

const APHeader = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className='border-b pb-4 border-slate-200 dark:border-gray-600 transition-colors'>
        <div className='flex gap-4 items-center text-sm font-bold text-slate-400'> 
            <ChartColumn className='rounded w-10 h-10 text-blue-600 dark:text-blue-400 bg-slate-200 dark:bg-slate-800 p-2' />
            <h1>ANALYTICS DASHBOARD</h1>
        </div>
        <div className='flex md:flex-row justify-between items-center md:items-end mt-2 gap-4'>
            <div className=''>
                <h1 className='text-3xl md:text-4xl font-medium text-slate-900 dark:text-white'>Productivity Analytics</h1>
            </div>
            <div className='flex gap-2 items-center bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm'>
                <div className='flex flex-col px-2'>
                    <label className='text-[10px] text-slate-500 font-bold uppercase'>From</label>
                    <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 cursor-pointer'
                    />
                </div>
                <div className='w-[1px] h-8 bg-slate-200 dark:bg-slate-700'></div>
                <div className='flex flex-col px-2'>
                    <label className='text-[10px] text-slate-500 font-bold uppercase'>To</label>
                    <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 cursor-pointer'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default APHeader