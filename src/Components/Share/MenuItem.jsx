import { NavLink } from "react-router"

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 rounded-lg transition-colors duration-300 transform
        ${
          isActive
            ? "bg-green-200 text-black dark:bg-green-700 dark:text-gray-100"
            : "text-gray-700 dark:text-gray-100 hover:bg-green-100 dark:hover:bg-green-800 hover:text-black dark:hover:text-gray-200"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  )
}

export default MenuItem
