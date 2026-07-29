import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { Bus, MapPin, Search, ArrowRightLeft } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from "../store/auth";

const Buses = () => {
  const { darkMode } = useContext(ThemeContext);
  const { busdata } = useAuth();

  const popularRoutes = [
    { from: 'Kolkata', to: 'Durgapur', buses: 15 },
    { from: 'Kolkata', to: 'Asansol', buses: 12 },
    { from: 'Kolkata', to: 'Siliguri', buses: 8 },
    { from: 'Mumbai', to: 'Pune', buses: 20 },
    { from: 'Delhi', to: 'Jaipur', buses: 18 },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#141313]' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-medium mb-4">
              <Bus className="w-4 h-4" />
              Bus Booking
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                Find Your Perfect Bus
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Search and book bus tickets across 500+ routes in India
            </p>
          </motion.div>

          {/* Popular Routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="p-4 rounded-xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-orange-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium">{route.from}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRightLeft className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-medium">{route.to}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{route.buses} buses</span>
                  <span className="text-sm font-bold text-orange-500">From ₹250</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bus List Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Available Buses</h2>
          {busdata && busdata.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {busdata.slice(0, 10).map((bus, index) => (
                <motion.div
                  key={bus._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <Bus className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{bus.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 text-cyan-500" />
                          {bus.from}
                          <ArrowRightLeft className="w-3 h-3" />
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          {bus.to}
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all">
                      Book
                    </button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500">Route: {bus.route || 'Direct'}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-gray-50 dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800">
              <Bus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-bold mb-2">No Buses Available</h3>
              <p className="text-gray-500">Check back later for bus routes.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Buses
