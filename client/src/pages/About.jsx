import React, { useContext } from 'react';
import AboutInfo from '../component/About/AboutInfo';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const About = () => {
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  return (
    <div className={`${darkMode ? 'dark:bg-gray-900 dark:text-white' : ''}`}>
      <AboutInfo />
    </div>
  );
};

export default About;
