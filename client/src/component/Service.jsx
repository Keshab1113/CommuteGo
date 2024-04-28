import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faTrain, faBus, faTrainTram } from '@fortawesome/free-solid-svg-icons'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Swal from "sweetalert2";
import { Route, Routes, useNavigate } from "react-router-dom";


const Service = () => {
    const navigate = useNavigate();

    const shoot = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "We are Working on this features...",
        });
    };

    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div className=' h-full sm:py-0 py-6 sm:h-[70vh] flex sm:flex-row flex-col-reverse servicebackground'>
            <div className=' w-full flex items-center justify-center flex-col'>
                <h1 className=' text-4xl font-semibold text-white text-center mb-4'>Explore all corners of the world with us.</h1>
                <h2 className=' text-lg font-semibold opacity-90 text-white'>Have you not found the right one?</h2>
                <h2 className=' text-lg font-semibold opacity-90 text-white'>Find a service suitable for you here.</h2>
                <div className=' w-9/12 flex sm:flex-row flex-col justify-around mt-8 h-[30%]'>
                    <div className=' flex justify-center items-center flex-col'>
                        <button onClick={() => navigate("/bus")} className='serviceOptions'><FontAwesomeIcon icon={faBus} className=' text-4xl' /></button><h1 className=' text-lg font-semibold text-white'>Bus</h1>
                    </div>
                    <div className=' flex justify-center items-center flex-col'>
                        <div onClick={shoot} className='serviceOptions'><FontAwesomeIcon icon={faTrain} className=' text-4xl' /></div><h1 className=' text-lg font-semibold text-white'>Train</h1>
                    </div>
                    <div className=' flex justify-center items-center flex-col'>
                        <div onClick={shoot} className='serviceOptions'><FontAwesomeIcon icon={faTrainTram} className=' text-4xl' /></div><h1 className=' text-lg font-semibold text-white'>Metro</h1>
                    </div>
                    <div className=' flex justify-center items-center flex-col'>
                        <div onClick={shoot} className='serviceOptions'><FontAwesomeIcon icon={faPlane} className=' text-4xl rotate-[-90deg]' /></div><h1 className=' text-lg font-semibold text-white'>Flight</h1>
                    </div>
                    <div className=' flex justify-center items-center flex-col'>
                        <div onClick={shoot} className='serviceOptions'><FontAwesomeIcon icon={faTrainTram} className=' text-4xl' /></div><h1 className=' text-lg font-semibold text-white'>Tram</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service
