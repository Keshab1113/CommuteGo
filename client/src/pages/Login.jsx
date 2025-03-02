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
        console.log(import.meta.env.VITE_API_URL);
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
        <div className=' h-screen flex justify-center items-center my-auto bg-black bg-grid-white/[0.2] relative'>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <form onSubmit={handleSubmit} className=' border h-fit lg:w-[50%] w-[90%] py-20 rounded-xl flex flex-col justify-center items-center shadow bg-white glass'>
                <h1 className=' text-center text-4xl font-semibold text-cyan-400 mb-5'>Log in to your account</h1>
                <div className=' w-[90%] mb-6'>
                    <h1 className=' text-lg font-bold mb-4 text-white'>Enter Email Address</h1>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        className=' w-full bg-white rounded-md border-white text-white border-solid border'
                        name='email'
                        value={user.email}
                        onChange={handleInput}
                    />
                </div>
                <div className=' w-[90%] '>
                    <h1 className=' text-lg font-bold mb-4 text-white'>Enter Your Password</h1>
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        className=' w-full bg-white rounded-md'
                        name='password'
                        value={user.password}
                        onChange={handleInput}
                    />
                </div>
                <div className=' w-[90%] mt-4'>
                    <h1 className=' hover:text-blue-700 cursor-pointer font-semibold text-white  w-max mb-4'>Forgot Password?</h1>
                </div>
                <button type='submit' className='w-[50%] border-white border text-white py-3 rounded-xl hover:text-cyan-400 font-extrabold hover:bg-black'>Login</button>
                <div className='w-[90%] mt-4 flex gap-1 text-white'>
                <h1>Don't have an account?</h1>{" "}
                    <Link to={'/signup'} className='hover:text-blue-700 font-semibold text-white'>
                        <button>Sign up</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login