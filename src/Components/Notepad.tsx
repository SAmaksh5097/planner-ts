import React, { useEffect, useState } from 'react'

const Notepad = () => {
    const [data,setData] = useState(localStorage.getItem("data")||"")
    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setData(e.target.value)
    }
    useEffect(()=>{
        localStorage.setItem("data",data)
    },[data])

    const clear = ()=>{
        setData("")
        localStorage.setItem("data","")
    }




  return (
    <div className='h-full '>
        <div className='flex justify-between items-center'>
            <h1>SCRATCHPAD</h1>
            <button className='text-xs text-blue-400 cursor-pointer' onClick={clear}>Clear</button>
        </div>

        <textarea name="note" id="" value={data} onChange={handleChange} placeholder='Write your notes...' className='border w-[100%] rounded-2xl  text-black p-1 resize-none   dark:text-slate-200   bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-400 transition-all ease-in-out '>

        </textarea>
      
    </div>
  )
}

export default Notepad
