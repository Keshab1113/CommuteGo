import React, { useContext } from 'react';
import img from "/travelcomponent.jpg";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext
import { MacbookScroll } from '../../components/ui/macbook-scroll';

const About = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext); // Get dark mode state

    return (
        <div className={`h-full w-screen md:h-[150vh] flex lg:flex-row md:flex-col-reverse flex-col-reverse justify-start  ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-white to-cyan-100'}`}>
            <div className="overflow-hidden lg:w-[50vw] w-[100vw]">
                <MacbookScroll
                    src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/header.mp4?alt=media&token=ec250b2e-12a1-433d-a937-afa21a10f5fc"
                    showGradient={false}
                />
            </div>
            <div data-aos-delay="200" className="lg:w-2/4 md:w-full w-full flex justify-start items-center md:pt-40 pt-10 flex-col pb-4 md:pb-0 h-full ">
                <h1 className={`text-5xl font-bold flex justify-center items-center pt-4 pl-5 mt-10 md:mt-0 mb-4 text-cyan-400`}>
                    About Us
                </h1>
                <h1 data-aos="fade-up" className={`md:text-2xl text-xl text-center font-bold opacity-70 ${darkMode ? 'text-gray-300' : 'text-cyan-950'}`}>
                    CommuteGo wishes you a happy & safe journey.
                </h1>
                <div className={`font-semibold w-4/5 mt-10 opacity-70 space-y-4 text-center ${darkMode ? 'text-gray-300' : 'text-black'}`}>
                    <h1 data-aos="fade-up" className='opacity-90 text-xl'>
                        CommuteGo is a team of dedicated members, who are passionate about Indian Transportation Systems.
                    </h1>
                    <h1 data-aos="fade-up" className='opacity-90 text-xl'>
                        This web site (CommuteGo) is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way. Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization.
                    </h1>
                    <h1 data-aos="fade-up" className='text-xl'>
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
