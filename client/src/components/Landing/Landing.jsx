import React from 'react'
import { Meteors } from "../magicui/meteors";
import { RetroGrid } from "../magicui/retro-grid";
// import { SparklesCore } from "../ui/sparkles";

const Landing = () => {
    return (
        <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Meteors number={30} />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 my-auto">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    CommuteGo <br /> <span className='text-2xl'>Best Way To Start Your Journey!</span>
                </h1>
            </div>
            <RetroGrid className="absolute inset-0 z-0" />
            {/* <div className="relative h-[24rem]  md:mt-0 lg:mt-12  xl:mt-[100px] 2xl:mt-[240px] flex items-center justify-center max-sm:[mask-image:radial-gradient(90%_50%,white,transparent)]">
        <div className="relative z-0 h-full w-screen overflow-visible ">
          <img
            src="/levitation.svg"
            alt="Levitation Logo"
            height={357}
            width={1753}
            className="hidden sm:block z-[20] absolute inset-x-0 bottom-[144px]  w-[80%] left-1/2 -translate-x-1/2"
          />
          <img
            src="/levitationMobile.svg"
            alt="Levitation Logo"
            height={50}
            width={50}
            className="block sm:hidden z-[20] absolute w-[30vw] max-w-[150px] inset-x-0 bottom-[114px] left-1/2 -translate-x-1/2"
          />
          <div className="max-sm:scale-[300%] max-sm:-translate-y-28  h-full  sm:[mask-image:radial-gradient(50%_50%,white,transparent)]">
            <div className="z-[29] max-sm:relative max-sm:translate-y-20">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={120}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,#5eead42e,transparent_70%)]" />
            <div className="absolute inset-x-0 -bottom-[254px] h-full w-full rounded-[100%] bg-gradient-to-b from-white to-black" />
            <div className="absolute inset-x-0  -bottom-[255px] sm:-bottom-[256px] h-full w-full rounded-[100%] bg-neutral-950 shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]" />
          </div>
        </div>
      </div> */}
        </div>
    )
}

export default Landing
