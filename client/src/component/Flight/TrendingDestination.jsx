import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const data = [
    {
        name: `Kolkata`,
        img: `https://www.holidify.com/images/bgImages/KOLKATA.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
        name: `New Delhi`,
        img: `https://events.eletsonline.com/wp-content/uploads/2020/04/Smart-City.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
        name: `Mumbai`,
        img: `https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/800px-F7xZ48abwAAgNst.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
        name: `Goa`,
        img: `https://assets.cntraveller.in/photos/65169715f1f1534fc4e0f24d/4:3/w_1640,h_1230,c_limit/W%20Goa.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
        name: `Bangalore`,
        img: `https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
];

export default function TrendingDestinationPlaces() {
    const { darkMode } = useContext(ThemeContext);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div
            className="sm:h-[70vh] h-[50vh]"
            style={{
                backgroundColor: darkMode ? "#1f2937" : "#f8fafc",
                color: darkMode ? "#ffffff" : "#000000",
            }}
        >

            <div className="w-3/4 m-auto mb-10">
                <div className="mt-20">
                    <h1
                        className="text-3xl font-semibold mb-6 pl-2"
                        style={{
                            color: darkMode ? "#ffffff" : "#374151",
                        }}
                    >
                        Explore India
                    </h1>
                    <Slider {...settings}>
                        {data.map((d) => (
                            <div
                                key={d.name}
                                className={`rounded-xl ${
                                    darkMode
                                        ? "bg-gray-800 text-white"
                                        : "bg-slate-100 text-black"
                                }`}
                            >
                                <div
                                    className={`flex justify-center items-center rounded-t-xl overflow-hidden ${
                                        darkMode ? "bg-gray-700" : "bg-slate-200"
                                    }`}
                                >
                                    <img
                                        src={d.img}
                                        alt={d.name}
                                        className="rounded-t-xl h-36 w-full hover:scale-110 transition-all ease-in-out delay-200 hover:cursor-pointer"
                                    />
                                </div>

                                <div className="flex flex-col items-center justify-center gap-4 p-4">
                                    <p className="text-xl font-semibold">{d.name}</p>
                                    <p className="text-center">{d.review}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
