import React, { useContext } from 'react';
import SearchFlight from '../component/Search/SearchFlight';
import TravelSupport from '../component/Flight/TravelSupport';
import Aboutus from '../component/Flight/Aboutus';
import Destinition from '../component/Flight/Destinition';
import TrendingDestination from '../component/Flight/TrendingDestination';
import GoTop from '../component/GoTop';
import { ThemeContext } from '../context/ThemeContext';

const FlightPage = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <SearchFlight />
      <TrendingDestination />
      <Aboutus />
      <TravelSupport />
      {/* <Destinition /> */}
      <GoTop />
    </div>
  );
};

export default FlightPage;
