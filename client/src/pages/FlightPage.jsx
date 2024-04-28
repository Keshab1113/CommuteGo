import React from 'react'
import SearchFlight from '../component/Search/SearchFlight'
import TravelSupport from '../component/Flight/TravelSupport'
import Aboutus from '../component/Flight/Aboutus'
import Destinition from '../component/Flight/Destinition'
import TrendingDestination from '../component/Flight/TrendingDestination'
import GoTop from '../component/GoTop'


const FlightPage = () => {
  return (
    <div className='h-full'>
      <SearchFlight />
      <TrendingDestination />
      <Aboutus />
      <TravelSupport />
      <Destinition />
      <GoTop />
    </div>
  )
}

export default FlightPage
