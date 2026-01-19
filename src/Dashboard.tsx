import React from 'react'
import SideBar from './SideBar'
import PlannerGrid from './PlannerGrid'
import QuickActions from './QuickActions'

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row flex-1 items-stretch bg-transparent dark:bg-gray-600 w-full ">
        <SideBar/>
        <PlannerGrid/>
        <QuickActions/>
    </div>
  )
}

export default Dashboard
