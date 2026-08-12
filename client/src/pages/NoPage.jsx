import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Compass, MapPin, Sparkles, Bus } from 'lucide-react';
import Seo from '../components/Seo/Seo';

const NoPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Compass, text: "Discover hidden destinations" },
    { icon: MapPin, text: "Connect with local experts" },
    { icon: Sparkles, text: "Find travel companions" },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#141313]">
      <Seo
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist. Head back to CommuteGo to discover hidden destinations, meet local buddies, and find travel companions."
        index={false}
      />
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-rose-500/20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/30 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
            <div className="w-14 h-14 rounded-2xl  flex items-center justify-center  group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="CommuteGo Logo"   />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CommuteGo
            </span>
          </Link>

          {/* 404 Text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative mb-6"
          >
            <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-black leading-none select-none">
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-400 bg-clip-text text-transparent">
                404
              </span>
            </h1>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/20 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-emerald-500/10 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Page Not Found
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
              Looks like this destination doesn't exist. The page you're looking for might have been moved or deleted.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-gray-800 hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-300 font-medium group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:-translate-x-1 transition-all" />
              <span className="text-gray-400 group-hover:text-white transition-colors">Go Back</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 group"
              >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-gray-400 text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoPage;