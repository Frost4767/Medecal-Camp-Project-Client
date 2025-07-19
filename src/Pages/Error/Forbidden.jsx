import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
            <FaLock className="text-6xl text-error mb-4" />
            <h1 className="text-4xl font-bold text-error">403 - Forbidden</h1>
            <p className="text-lg text-gray-600 mt-2 max-w-md">
                Sorry, you do not have permission to access this page. Please contact an administrator if you believe this is a mistake.
            </p>

            <Link to="/" className="mt-6">
                <button className="border-2 border-green-600 px-4 py-2 rounded-xl text-black font-semibold hover:bg-green-600 hover:text-white">Go to Home</button>
            </Link>
        </div>
    );
};

export default Forbidden;