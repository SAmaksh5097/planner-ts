import React, { useContext } from 'react'
import { PlannerContext } from '../Context/PlannerContext';
interface Props{
  name:string
}
const MenuButton: React.FC<Props> = (props:Props) => {
    const menu = props.name;
    const {selected, setSelected} = useContext(PlannerContext)!
    
    const handlechange = ()=>{
        setSelected(menu.toLowerCase());
    }
  return (
    <div className={`p-2  rounded-md text-center ${selected===menu.toLowerCase()?"bg-gradient-to-br from-blue-600 to-indigo-900 text-white opacity-90":""} transition-all ease-in-out cursor-pointer hover:bg-gray-500 `} onClick={handlechange}>
        <h1>{props.name}</h1>
      
    </div>
  )
}

export default MenuButton
