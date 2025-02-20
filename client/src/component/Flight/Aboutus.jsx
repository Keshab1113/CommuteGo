import React, { useContext } from 'react';
import img from "/back2.png";
import { ThemeContext } from '../../context/ThemeContext'; 

const Aboutus = () => {
    const { darkMode } = useContext(ThemeContext); 

    return (
        <div
            className={`sm:h-screen h-full flex sm:flex-row flex-col-reverse justify-center ${
                darkMode ? 'bg-gray-900' : 'bg-slate-100'
            }`}
        >
            <div className="sm:w-2/4 w-full sm:h-full h-2/4 flex justify-center items-center">
                <img src={img} alt="" className="h-[80%] w-[90%]" />
            </div>
            <div className="sm:w-2/4 w-full flex justify-center items-center flex-col">
                <h1
                    className={`text-4xl font-bold flex justify-center items-center pt-4 pl-5 ${
                        darkMode ? 'text-white' : 'text-cyan-950'
                    }`}
                >
                    About Us
                </h1>
                <div
                    className={`font-semibold w-4/5 mt-10 opacity-70 space-y-4 ${
                        darkMode ? 'text-gray-300' : 'text-black'
                    }`}
                >
                    <h1>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Voluptates neque magnam, maxime minus eligendi beatae
                        recusandae perspiciatis temporibus ab, nesciunt repudiandae
                        aspernatur perferendis reiciendis...
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;
