import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file);
        setData((prev) => ({ ...prev, profilePic: imagePic }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            });
            const dataApi = await dataResponse.json();
            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate("/login");
            }
            if (dataApi.error) {
                toast.error(dataApi.message);
            }
        } else {
            toast.error("Please check password and confirm password");
        }
    };

    return (
        <section id='signup' className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600'>
            <div className='container p-4 mx-auto'>
                <div className='w-full max-w-sm p-8 mx-auto transition duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-2xl'>
                    <div className='flex justify-center mb-6'>
                        <div className='relative w-24 h-24 overflow-hidden border-2 border-black rounded-full'>
                            <img src={data.profilePic || loginIcons} alt='profile pic' className='object-cover w-full h-full' />
                            <label className='absolute w-full py-1 text-xs text-center bg-gray-300 bg-opacity-75 cursor-pointer bottom-2'>
                                Upload Photo
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </div>
                    </div>

                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label className='font-medium text-gray-700'>Name</label>
                            <div className='p-3 bg-gray-100 rounded-lg shadow-inner'>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full placeholder-gray-500 bg-transparent outline-none'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label className='font-medium text-gray-700'>Email</label>
                            <div className='p-3 bg-gray-100 rounded-lg shadow-inner'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full placeholder-gray-500 bg-transparent outline-none'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label className='font-medium text-gray-700'>Password</label>
                            <div className='relative flex items-center p-3 bg-gray-100 rounded-lg shadow-inner'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter your password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full placeholder-gray-500 bg-transparent outline-none'
                                />
                                <div className='absolute text-xl text-gray-500 cursor-pointer right-3' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label className='font-medium text-gray-700'>Confirm Password</label>
                            <div className='relative flex items-center p-3 bg-gray-100 rounded-lg shadow-inner'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Confirm your password'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full placeholder-gray-500 bg-transparent outline-none'
                                />
                                <div className='absolute text-xl text-gray-500 cursor-pointer right-3' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <button className='w-full px-4 py-2 mt-6 font-semibold text-white transition duration-200 transform bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105'>
                            Sign Up
                        </button>
                    </form>

                    <p className='mt-6 text-center text-gray-600'>
                        Already have an account? <Link to={"/login"} className='font-medium text-indigo-600 hover:text-indigo-700 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
