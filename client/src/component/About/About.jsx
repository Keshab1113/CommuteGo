import React from 'react'
import img from "/travelcomponent.jpg";
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


const About = () => {
    const navigate = useNavigate();
    return (
        <div className='sm:h-screen h-full flex bg-white sm:flex-row flex-col-reverse justify-center'>
            <div data-aos="fade-up" data-aos-delay="100" className=' sm:w-2/4 w-full sm:h-full h-2/4 flex justify-center items-center'>
                <img src={img} alt="" className=' h-[80%] w-[90%]' />
            </div>
            <div data-aos-delay="200" className=' sm:w-2/4 w-full bg-white  flex justify-center items-center flex-col'>
                <h1 className=' text-4xl text-cyan-950 font-bold flex justify-center items-center pt-4 pl-5'>About Us</h1>
                <h1 data-aos="fade-up" className=' text-sm text-cyan-950 font-bold opacity-70'>CommuteGo.com wishes you a happy & safe journey.</h1>
                <div className='  text-black font-semibold  w-4/5 mt-10 opacity-70 space-y-4'>
                    <h1 data-aos="fade-up" className=' opacity-90'>
                        CommuteGo.com is a team of dedicated members, who are passionate about Indian Transportation Systems.
                    </h1>
                    <h1 data-aos="fade-up" className=' opacity-90'>
                        This web site (CommuteGo.com) is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way. Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization.
                    </h1>
                    <h1 data-aos="fade-up" className=''>
                        THE INFORMATION AVAILABLE ON THIS SITE IS FOR GENERAL INFORMATION PURPOSES.
                    </h1>
                </div>
                <div data-aos="fade-up" className=' mt-4'>
                    <Button onClick={() => navigate("/about")} variant="outlined" className=' w-32 h-10'>Know more</Button>
                </div>
            </div>

        </div>
    )
}

export default About
