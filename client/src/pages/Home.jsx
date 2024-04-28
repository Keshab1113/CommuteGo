import React from 'react'
import GoTop from '../component/GoTop'
import ShowCase from '../component/ShowCase'
import About from '../component/About/About'
import Service from '../component/Service'
import Feedback from '../component/FeedBack/Feedback'
import GoogleAds from '../component/GoogleAds/GoogleAds'
import GoogleAds2 from '../component/GoogleAds/GoogleAds2'
import Heading from '../component/Search/Heading'
import Destinition from '../component/Flight/Destinition'


const Home = () => {
  return (
    <div className=' h-min '>
      <Heading/>
      <GoogleAds />
      <About />
      <ShowCase />
      <Service />
      <GoogleAds2 />
      <Destinition/>
      <Feedback />
      <GoTop />
    </div>
  )
}

export default Home
