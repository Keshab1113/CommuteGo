import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { Carousel } from 'flowbite-react';
import { toast } from "react-toastify";
import EastIcon from '@mui/icons-material/East';

const Login = () => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({
                    email: "",
                    password: "",
                });
                navigate("/admin");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            toast.error("Login error: ", error);
        }
    }

    return (
        <div className=' h-[100vh] flex justify-start bg-white dark:bg-slate-950'>
            <form onSubmit={handleSubmit} className=' border h-full sm:w-[25%] w-[100%] flex flex-col justify-center items-center shadow bg-slate-100 dark:bg-slate-900 dark:border-slate-950'>
                <h1 className=' text-center text-3xl font-bold text-blue-700 dark:text-white mb-5'>Log in to your account</h1>
                <div className=' w-[90%] mb-6'>
                    <h1 className=' text-lg font-bold mb-4 dark:text-white'>Enter Email Address</h1>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        className=' w-full dark:bg-white rounded-md'
                        name='email'
                        value={user.email}
                        onChange={handleInput}
                    />
                </div>
                <div className=' w-[90%] '>
                    <h1 className=' text-lg font-bold mb-4 dark:text-white'>Enter Your Password</h1>
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        className=' w-full dark:bg-white rounded-md'
                        name='password'
                        value={user.password}
                        onChange={handleInput}
                    />
                </div>
                <div className=' w-[90%] mt-4'>
                    <h1 className=' text-blue-700 cursor-pointer font-semibold dark:text-white hover:dark:text-slate-500 w-max mb-4'>Forgot Password?</h1>
                </div>
                <Button variant="outlined" type='submit' sx={{ 'BackgroundColor': 'white' }}>Login</Button>
                <div className='w-[90%] mt-4'>
                    <Link to={'/signup'} className='hover:text-blue-700 font-semibold dark:text-white hover:dark:text-slate-500'>
                        <button>Create a new account?</button>
                    </Link>
                </div>
            </form>
            <div className=' w-[75%] bg-slate-200 sm:flex hidden'>
                <Carousel className=''>
                    <div className=' h-full w-full relative'>
                        <div className='absolute w-[50%] pl-20 pt-5'>
                            <h1 className=' text-3xl font-bold capitalize pb-10'>Heading of the login page and it is the demo heading</h1>
                            <h3 className=' text-xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt, vero laborum asperiores laboriosam blanditiis esse harum expedita voluptatum, facere quam eos, libero dolorum deleniti molestias architecto excepturi optio aliquid?</h3>
                            <button className=' mt-4 flex justify-center items-center'><h1 className=' border-b-2 border-black mr-4'>Learn more</h1><EastIcon className=' text-sm' /></button>
                        </div>
                        <img src="https://png.pngtree.com/background/20220729/original/pngtree-vector-illustration-hi-tech-digital-technology-design-colorful-on-circuit-board-picture-image_1866785.jpg" alt="..." className=' h-full w-full' />
                    </div>
                    <div className=' h-full w-full relative'>
                        <div className='absolute w-[50%] pl-20 pt-5'>
                            <h1 className=' text-3xl font-bold capitalize pb-10'>Heading of the login page and it is the demo heading</h1>
                            <h3 className=' text-xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt, vero laborum asperiores laboriosam blanditiis esse harum expedita voluptatum, facere quam eos, libero dolorum deleniti molestias architecto excepturi optio aliquid?</h3>
                            <button className=' mt-4 flex justify-center items-center'><h1 className=' border-b-2 border-black mr-4'>Learn more</h1><EastIcon className=' text-sm' /></button>
                        </div>
                        <img src="https://img.freepik.com/free-vector/white-technology-background_23-2148403821.jpg" alt="..." className=' h-full w-full' />
                    </div>
                    <div className=' h-full w-full relative'>
                        <div className='absolute w-[50%] pl-20 pt-5'>
                            <h1 className=' text-3xl font-bold capitalize pb-10'>Heading of the login page and it is the demo heading</h1>
                            <h3 className=' text-xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt, vero laborum asperiores laboriosam blanditiis esse harum expedita voluptatum, facere quam eos, libero dolorum deleniti molestias architecto excepturi optio aliquid?</h3>
                            <button className=' mt-4 flex justify-center items-center'><h1 className=' border-b-2 border-black mr-4'>Learn more</h1><EastIcon className=' text-sm' /></button>
                        </div>
                        <img src="https://img.freepik.com/free-vector/white-technology-background_23-2148403821.jpg" alt="..." className=' h-full w-full' />
                    </div>
                    <div className=' h-full w-full relative'>
                        <div className='absolute w-[50%] pl-20 pt-5'>
                            <h1 className=' text-3xl font-bold capitalize pb-10'>Heading of the login page and it is the demo heading</h1>
                            <h3 className=' text-xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt, vero laborum asperiores laboriosam blanditiis esse harum expedita voluptatum, facere quam eos, libero dolorum deleniti molestias architecto excepturi optio aliquid?</h3>
                            <button className=' mt-4 flex justify-center items-center'><h1 className=' border-b-2 border-black mr-4'>Learn more</h1><EastIcon className=' text-sm' /></button>
                        </div>
                        <img src="https://png.pngtree.com/background/20220729/original/pngtree-vector-illustration-hi-tech-digital-technology-design-colorful-on-circuit-board-picture-image_1866785.jpg" alt="..." className=' h-full w-full' />
                    </div>


                </Carousel>
            </div>
        </div>
    )
}

export default Login