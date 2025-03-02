import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faTrain, faBus, faTrainTram } from '@fortawesome/free-solid-svg-icons'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Swal from "sweetalert2";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IconCloud } from "../components/magicui/icon-cloud";
import { ThemeContext } from '../context/ThemeContext';
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";


const Service = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const testimonials = [
    {
      quote:
        "Kolkata, also known as Calcutta. It lies on the eastern bank of the Hooghly River. It is the primary financial and commercial centre of eastern and northeastern India.",
      name: "Kolkata",
      designation: "The capital of West Bengal",
      src: "https://www.holidify.com/images/bgImages/KOLKATA.jpg",
    },
    {
      quote:
        "Delhi is famous for its history and historical places like Red Fort and Qutub Minar.",
      name: "Delhi",
      designation: "The capital of India",
      src: "https://www.holidify.com/images/bgImages/DELHI.jpg",
    },
    {
      quote:
        "Popular among them: 'Queen of the Deccan', 'Cultural capital of Maharashtra', and 'Oxford of the East'.",
      name: "Pune",
      designation: "It has been known by a plethora of sobriquets.",
      src: "https://www.holidify.com/images/bgImages/PUNE.jpg",
    },
    {
      quote:
        "It had once flourished as a global center for trade of rare diamonds, emeralds as well as natural pearls.",
      name: "Hyderabad",
      designation: "It is known as the City of Pearls",
      src: "https://www.holidify.com/images/bgImages/HYDERABAD.jpg",
    },
    {
      quote:
        "The city is dotted with lush green spaces such as Lalbagh Botanical Garden and Cubbon Park.",
      name: "Bangalore",
      designation: "The Garden City of India",
      src: "https://www.holidify.com/images/bgImages/BANGALORE.jpg",
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className= {`h-full md:py-20 py-10 flex sm:flex-row flex-col-reverse ${darkMode ? 'bg-[#070707]' : 'bg-gradient-to-b from-white to-cyan-100'}`}>
      <div className=' w-full flex items-center justify-center flex-col'>
        <h1 className={` text-4xl font-semibold  text-center mb-4 text-cyan-400`}>Explore all corners of the world with us.</h1>
        <h2 className={` text-lg font-semibold opacity-90 ${darkMode ? 'text-cyan-400' : 'text-cyan-950'}`}>Have you not found the right one?</h2>
        <h2 className={` text-lg font-semibold opacity-90 ${darkMode ? 'text-cyan-400' : 'text-cyan-950'}`}>Find a service suitable for you here.</h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  )
}

export default Service
