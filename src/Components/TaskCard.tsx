import React, { useContext } from 'react';
import { Clock, AlignLeft, PencilIcon, CircleCheckBig, Trash2 } from 'lucide-react';
import { PlannerContext, Task } from '../Context/PlannerContext';
import { motion } from 'framer-motion';

interface Props {
  task: Task;
  ref?: React.Ref<HTMLDivElement>;
}

const TaskCard = ({ task, ref }: Props) => {
  const { updatetask, setIsFormOpen, setEditingTask, options, deletetask } = useContext(PlannerContext)!

  const handedit = () => {
    setIsFormOpen(true)
    setEditingTask(task)
  }
  const completed = task.status === 'completed'

  const categoryconfig = options.find(cat => cat.name === task.category)

  return (
    <motion.div
      ref={ref} 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, transition: { duration: 0.7} }}
      className={`w-full p-4 flex flex-col gap-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-t-slate-600 dark:border-b-slate-600 dark:border-r-slate-600 rounded-xl hover:shadow-md transition-shadow dark:hover:shadow-neutral-600 ${categoryconfig?.color} border-l-6 `}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-bold text-lg text-slate-900 dark:text-white capitalize ${completed ? 'line-through' : ''}`}>
          {task.title}
        </h3>
        <div className='flex gap-5'>
          <CircleCheckBig className={`cursor-pointer hover:scale-120 transition-all ease-in-out ${completed ? 'text-green-500' : ''}`} onClick={() => { updatetask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' }) }} />
          <PencilIcon onClick={handedit} className='cursor-pointer hover:scale-120 transition-all ease-in-out' />
          <Trash2 className='cursor-pointer hover:scale-120 transition-all ease-in-out' onClick={() => deletetask(task.id)} />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{task.start} — {task.end || 'No end time'}</span>
        </div>
        {task.note && (
          <div className="flex items-start gap-2">
            <AlignLeft className="w-4 h-4 mt-1" />
            <p className="line-clamp-2 italic">{task.note}</p>
          </div>
        )}
      </div>
      <div className='flex items-center gap-1'>
        <div className={`w-2 h-2 rounded-full ${categoryconfig?.bgcolor}`}></div>
        <h1 className='text-sm text-slate-600 dark:text-slate-400 italic'>{task.category}</h1>
      </div>
    </motion.div>
  );
};

export default TaskCard;