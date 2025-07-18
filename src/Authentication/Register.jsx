import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SocialLogin from './SocialLogin';
import useAxios from '../Hooks/useAxios';
import { toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {updateUserProfile,userCreate}= useAuth();
    const axiosInstance= useAxios();

    const [profilePic, setProfilePic] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';



    const onSubmit = data => {

        userCreate(data.email, data.password)
            .then(async (result) => {
              toast("User create successfully")
                const user = result?.user;
                // update userinfo in the database
                const userInfo = {
                    name: data.name,
                    email: user?.email,
                    image: profilePic,
                    
                }
                
                const userRes = await axiosInstance.post('/user', userInfo);
                

                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        navigate(from);
                    })
            })
            .catch(error => {
                toast("Please enter a vaild information")
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        
        const formData = new FormData();
        formData.append('image', image);

        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);
    }

    return (
  <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-xl p-8 my-12">
  <h1 className="text-4xl font-bold text-center mb-6">Create Account</h1>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    {/* Name field */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
      <input
        type="text"
        {...register('name', { required: true })}
        placeholder="Your Name"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.name?.type === 'required' && (
        <p className="text-red-500 text-sm mt-1">Name is required</p>
      )}
    </div>

    {/* Profile Picture */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
      <input
        type="file"
        onChange={handleImageUpload}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

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
      Register
    </button>

    {/* Login redirect */}
    <p className="text-sm text-center mt-4">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </p>
  </form>
  <SocialLogin></SocialLogin>
</div>

    );
};

export default Register;