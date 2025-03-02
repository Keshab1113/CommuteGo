import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";


const Signup = () => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    const [user, setUser] = useState({
        username: "",
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
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
                    username: "",
                    email: "",
                    password: "",
                });
                toast.success("Signup Successfully.")
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("register error: ", error);
        }

    }


    return (
        <div className='h-screen flex justify-center items-center my-auto bg-black bg-grid-white/[0.2] relative'>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <form onSubmit={handleSubmit} className=' border h-[70%] lg:w-[50%] w-[90%] rounded-xl p-2 flex flex-col justify-center items-center shadow bg-white dark:bg-slate-900 dark:border-slate-950'>
                <h1 className=' text-center text-4xl font-semibold text-cyan-400 dark:text-white mb-5'>Signup with new account</h1>
                <div className='flex flex-col gap-4 mb-5 w-[90%]'>
                    <div className=''>
                        <h1 className=' text-lg font-bold mb-4 dark:text-white'>Username</h1>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            className=' dark:bg-white rounded-md w-full'
                            name='username'
                            value={user.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div className=''>
                        <h1 className=' text-lg font-bold mb-4 dark:text-white'>Enter Email Address</h1>
                        <TextField
                            required
                            name='email'
                            id="outlined-email-input"
                            label="Email"
                            className=' dark:bg-white rounded-md w-full'
                            value={user.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className=' '>
                        <h1 className=' text-lg font-bold mb-4 dark:text-white'>Enter Password</h1>
                        <TextField
                            required
                            name='password'
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            className=' w-full dark:bg-white rounded-md'
                            value={user.password}
                            onChange={handleInput}
                        />
                    </div>

                </div>
                <Button variant="outlined" type='submit' className=' w-[50%]'>Signup</Button>
                <div className=' flex dark:text-white mt-2 w-[90%]'>
                    <h1>Already have an account?</h1>
                    <Link to={'/login'} className='hover:text-blue-700 font-semibold'>
                        <button>Login</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup