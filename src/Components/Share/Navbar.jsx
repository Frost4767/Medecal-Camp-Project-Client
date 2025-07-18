import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import LoadingEle from "./LoadingEle";
import { toast } from "react-toastify";


export default function Navbar() {
  const {user,logoutUser,loading} = useAuth()
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMobileDropdown = () => setIsMobileDropdownOpen(!isMobileDropdownOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);
  const users = {
  name: user?.displayName,
  photo: user?.photoURL
  };

  const hundleLog= ()=>{
    logoutUser()
    toast("Logout successfully")
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold"
      : "hover:text-green-600 transition";
  
  if(loading){
        <LoadingEle></LoadingEle>
        return;
    }
  
  return (
    <div className="z-50 bg-black/64 shadow-md  mx-auto px-2 md:px-12 lg:px-16 xl:px-24 sticky top-0">
    <nav className=" py-5 flex items-center justify-between relative ">
      {/* Left Logo (desktop only) */}
      <div className="hidden md:flex items-center  text-xl font-bold text-green-600">
        <img className=' sm:size-10 ' src="https://i.ibb.co/5gfTyBcm/medicamp.png" alt="" />
        <span className="text-3xl text-white" >Medi<span className="text-green-600">Camp</span></span>
        
      </div>

      {/* Mobile Hamburger (left) */}
      <div className="md:hidden relative">
        <button onClick={toggleMobileDropdown}>
          {isMobileDropdownOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl text-white" />
          )}
        </button>

        {isMobileDropdownOpen && (
          <div className="absolute left-0 top-14 bg-white shadow-lg rounded w-60 p-4 text-sm space-y-3 z-50">
            <ul className="text-gray-800 font-medium space-y-2">
              <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to="/camps" className={navLinkClass}>Available Camps</NavLink></li>
              <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
              {!user && (
                <li><NavLink to="/login" className={navLinkClass}>Join Us</NavLink></li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Center Menu */}
      <ul className="hidden md:flex gap-6 text-white font-medium">
        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
        <li><NavLink to="/camps" className={navLinkClass}>Available Camps</NavLink></li>
        <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
      </ul>

      {/* Right side: Join Us or Profile */}
      <div className="flex items-center gap-4 relative">
        {!user ? (
          <NavLink to="/login">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition hidden md:block">
              Join Us
            </button>
          </NavLink>
        ) : (
          <div className="relative">
            <img
              onClick={toggleProfileMenu} 
              src={users.photo}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-green-600"
            />
            
            
            <FaBars
              size={16}
              className="absolute bottom-1 right-8 bg-white text-green-500 text-xs p-0.5 rounded-full border shadow cursor-pointer"
              style={{ transform: "translate(30%, 30%)" }}
              onClick={toggleProfileMenu}
            />

            {isProfileOpen && (
              <div className="absolute right-0 mt-5 bg-white shadow-lg rounded w-48 p-4 text-sm space-y-2 z-50">
                <p className="font-semibold text-green-500">{users.name}</p>
                <hr />
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink> 
                <button onClick={hundleLog} className="text-left w-full hover:text-red-500">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
    </div>
  );
}
