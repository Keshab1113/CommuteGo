import React from 'react'
import { Meteors } from "../magicui/meteors";
import { RetroGrid } from "../magicui/retro-grid";
import { SparklesCore } from "../ui/sparkles";
import { TextHoverEffect } from "../ui/text-hover-effect";

const Landing = () => {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Meteors number={10} />
      <RetroGrid className="absolute inset-0 z-0" />
      <div className=" absolute h-[30rem]  md:mt-0 lg:mt-12  xl:mt-[100px] 2xl:mt-[240px] flex items-center justify-center max-sm:[mask-image:radial-gradient(90%_50%,white,transparent)] bottom-0">
        <div className="relative z-0 h-full w-screen overflow-visible ">
          <div className=" z-[20] absolute inset-x-0 bottom-[35vh] w-full left-1/2 -translate-x-1/2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            <TextHoverEffect text="COMMUTEGO" />
          </div>
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
            <div className="absolute inset-x-0 -bottom-[264px] h-full w-full rounded-[100%] bg-gradient-to-b from-white to-black" />
            <div className="absolute inset-x-0  -bottom-[265px] sm:-bottom-[256px] h-full w-full rounded-[100%] bg-neutral-950 shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
