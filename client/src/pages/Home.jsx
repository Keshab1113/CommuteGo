import React, { useContext } from 'react';
import GoTop from '../component/GoTop';
import ShowCase from '../component/ShowCase';
import About from '../component/About/About';
import Service from '../component/Service';
import Feedback from '../component/FeedBack/Feedback';
import Heading from '../component/Search/Heading';
import Destinition from '../component/Flight/Destinition';
import { Docker } from '../component/Docker/Docker';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import Landing from '../components/Landing/Landing';

const Home = () => {
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  return (
    <div className={`h-min max-w-screen overflow-hidden ${darkMode ? 'dark:bg-gray-900 dark:text-white' : ''}`}>
      <Landing/>
      {/* <Heading /> */}
      <About />
      <ShowCase />
      <Service />
      {/* <Destinition /> */}
      <Feedback />
      <GoTop />
      <Docker />
    </div>
  );
};

export default Home;
