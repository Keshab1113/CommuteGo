import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Plane, Search, MapPin, Calendar, ArrowRight, Clock, Shield, Zap, Globe, Star } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const FlightPage = () => {
  const { darkMode } = useContext(ThemeContext);

  const popularFlights = [
    { from: 'Delhi', to: 'Mumbai', price: '₹4,500', airline: 'Air India', time: '2h 15m' },
    { from: 'Mumbai', to: 'Bangalore', price: '₹3,800', airline: 'IndiGo', time: '1h 45m' },
    { from: 'Kolkata', to: 'Chennai', price: '₹5,200', airline: 'SpiceJet', time: '2h 30m' },
    { from: 'Delhi', to: 'Goa', price: '₹4,200', airline: 'Vistara', time: '2h 40m' },
    { from: 'Bangalore', to: 'Hyderabad', price: '₹2,800', airline: 'Air Asia', time: '1h 20m' },
  ];

  const trendingDestinations = [
    { name: 'Goa', desc: 'Beach Paradise', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop' },
    { name: 'Kerala', desc: 'God\'s Own Country', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop' },
    { name: 'Rajasthan', desc: 'Land of Kings', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop' },
    { name: 'Kashmir', desc: 'Paradise on Earth', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#141313] text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
        <div className="absolute inset-0 grid-pattern opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <Plane className="w-4 h-4" />
              Flight Booking
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                Fly to Your Dream Destination
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Compare flights from all major airlines and find the best deals
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-premium">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-gray-500">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-gray-500">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-gray-500">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-1 flex items-end">
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25">
                    <Search className="w-5 h-5" />
                    Search Flights
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Trending Destinations</h2>
            <p className="text-gray-500 dark:text-gray-400">Popular places our travelers love</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDestinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                  <p className="text-sm text-gray-300">{dest.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Flights */}
      <section className="py-16 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Popular Flights</h2>
            <p className="text-gray-500 dark:text-gray-400">Best deals on top routes</p>
          </motion.div>

          <div className="space-y-4">
            {popularFlights.map((flight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-blue-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold">{flight.airline}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{flight.from}</span>
                        <ArrowRight className="w-4 h-4" />
                        <span>{flight.to}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {flight.time}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-500">{flight.price}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: '500+ Airlines', desc: 'Compare all carriers' },
              { icon: Shield, title: 'Secure Booking', desc: '100% protected payments' },
              { icon: Zap, title: 'Instant Confirmation', desc: 'Get tickets immediately' },
              { icon: Star, title: 'Best Prices', desc: 'Guaranteed lowest fares' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlightPage;
