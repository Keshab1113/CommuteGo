import React from 'react'
import { motion } from 'framer-motion';
import { TypingAnimation } from "../../components/magicui/typing-animation";
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Heading = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/header.mp4?alt=media&token=ec250b2e-12a1-433d-a937-afa21a10f5fc"
                    muted
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141313] via-[#141313]/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
                >
                    <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">
                        CommuteGo
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-3xl font-bold text-gray-300 mb-8"
                >
                    <TypingAnimation className='text-xl md:text-2xl'>
                        Best Way To Start Your Journey!
                    </TypingAnimation>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <NavLink
                        to="/bus"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
                    >
                        Book Now
                        <ArrowRight className="w-5 h-5" />
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                    >
                        Learn More
                    </NavLink>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-sm text-gray-400">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-3 bg-gray-400 rounded-full mt-1"
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Heading
