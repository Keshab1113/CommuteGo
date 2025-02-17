import React from 'react'
import GoTop from '../component/GoTop'
import ShowCase from '../component/ShowCase'
import About from '../component/About/About'
import Service from '../component/Service'
import Feedback from '../component/FeedBack/Feedback'
import Heading from '../component/Search/Heading'
import Destinition from '../component/Flight/Destinition'
import { Docker } from '../component/Docker/Docker'


const Home = () => {
  return (
    <div className=' h-min '>
      <Heading/>
      <About />
      <ShowCase />
      <Service />
      <Destinition/>
      <Feedback />
      <GoTop />
      <Docker/>
    </div>
  )
}

export default Home
