import React, { useContext, useEffect } from 'react'
import ThemeToggle from './Components/ThemeToggle'
import {CalendarCheck2} from 'lucide-react'
import MenuButton from './Components/MenuButton'
import { Link, useLocation } from 'react-router-dom'
import { PlannerContext } from './Context/PlannerContext'
const Header = () => {
  const {setSelected} = useContext(PlannerContext)
  const location = useLocation()
  useEffect(()=>{
    if(location.pathname==='/analytics'){
      setSelected("analytics")
    }
    else{
      setSelected("dashboard")
    }
  },[location,setSelected])
  return (
    
    <div className='h-fit w-full flex flex-row flex-wrap justify-between items-center p-3 gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-200/50'>
      <Link to={'/'}>
        <h1 className=' text-xl md:text-2xl font-bold flex gap-2 items-center '>{<CalendarCheck2 className=' rounded w-10 h-10 text-blue-600 dark:text-blue-400'/>} Daily Planner</h1>
      </Link>
      <div className=' flex gap-3 md:gap-5 items-center'>
          <div className='flex gap-2 md:gap-5'>
            <Link to={'/'}>
              <MenuButton name="Dashboard"/>
            </Link>
            <Link to={'/analytics'}>
              <MenuButton name="Analytics"/>
            </Link>
          </div>
          <ThemeToggle/>
      </div>
    </div>
  )
}

export default Header
