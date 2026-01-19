import React from 'react'
import { motion } from 'framer-motion';
const MetricCard = (props) => {
    const tot = props.total;
    const com = props.completed;
    const per = tot===0?0:Math.round((com/tot)*100);

  return (
    <motion.div layout initial={{opacity:0,y:20}} animate={{opacity:1, y:0,transition: { duration: 0.5 }}} className='rounded-2xl w-full md:w-[48%] lg:w-[30%] p-5 mb-3 flex flex-col gap-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow dark:hover:shadow-neutral-600 '>
        <h1>{props.name}</h1>
        <h1><span  className='text-4xl'>{
            props.name==="Total Tasks"?com:per}</span> {props.heading}</h1>
        {
            props.name==="Completion Rate"?
            <div className='mt-1'>
                <svg width="100%" height="8" >
                    <rect x="0" y="0" width="100%" height="100%" 
                        fill="#334155" />
                    <motion.rect x="0" y="0" 
                        width={`${per}%`} height="100%" 
                        fill="#3b82f6" 
                        rx="4" ry="4" initial={{width:0}}
                        animate={{width:`${per}%`}} transition={{duration:1,ease:"easeOut"}}/>

                </svg>

            </div>
            :null
        }
    </motion.div>
  )
}

export default MetricCard
