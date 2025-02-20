import React, { useContext } from 'react';
import img from "/travelcomponent.jpg";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

const About = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext); // Get dark mode state

    return (
        <div className={`sm:h-screen w-screen h-full flex sm:flex-row flex-col-reverse justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div data-aos="fade-up" data-aos-delay="100" className='sm:w-2/4 w-full sm:h-full h-2/4 flex justify-center items-center dark:bg-white'>
                <img src={img} alt="" className='h-[80%] w-[90%]' />
            </div>
            <div data-aos-delay="200" className={`sm:w-2/4 w-full flex justify-center items-center flex-col pb-4 md:pb-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h1 className={`text-4xl font-bold flex justify-center items-center pt-4 pl-5 mt-10 md:mt-0 mb-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-950'}`}>
                    About Us
                </h1>
                <h1 data-aos="fade-up" className={`text-sm font-bold opacity-70 ${darkMode ? 'text-white' : 'text-cyan-950'}`}>
                    CommuteGo.com wishes you a happy & safe journey.
                </h1>
                <div className={`font-semibold w-4/5 mt-10 opacity-70 space-y-4 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
                    <h1 data-aos="fade-up" className='opacity-90'>
                        CommuteGo.com is a team of dedicated members, who are passionate about Indian Transportation Systems.
                    </h1>
                    <h1 data-aos="fade-up" className='opacity-90'>
                        This web site (CommuteGo.com) is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way. Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization.
                    </h1>
                    <h1 data-aos="fade-up" className=''>
                        THE INFORMATION AVAILABLE ON THIS SITE IS FOR GENERAL INFORMATION PURPOSES.
                    </h1>
                </div>
                <div data-aos="fade-up" className='mt-4'>
                    <Button onClick={() => navigate("/about")} variant="outlined" className='w-32 h-10'>
                        Know more
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default About;
