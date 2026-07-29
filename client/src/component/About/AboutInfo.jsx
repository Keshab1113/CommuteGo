import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { TypeAnimation } from "react-type-animation";
import { ThemeContext } from "../../context/ThemeContext";
import { Info, AlertTriangle, ExternalLink, Heart } from "lucide-react";

const AboutInfo = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen py-20 ${darkMode ? 'bg-[#141313]' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className={`${darkMode ? 'bg-[#1C1B1B]' : 'bg-white'} shadow-premium border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden`}>
            {/* Header */}
            <div className="relative p-8 pb-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    About Us
                  </h1>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-cyan-500 via-emerald-500 to-transparent"></div>
              </div>
            </div>

            <CardContent className={`mt-6 p-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-6`}>
              <p className="text-lg leading-relaxed">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://commute-go.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        CommuteGo <ExternalLink className="w-3 h-3" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visit CommuteGo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {' '}is a team of dedicated members passionate about Indian Transportation Systems.
              </p>

              <div className={`p-4 rounded-xl ${darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'} border border-gray-200 dark:border-gray-800`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">
                    This website is privately maintained and is not officially affiliated with State Governments, Government of India, or any related organizations. Opinions expressed here are personal and do not necessarily reflect any official stance.
                  </p>
                </div>
              </div>

              <p className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                The information available on this site is for general information purposes.
              </p>

              <p className="leading-relaxed">
                By accessing this website, you agree to abide by the Terms and Conditions.{' '}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://commute-go.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        CommuteGo <ExternalLink className="w-3 h-3" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visit CommuteGo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {' '}reserves the right to modify these without prior notification. If you disagree with any terms, please refrain from using this site.
              </p>

              <p className="leading-relaxed">
                Information displayed is collected from various sources, including train fares, routes, and schedules. These are indicative and subject to change. Users should verify details directly with official sources.
              </p>

              {/* Footer Message */}
              <div className={`pt-6 border-t border-gray-200 dark:border-gray-800 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="flex items-center justify-center gap-2 text-lg">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href="https://commute-go.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                        >
                          CommuteGo <ExternalLink className="w-3 h-3" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Visit CommuteGo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {' '}wishes you a{' '}
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <TypeAnimation
                      sequence={["happy", 1000, "safe", 1000, "comfortable", 1000]}
                      wrapper="span"
                      speed={500}
                      repeat={Infinity}
                    />
                    <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  </span>
                  {' '}journey.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutInfo;
