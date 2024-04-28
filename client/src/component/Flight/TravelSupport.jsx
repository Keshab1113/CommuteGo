import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '/cartoon.jpg';
import {
    faHandHoldingMedical,
    faRoute,
    faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const TravelSupport = () => {
    return (

        <div className=' h-full sm:h-screen flex w-full sm:flex-row flex-col'>

            <div className=' w-full sm:w-2/4 h-full flex justify-center items-center flex-col'>
                <h1 className=' text-4xl font-semibold text-cyan-950 pt-5 pl-5 text-center'>Why Should You Choose Us</h1>
                <h2 className=' text-xl opacity-90 pl-4 text-center'>We have extensive knowledge and experience in the travel industry.</h2>
                <div className=' w-9/12 mt-10 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faHandHoldingMedical} className=" text-5xl text-cyan-500" />
                    <div className=' pl-6'>
                        <h1 className=' text-xl font-semibold'>Safety and support</h1>
                        <p className=' opacity-70'>Our top priority is the safety and well-being of our clients. We maintain high safety standards and have emergency support.</p>
                    </div>
                </div>
                <div className=' w-9/12 mt-6 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faRoute} className=" text-5xl text-cyan-500" />
                    <div className=' pl-6'>
                        <h1 className=' text-xl font-semibold'>Diverse Range of Destinations</h1>
                        <p className=' opacity-70'>Whether it's a domestic tour or an international adventure, we cover a wide range of destinations to cater to different interests and preferences.</p>
                    </div>
                </div>
                <div className=' w-9/12 mt-6 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faHeadset} className=" text-5xl text-cyan-500" />
                    <div className=' pl-6'>
                        <h1 className=' text-xl font-semibold'>24/7 Customer Support</h1>
                        <p className=' opacity-70'>Our dedicated customer support team is available round the clock to address any queries or concerns before, during, and after the journey.</p>
                    </div>
                </div>
            </div>
            <div className=' w-11/12 sm:w-2/4 sm:h-full h-2/4 flex justify-center items-center'>
                <img src={img} alt="" className=' h-[80%] w-[80%]' />
            </div>
        </div>

    )
}

export default TravelSupport