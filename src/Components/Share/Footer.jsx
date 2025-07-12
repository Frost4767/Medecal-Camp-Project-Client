import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, NavLink } from "react-router";


export default function Footer() {
  const linkClass = "hover:text-green-400 transition";

  return (
    <footer className="bg-green-900 text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-green-300 mb-3">MediCamp</h2>
          <p className="text-green-100">
            Empowering communities through organized medical camps for better healthcare accessibility.
          </p>
        </div>

        {/* Column 2: Quick Links (Using NavLink) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-green-100">
            <li>
              <NavLink to="/" className={linkClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/camps" className={linkClass}>Available Camps</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={linkClass}>Join Us</NavLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-green-100 mb-2">Email: support@medicamp.org</p>
          <p className="text-green-100 mb-4">Phone: +880-123-456-7890</p>

          {/* Social Icons */}
          <div className="flex gap-4 text-white text-xl">

            <Link to="https://facebook.com" target="_blank"  className="hover:text-green-400">
              <FaFacebookF />
            </Link>

            <Link to="https://twitter.com" target="_blank"  className="hover:text-green-400">
              <FaTwitter />
            </Link>

            <Link to="https://instagram.com" target="_blank"  className="hover:text-green-400">
              <FaInstagram />
            </Link>

            <Link to="https://youtube.com" target="_blank"  className="hover:text-green-400">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 text-center text-green-300 text-sm">
        © {new Date().getFullYear()} MediCamp. All rights reserved.
      </div>
    </footer>
  );
}