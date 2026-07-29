import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Bus, Clock, Target, Eye, Heart, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { MacbookScroll } from '../components/ui/macbook-scroll';

const About = () => {
  const { darkMode } = useContext(ThemeContext);

  const team = [
    { name: 'Keshab Das', role: 'Founder & Developer', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Team Member', role: 'Designer', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Team Member', role: 'Operations', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  ];

  const values = [
    { icon: Target, title: 'Our Mission', desc: 'To make transportation booking seamless and accessible for every Indian citizen.' },
    { icon: Eye, title: 'Our Vision', desc: 'To become India\'s most trusted travel companion, revolutionizing how people commute.' },
    { icon: Heart, title: 'Our Values', desc: 'Customer-first approach, transparency, innovation, and unwavering commitment to safety.' },
  ];

  const milestones = [
    { year: '2024', title: 'Launch', desc: 'CommuteGo officially launched' },
    { year: '2024', title: '100+ Routes', desc: 'Expanded to 100+ routes' },
    { year: '2025', title: '10K Users', desc: 'Reached 10,000 active users' },
    { year: '2026', title: '500+ Routes', desc: '500+ destinations covered' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#141313] text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/header.mp4?alt=media&token=ec250b2e-12a1-433d-a937-afa21a10f5fc"
            muted
            autoPlay
            loop
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141313] via-[#141313]/50 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 pt-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            CommuteGo
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Your Journey, Simplified
          </p>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            A team of dedicated members passionate about Indian Transportation Systems
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                  About CommuteGo
                </span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                CommuteGo is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization. The information available on this site is for general information purposes only.
              </p>

              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                Get In Touch <ArrowRight className="w-4 h-4" />
              </NavLink>
            </motion.div>

            {/* Macbook Scroll */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <MacbookScroll
                  src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/header.mp4?alt=media&token=ec250b2e-12a1-433d-a937-afa21a10f5fc"
                  showGradient={false}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                What Drives Us
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-cyan-600 via-emerald-600 to-cyan-600 p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200')] bg-cover bg-center opacity-10"></div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: '500+', label: 'Routes', icon: MapPin },
                { value: '10K+', label: 'Users', icon: Users },
                { value: '100+', label: 'Partner Bus', icon: Bus },
                { value: '24/7', label: 'Support', icon: Clock },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 opacity-80" />
                  <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                    {milestone.year}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-2xl bg-gray-50 dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold">Important Disclaimer</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              This web site (CommuteGo) is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
