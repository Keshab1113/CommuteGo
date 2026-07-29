import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Bus, Clock, ArrowRight, Award, Shield, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { MacbookScroll } from '../../components/ui/macbook-scroll';

const About = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-[#141313]' : 'bg-white'}`}>
            <div className="flex flex-col lg:flex-row">
                {/* Video/Image Section */}
                <div className="lg:w-1/2 w-full min-h-[50vh] lg:min-h-screen overflow-hidden">
                    <MacbookScroll
                        src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/header.mp4?alt=media&token=ec250b2e-12a1-433d-a937-afa21a10f5fc"
                        showGradient={false}
                    />
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 w-full flex flex-col justify-center items-start px-6 lg:px-16 py-16 lg:py-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
                            About Us
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                About CommuteGo
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
                            CommuteGo wishes you a happy & safe journey.
                        </p>

                        <div className="space-y-4 text-gray-500 dark:text-gray-400 mb-8">
                            <p>
                                CommuteGo is a team of dedicated members, who are passionate about Indian Transportation Systems.
                            </p>
                            <p>
                                This web site (CommuteGo) is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way. Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization.
                            </p>
                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                                THE INFORMATION AVAILABLE ON THIS SITE IS FOR GENERAL INFORMATION PURPOSES ONLY.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { label: 'Routes', value: '500+', icon: MapPin },
                                { label: 'Users', value: '10K+', icon: Users },
                                { label: 'Support', value: '24/7', icon: Clock },
                            ].map((stat, index) => (
                                <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800">
                                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-500" />
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/about")}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                        >
                            Know more <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
