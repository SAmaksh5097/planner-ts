import React, { useContext, useMemo } from 'react'
import { PlannerContext } from '../Context/PlannerContext'

const Focus = ({ tasks }) => {
    const { options } = useContext(PlannerContext)

    const categoryData = useMemo(() => {
        const completedTasks = tasks.filter(t => t.status === 'completed')
        const total = completedTasks.length

        if (total === 0) return []

        let startAngle = 0
        
        return options.map(opt => {
            const count = completedTasks.filter(t => t.category === opt.name).length
            const percentage = (count / total) * 100
            
            let color = '#94a3b8'
            if(opt.name === 'Work') color = '#3b82f6'
            if(opt.name === 'Personal') color = '#a855f7'
            if(opt.name === 'Exercise') color = '#22c55e'
            if(opt.name === 'Deep Work') color = '#f97316'
            if(opt.name === 'Misc') color = '#ef4444'

            const segment = { 
                name: opt.name, 
                percentage, 
                color, 
                count 
            }
            return segment
        })
        .filter(item => item.count > 0)
        .sort((a,b) => b.count - a.count) 
    }, [tasks, options])

    const gradient = useMemo(() => {
        if(categoryData.length === 0) return 'conic-gradient(#334155 0% 100%)'
        
        let str = 'conic-gradient('
        let current = 0
        categoryData.forEach((cat, i) => {
            const end = current + cat.percentage
            str += `${cat.color} ${current}% ${end}%${i < categoryData.length - 1 ? ', ' : ''}`
            current = end
        })
        return str + ')'
    }, [categoryData])

    const totalCompleted = tasks.filter(t => t.status === 'completed').length

    return (
        <div className='border rounded-2xl p-6 w-full lg:w-1/3 flex flex-col border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-700/50 shadow-md h-full min-h-[350px]'>
            <div className='mb-6'>
                <h2 className='font-bold text-lg text-slate-900 dark:text-white'>Focus Breakdown</h2>
                <p className='text-slate-400 text-sm'>Completed tasks by category</p>
            </div>

            <div className='flex-1 flex flex-col items-center justify-center gap-8'>
                <div 
                    className='w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-none'
                    style={{ background: gradient }}
                >
                    <div className='w-32 h-32 bg-white dark:bg-[#1e293b] rounded-full flex flex-col items-center justify-center z-10'>
                        <span className='text-4xl font-bold text-slate-900 dark:text-white'>{totalCompleted}</span>
                        <span className='text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1'>Done</span>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-x-8 gap-y-4 w-full px-2'>
                    {categoryData.length > 0 ? categoryData.map(cat => (
                        <div key={cat.name} className='flex items-center gap-3'>
                            <div className='w-3 h-3 rounded-full shadow-sm' style={{backgroundColor: cat.color}}></div>
                            <div className='flex flex-col'>
                                <span className='text-sm font-bold text-slate-700 dark:text-slate-200'>
                                    {Math.round(cat.percentage)}%
                                </span>
                                <span className='text-[10px] font-medium text-slate-400 uppercase tracking-wider'>{cat.name}</span>
                            </div>
                        </div>
                    )) : (
                        <p className='text-sm text-slate-500 col-span-2 text-center italic py-4'>
                            No completed tasks yet
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Focus