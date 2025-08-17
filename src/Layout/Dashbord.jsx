import { Outlet } from 'react-router'
import Sidebar from '../Components/Share/Sidebar'
import { ToastContainer } from 'react-toastify'



const Dashboard = () => {
  return (
    <div className='relative min-h-screen md:flex bg-background'>
      {/* Left Side: Sidebar Component */}
      <Sidebar /> 
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Dashboard