import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { PlannerContext} from '../Context/PlannerContext'

const Form = () => {
    const {addtask, setIsFormOpen, selectedDate, editingTask, setEditingTask, updatetask, options } = useContext(PlannerContext)!

    const [formdata, setFormData] = useState({
        title:'', start:'',end:'',date:selectedDate,note:'',category:'Work'
    })

    useEffect(()=>{
        if(editingTask){
            const {id,status,...data} = editingTask
            setFormData(data)
        }
    },[editingTask])

    const handlechange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handlesubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(editingTask){
            updatetask(editingTask.id, formdata)
        }
        else{
            addtask(formdata)
        }
        handleclose()
    }

    const handleclose = ()=>{
        setIsFormOpen(false)
        setEditingTask(null)
        
    }
    

    
  return (
    <div className='border flex flex-col gap-5 rounded-2xl w-full max-w-md mx-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl'>
        <div className='flex justify-between border-b p-4 items-center border-slate-100 dark:border-slate-800'>
            <h1 className='text-xl font-bold text-slate-900 dark:text-white'>New Event</h1>
            <X className='text-red-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full p-1 transition-all' size={28} onClick={()=>setIsFormOpen(false)}/>
        </div>
        <div className='px-4'>
            <form action="" className='flex flex-col gap-4' onSubmit={handlesubmit}>
                <div className=''>
                    <label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-300">What needs to be done?</label>
                    <input type="text" id='title' required value={formdata.title} onChange={handlechange} className='mt-1 border w-full rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 p-2 outline-blue-400 transition-all' />
                </div>
                
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="start" className="text-sm font-medium text-slate-700 dark:text-slate-300">From</label>
                        <input type="time" required value={formdata.start} onChange={handlechange} className='mt-1 border w-full rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 p-2 outline-blue-400' id='start' />
                    </div>
                    <div>
                        <label htmlFor="end" className="text-sm font-medium text-slate-700 dark:text-slate-300">To</label>
                        <input type="time" value={formdata.end} onChange={handlechange} className='mt-1 border w-full rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 p-2 outline-blue-400' id='end' />
                    </div>
                </div>
                
                <div className=''>
                    <label htmlFor="date" className="text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                    <input type="date" id='date' required value={formdata.date} onChange={handlechange} className='mt-1 border w-full rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 p-2 outline-blue-400' />
                </div>

                <div className=''>
                    <label htmlFor="category" className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                    <select name="category" id="category" value={formdata.category} onChange={handlechange} className='mt-1 border w-full rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 p-2 outline-blue-400 cursor-pointer '>
                    {options.map((op)=>(
                        <option key={op.name} value={op.name}>{op.name}</option>
                    ))}
                    </select>
                </div>

                <div className=''>
                    <label htmlFor="note" className="text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
                    <textarea name="note" id="note" value={formdata.note} onChange={handlechange} placeholder='Add any details...' className='mt-1 border w-full rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 p-2 min-h-24 outline-blue-400 resize-none' ></textarea>
                </div>
                <div className=' pt-2 pb-6 flex justify-end gap-3'>
                    <button onClick={handleclose} className='cursor-pointer transition-all ease-in-out hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg px-4 py-2 font-medium'>Cancel</button>
                    <button type='submit' className='bg-blue-600 px-6 py-2 rounded-lg text-white cursor-pointer shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all ease-in-out font-medium'>Save Task</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Form