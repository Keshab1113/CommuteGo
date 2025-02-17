import React from 'react'
import { TypingAnimation } from "../../components/magicui/typing-animation";
import { HyperText } from "../../components/magicui/hyper-text";

const Heading = () => {
    return (
        <div className="  w-full h-screen flex justify-center items-center sm:flex-row flex-col-reverse bg-blue-400"><video src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/header.mp4?alt=media&token=ec250b2e-12a1-433d-a937-afa21a10f5fc" muted autoPlay loop className=" object-cover w-full h-screen" />
                <div className=' absolute h-full w-full flex flex-col justify-center items-center'>
                    <h1 data-aos="fade-up" className="sm:text-6xl text-4xl font-extrabold cursor-default text-violet-50">
                        CommuteGo
                    </h1>
                    <div
                        data-aos="fade-up"
                        className="sm:text-3xl mt-5 font-extrabold cursor-default text-2xl text-white text-center"
                    >
                        <TypingAnimation>Best Way To Start Your Journey!</TypingAnimation>
                    </div>
                </div>
        </div>
    )
}

export default Heading
