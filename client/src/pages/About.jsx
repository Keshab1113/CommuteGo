import React, { useContext } from 'react';
import AboutInfo from '../component/About/AboutInfo';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const About = () => {
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : ' bg-gradient-to-b from-white to-cyan-100'}`}>
      <AboutInfo />
    </div>
  );
};

export default About;
