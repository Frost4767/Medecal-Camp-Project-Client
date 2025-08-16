import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, NavLink } from "react-router";

export default function Footer() {
  const linkClass = "hover:text-[#00a63e] transition";

  return (
    <footer className="bg-green-900 dark:bg-gray-900 text-white py-10 px-6 md:px-20 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-green-300 dark:text-[#00a63e] mb-3">MediCamp</h2>
          <p className="text-green-100 dark:text-gray-200">
            Empowering communities through organized medical camps for better healthcare accessibility.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">Quick Links</h3>
          <ul className="space-y-2 text-green-100 dark:text-gray-200">
            <li>
              <NavLink to="/" className={linkClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/camps" className={linkClass}>Available Camps</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>About</NavLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">Contact</h3>
          <p className="mb-2 dark:text-gray-200">Email: support@medicamp.org</p>
          <p className="mb-4 dark:text-gray-200">Phone: +880-123-456-7890</p>

          {/* Social Icons */}
          <div className="flex gap-4 text-white text-xl">
            <Link to="https://facebook.com" target="_blank" className="hover:text-[#00a63e]">
              <FaFacebookF />
            </Link>
            <Link to="https://twitter.com" target="_blank" className="hover:text-[#00a63e]">
              <FaTwitter />
            </Link>
            <Link to="https://instagram.com" target="_blank" className="hover:text-[#00a63e]">
              <FaInstagram />
            </Link>
            <Link to="https://youtube.com" target="_blank" className="hover:text-[#00a63e]">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 text-center text-green-300 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} MediCamp. All rights reserved.
      </div>
    </footer>
  );
}
