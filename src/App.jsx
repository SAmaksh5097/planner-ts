import AnalyticsPage from "./AnalyticsPage"
import Dashboard from "./Dashboard"
import Header from "./Header"
import {Route, Routes} from 'react-router-dom'
function App() {
  return (
      <div className="min-h-screen max-h-full flex flex-col transition-all ease-in-out bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Header/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/analytics' element={<AnalyticsPage/>}/>
        </Routes>
      </div>
  )
}

export default App
