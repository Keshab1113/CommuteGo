import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Bus, ArrowRight, Search, Filter, Clock, Star, Users, Menu, X, SlidersHorizontal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../store/auth';

const BusPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { busdata } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const popularRoutes = [
    { from: 'Kolkata', to: 'Durgapur', buses: 15, price: '₹250' },
    { from: 'Kolkata', to: 'Asansol', buses: 12, price: '₹220' },
    { from: 'Kolkata', to: 'Siliguri', buses: 8, price: '₹450' },
    { from: 'Mumbai', to: 'Pune', buses: 20, price: '₹300' },
    { from: 'Delhi', to: 'Jaipur', buses: 18, price: '₹350' },
  ];

  const handleSearch = () => {
    if (!selectedFrom || !selectedTo) return;

    const results = busdata.filter(
      (bus) => bus.from.toLowerCase() === selectedFrom.toLowerCase() &&
               bus.to.toLowerCase() === selectedTo.toLowerCase()
    );
    setFilteredResults(results);
    setShowResults(true);
  };

  const uniqueFrom = [...new Set(busdata.map(bus => bus.from))];
  const uniqueTo = [...new Set(busdata.map(bus => bus.to))];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#141313] text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10"></div>
        <div className="absolute inset-0 grid-pattern opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-medium mb-4">
              <Bus className="w-4 h-4" />
              Bus Booking
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                Find Your Perfect Bus
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Search and book bus tickets across 500+ routes in India
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
                    <select
                      value={selectedFrom}
                      onChange={(e) => setSelectedFrom(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none"
                    >
                      <option value="">Select City</option>
                      {uniqueFrom.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-gray-500">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedTo}
                      onChange={(e) => setSelectedTo(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none"
                    >
                      <option value="">Select City</option>
                      {uniqueTo.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-gray-500">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-500/25"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Search Results ({filteredResults.length})</h2>
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((bus, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-orange-500/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{bus.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {bus.route || 'AC Sleeper'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" /> Seats Available
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-500">₹{bus.price || '250'}</p>
                          <p className="text-sm text-gray-500">per seat</p>
                        </div>
                        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold mb-2">No Buses Found</h3>
                <p className="text-gray-500">We couldn't find any buses on this route. Try different locations.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Popular Routes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
            <p className="text-gray-500 dark:text-gray-400">Most booked destinations this week</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-orange-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">From</p>
                    <h3 className="text-lg font-bold">{route.from}</h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">To</p>
                  <h3 className="text-lg font-bold">{route.to}</h3>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Bus className="w-4 h-4" /> {route.buses} buses
                    </div>
                  </div>
                  <p className="text-lg font-bold text-orange-500">From {route.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: 'Real-time Tracking', desc: 'Track your bus location live' },
              { icon: Star, title: 'Top Rated Operators', desc: 'Verified bus partners' },
              { icon: Users, title: 'Instant Booking', desc: 'Book in just 2 clicks' },
              { icon: Bus, title: '500+ Routes', desc: 'Covering all major cities' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-orange-500" />
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

export default BusPage;
