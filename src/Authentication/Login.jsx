import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import useAxios from '../Hooks/useAxios';
import { toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useAuth();
    const axiosInstance = useAxios();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        loginUser(data.email, data.password)
            .then(async (result) => {
                toast("User login successfully");
                const user = result?.user;

                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                };

                await axiosInstance.post('/user', userInfo);
                navigate(from);
            })
            .catch(error => toast("Please enter valid information"));
    }

    return (
        <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 my-12 transition-colors duration-300">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                Login Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="Email"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                    />
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1">Email is required</p>
                    )}
                </div>

                {/* Password field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        placeholder="Password"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                    />
                    {errors.password?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1">Password is required</p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className="text-red-500 text-sm mt-1">Password must be 6 characters or longer</p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition duration-200"
                >
                    Login
                </button>

                {/* Login redirect */}
                <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
                    Don't have an account yet?{' '}
                    <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Register
                    </Link>
                </p>
            </form>

            <div className="mt-6">
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
