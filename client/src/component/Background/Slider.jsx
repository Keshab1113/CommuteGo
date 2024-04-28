import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from '../../assets/Pictures';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Slider = () => {
  return (
    <div className='h-screen w-full flex justify-around items-center '>
      <div className=' w-full'>
        <Carousel
          responsive={responsive}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
          swipeable={false}
          draggable={false}
          showDots={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5500}
          keyBoardControl={true}
          removeArrowOnDeviceType={["mobile", "desktop", "tablet"]}
        >
          {
            bannerData.map(data => (
              <img src={data.url} key={data.id} alt="banner" className=' h-screen w-full z-20' />

            ))
          }

        </Carousel>
      </div>
    </div>
  )
}

export default Slider;
