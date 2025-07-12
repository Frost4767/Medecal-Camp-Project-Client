import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {loginUser}= useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        loginUser(data.email, data.password)
            .then( (result) => {
                    const user = result?.user;

                    const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                    }
                    console.log(userInfo);


                navigate(from);
            })
            .catch(error => console.log(error))
    }




    return (
        <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-xl p-8 my-12">
  <h1 className="text-4xl font-bold text-center mb-6">Login Account</h1>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    
    {/* Email field */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        {...register('email', { required: true })}
        placeholder="Email"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email?.type === 'required' && (
        <p className="text-red-500 text-sm mt-1">Email is required</p>
      )}
    </div>

    {/* Password field */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        type="password"
        {...register('password', { required: true, minLength: 6 })}
        placeholder="Password"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <p className="text-sm text-center mt-4">
      Don't have an account yet?{' '}
      <Link to="/register" className="text-blue-600 hover:underline">
        Register
      </Link>
    </p>
  </form>
  <SocialLogin></SocialLogin>
</div>
    );
};

export default Login;