import React, { useContext } from 'react';
import GoTop from '../component/GoTop';
import ShowCase from '../component/ShowCase';
import About from '../component/About/About';
import Service from '../component/Service';
import Feedback from '../component/FeedBack/Feedback';
import Heading from '../component/Search/Heading';
import { ThemeContext } from '../context/ThemeContext';
import Landing from '../components/Landing/Landing';
import FeedBack from './FeedBack';

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`h-min max-w-screen overflow-hidden ${darkMode ? 'bg-gray-900 dark:text-white' : ''}`}>
      {/* <Landing/> */}
      <Heading />
      <About />
      <Service />
      <ShowCase />
      <FeedBack/>
      <Feedback />
      <GoTop />
    </div>
  );
};

export default Home;
