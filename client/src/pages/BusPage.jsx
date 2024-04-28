import React from 'react'
import Buses from '../component/Bus/Buses'
import GoTop from '../component/GoTop'
import ShowCase from '../component/ShowCase.jsx';
import Destinition from '../component/Flight/Destinition.jsx';

const BusPage = () => {
  return (
    <div>
      <Buses />
      <ShowCase/>
      <Destinition />
      <GoTop />
    </div>
  )
}

export default BusPage
