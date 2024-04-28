import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuoteRight,
    faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../store/auth"



const Feedback = () => {
    const { feedBackdata } = useAuth();
    
    return (
        <div
            className=' h-screen sm:h-screen flex sm:justify-center items-center flex-col sm:mt-0 mt-5 mb-5'>
            <h1 className=' text-4xl font-semibold text-cyan-950'>Feedback</h1>
            <h1 className=' text-2xl font-semibold text-cyan-950 mb-10'>Some of our user's words</h1>
            <div className=' w-11/12 sm:h-[35%] h-full flex justify-center items-center flex-col sm:flex-row rounded-lg'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    keyboard={{
                        enabled: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper h-full w-full "
                >
                    {
                        feedBackdata ? feedBackdata.map((feed) => {
                            const {_id, fullname, message, isDone } = feed;
                            return (
                                isDone?
                                <SwiperSlide key={_id}
                                        className=' rounded-lg'>
                                        <div className=' flex w-full h-full justify-center items-center border glass rounded-lg'>
                                        <div className=' flex sm:flex-row flex-col justify-center items-center w-[80%] h-full'>
                                            <div className=' flex flex-col justify-center sm:items-start items-center p-4 '>
                                                <h1 className='text-xl font-medium  capitalize text-white'>{fullname}</h1>
                                                <div className=' w-full flex flex-col justify-center'>
                                                    <FontAwesomeIcon icon={faQuoteLeft} className=' text-4xl text-slate-300' />
                                                    <p className=' text-xl text-white'>{message}</p>
                                                    <FontAwesomeIcon icon={faQuoteRight} className=' text-4xl text-slate-300' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide> : <h1>FeedBacks are Empty</h1>
                            )
                        }): <h1>There is a problem to fetch Feedback Data.</h1>
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Feedback
