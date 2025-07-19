import { useState } from 'react'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router'


import ParticipentContainer from '../Dashbord/Participent/ParticipentContainer'
import AdminContainer from '../Dashbord/Admin/AdminContainer'
import MenuItem from './MenuItem'
import useRole from '../../Hooks/useRole'
import LoadingEle from './LoadingEle'



const Sidebar = () => {
    const [isActive, setIsActive] = useState(false)
    const {role, roleLoading} = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setIsActive(!isActive)
  }
  if (roleLoading) return <p className='font-semibold flex flex-col justify-center items-center max-h-screen'>' '</p> 
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-black/64 shadow-md text-white flex justify-between md:hidden'> 
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/5gfTyBcm/medicamp.png'
                alt='logo'
                width='30'
                height='30'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none '
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 not-md:w-48 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/5gfTyBcm/medicamp.png'
                  alt='logo'
                  width='50'
                  height='50'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
        <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              {/*  Menu Items */}
                {role === 'participent' && <ParticipentContainer></ParticipentContainer>}
                {role === 'admin' && <AdminContainer></AdminContainer>}
            </nav>
        </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard'
          />
        </div>
      </div>
    </>
  )
}

export default Sidebar