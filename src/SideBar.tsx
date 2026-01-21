import Weather from './Components/Weather'
import ProductivityDial from './Components/ProductivityDial'

const SideBar: React.FC = () => {
  return (
    <div className='order-1  lg:order-none w-full lg:w-[20%] p-2 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 transition-all ease-in-out flex flex-col gap-4 '>
        <Weather/>
        <ProductivityDial/>
        
    </div>
  )
}

export default SideBar
