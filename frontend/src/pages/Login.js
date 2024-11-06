import React, { useContext, useState } from 'react';
import loginIcons from '../assest/hello-sign.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }
        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id='login' className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600'>
            <div className='container p-4 mx-auto'>
                <div className='w-full max-w-sm p-8 mx-auto transition duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-2xl'>
                    <div className='flex justify-center mb-6'>
                        <img src={loginIcons} alt='login icon' className='w-24 h-24 border-2 border-indigo-600 rounded-full' />
                    </div>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label className='font-medium text-gray-700'>Email</label>
                            <div className='relative p-3 bg-gray-100 rounded-lg shadow-inner'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
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
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full placeholder-gray-500 bg-transparent outline-none'
                                />
                                <div className='absolute text-xl text-gray-500 cursor-pointer right-3' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='mt-2 text-sm text-right text-indigo-600 hover:underline hover:text-indigo-800'>
                                Forgot password?
                            </Link>
                        </div>

                        <button className='w-full px-4 py-2 font-semibold text-white transition duration-200 transform bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105'>
                            Login
                        </button>
                    </form>

                    <p className='mt-6 text-center text-gray-600'>
                        Don’t have an account? <Link to={"/sign-up"} className='font-medium text-indigo-600 hover:text-indigo-700 hover:underline'>Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
