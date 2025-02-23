import React, { useContext } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { TypeAnimation } from "react-type-animation";
import { ThemeContext } from "../../context/ThemeContext";

const AboutInfo = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`flex items-center justify-center min-h-screen py-36 md:py-6 md:px-6 px-2 ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <Card className={`max-w-3xl w-full ${darkMode ? 'bg-[#070707]' : 'bg-white'} shadow-lg rounded-2xl md:px-6 md:py-6 px-4 py-6`}>
        <h1 className={`text-center text-4xl font-bold ${darkMode ? 'text-cyan-400' : 'text-cyan-700'} border-b-4 border-cyan-600 pb-2`}>
          About Us
        </h1>
        <CardContent className={`mt-6 md:p-6 p-0 ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium space-y-4`}>
          <p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://commute-go.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}
                  >
                    CommuteGo{" "}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="bg-white flex items-center gap-2">
                    <img
                      src="image.png"
                      alt="CommuteGo"
                      width={350}
                      height={300}
                      className="rounded"
                    />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            is a team of dedicated members passionate about Indian Transportation Systems.
          </p>
          <p>
            This website (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://commute-go.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}
                  >
                    CommuteGo
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <img
                      src="image.png"
                      alt="CommuteGo"
                      width={350}
                      height={300}
                      className="rounded"
                    />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            ) is privately maintained and is not officially affiliated with State Governments, Government of India, or any related organizations. Opinions expressed here are personal and do not necessarily reflect any official stance.
          </p>
          <p className={`uppercase font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            The information available on this site is for general information purposes.
          </p>
          <p>
            By accessing this website, you agree to abide by the Terms and Conditions.{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://commute-go.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}
                  >
                    CommuteGo
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <img
                      src="image.png"
                      alt="CommuteGo"
                      width={350}
                      height={300}
                      className="rounded"
                    />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            reserves the right to modify these without prior notification. If you disagree with any terms, please refrain from using this site.
          </p>
          <p>
            Information displayed is collected from various sources, including train fares, routes, and schedules. These are indicative and subject to change. Users should verify details directly with official sources.
          </p>
          <p className="flex items-center justify-center mt-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://commute-go.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}
                  >
                    CommuteGo&nbsp;
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <img
                      src="image.png"
                      alt="CommuteGo"
                      width={350}
                      height={300}
                      className="rounded"
                    />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            wishes you a &nbsp;
            <TypeAnimation
              sequence={[" happy", 1000, " safe", 1000, "comfortable", 1000]}
              wrapper="span"
              speed={500}
              repeat={Infinity}
            />{"  "}
             journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutInfo;
