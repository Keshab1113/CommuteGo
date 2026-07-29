import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { Bus, Train, Plane, MapPin, ArrowRight, Star, Users, Clock, Shield, Zap } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

const Service = () => {
  const { darkMode } = useContext(ThemeContext);

  const testimonials = [
    {
      quote: "Kolkata, also known as Calcutta. It lies on the eastern bank of the Hooghly River. It is the primary financial and commercial centre of eastern and northeastern India.",
      name: "Kolkata",
      designation: "The capital of West Bengal",
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    },
    {
      quote: "Delhi is famous for its history and historical places like Red Fort and Qutub Minar.",
      name: "Delhi",
      designation: "The capital of India",
      src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=400&fit=crop",
    },
    {
      quote: "Popular among them: 'Queen of the Deccan', 'Cultural capital of Maharashtra', and 'Oxford of the East'.",
      name: "Pune",
      designation: "It has been known by a plethora of sobriquets.",
      src: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e9?w=400&h=400&fit=crop",
    },
    {
      quote: "It had once flourished as a global center for trade of rare diamonds, emeralds as well as natural pearls.",
      name: "Hyderabad",
      designation: "It is known as the City of Pearls",
      src: "https://images.unsplash.com/photo-1626078431532-4f4f4e5afc77?w=400&h=400&fit=crop",
    },
    {
      quote: "The city is dotted with lush green spaces such as Lalbagh Botanical Garden and Cubbon Park.",
      name: "Bangalore",
      designation: "The Garden City of India",
      src: "https://images.unsplash.com/photo-1613642589751-e3a33e20d3e7?w=400&h=400&fit=crop",
    },
  ];

  const services = [
    { icon: Bus, title: 'Bus Booking', desc: '500+ routes across India', color: 'from-orange-500 to-red-500' },
    { icon: Train, title: 'Train Booking', desc: 'Real-time train schedules', color: 'from-purple-500 to-pink-500' },
    { icon: Plane, title: 'Flight Booking', desc: 'Compare all airlines', color: 'from-blue-500 to-cyan-500' },
  ];

  const features = [
    { icon: Shield, title: 'Safe & Secure' },
    { icon: Zap, title: 'Instant Booking' },
    { icon: Clock, title: '24/7 Support' },
    { icon: Star, title: 'Top Rated' },
  ];

  return (
    <div className={`min-h-screen py-20 ${darkMode ? 'bg-[#141313]' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                Explore All Corners of the World
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Find the perfect service for your travel needs. We're here to help you every step of the way.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">{service.desc}</p>
                  <button className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-cyan-500" />
                </div>
                <p className="font-semibold">{feature.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                Discover Amazing Destinations
              </span>
            </h3>
            <AnimatedTestimonials testimonials={testimonials} />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Service
