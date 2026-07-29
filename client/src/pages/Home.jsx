import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Users, Compass, Sparkles, ArrowRight, ChevronDown, Play, X, Filter, Calendar, Wallet, Shield, Star, Clock, Heart, Share2, Camera, Mountain, TreePine, Tent, Utensils, Camera as CameraIcon, Map } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const filters = [
    { id: 'all', label: 'All', icon: Compass },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'nature', label: 'Nature', icon: TreePine },
    { id: 'peaceful', label: 'Peaceful', icon: Heart },
    { id: 'weekend', label: 'Weekend', icon: Calendar },
    { id: 'camping', label: 'Camping', icon: Tent },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'photography', label: 'Photography', icon: CameraIcon },
  ];

  const hiddenDestinations = [
    {
      name: 'Mawlynnong Village',
      location: 'Meghalaya',
      image: 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Oct - Mar',
      crowdLevel: 'Very Low',
      budget: '₹3,500',
      tags: ['peaceful', 'nature', 'photography'],
      description: 'Asia\'s cleanest village with living root bridges and cloud-kissing peaks.',
      highlights: ['Living Root Bridges', 'Mawlynnong Falls', 'Sky Viewpoint'],
      safetyScore: 9.5,
    },
    {
      name: 'Chopta-Tungnath',
      location: 'Uttarakhand',
      image: 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=600&h=400&fit=crop',
      difficulty: 'Moderate',
      bestSeason: 'Apr - Jun',
      crowdLevel: 'Low',
      budget: '₹5,000',
      tags: ['adventure', 'nature', 'photography', 'trekking'],
      description: 'A pristine meadow surrounded by alpine flowers with ancient Tungnath temple.',
      highlights: ['Tungnath Temple', 'Chandrashila Summit', 'Alpine Meadows'],
      safetyScore: 8.8,
    },
    {
      name: 'Majuli Island',
      location: 'Assam',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Nov - Feb',
      crowdLevel: 'Very Low',
      budget: '₹4,000',
      tags: ['peaceful', 'culture', 'weekend'],
      description: 'World\'s largest river island with Vaishnavite culture and mask-making.',
      highlights: ['Mask Workshops', 'River Cruise', 'Satras (Monasteries)'],
      safetyScore: 9.2,
    },
    {
      name: 'Spiti Valley',
      location: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop',
      difficulty: 'Challenging',
      bestSeason: 'May - Oct',
      crowdLevel: 'Low',
      budget: '₹12,000',
      tags: ['adventure', 'photography', 'camping'],
      description: 'A cold desert mountain valley with Buddhist monasteries and surreal landscapes.',
      highlights: ['Key Monastery', 'Chandratal Lake', 'Kibber Village'],
      safetyScore: 7.5,
    },
    {
      name: 'Gokarna',
      location: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Sep - Mar',
      crowdLevel: 'Medium',
      budget: '₹4,500',
      tags: ['beach', 'peaceful', 'weekend'],
      description: 'Serene beaches without commercial tourism, perfect for meditation and sunsets.',
      highlights: ['Om Beach', 'Mahabaleshwar Temple', 'Nameless Beaches'],
      safetyScore: 9.0,
    },
    {
      name: 'Ziro Valley',
      location: 'Arunachal Pradesh',
      image: 'https://images.unsplash.com/photo-1600091166971-7f16c8c7e7f2?w=600&h=400&fit=crop',
      difficulty: 'Moderate',
      bestSeason: 'Mar - Oct',
      crowdLevel: 'Very Low',
      budget: '₹6,500',
      tags: ['nature', 'culture', 'photography'],
      description: 'Home to Apatani tribes with stunning rice terraces and tribal heritage.',
      highlights: ['Apatani Tribe', 'Rice Terraces', 'Dolphin Nose Viewpoint'],
      safetyScore: 8.5,
    },
  ];

  const localBuddies = [
    {
      name: 'Rajesh Kumar',
      location: 'Darjeeling, WB',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      interests: ['Tea Gardens', 'Photography', 'Trekking'],
      rating: 4.9,
      reviews: 127,
      responseTime: '< 1 hour',
      languages: ['Hindi', 'English', 'Nepali'],
      price: '₹2,500/day',
      verified: true,
    },
    {
      name: 'Priya Sharma',
      location: 'Jaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      interests: ['Folk Music', 'Art', 'Cooking'],
      rating: 5.0,
      reviews: 89,
      responseTime: '< 30 mins',
      languages: ['Hindi', 'English', 'Rajasthani'],
      price: '₹3,000/day',
      verified: true,
    },
    {
      name: 'Amit Nath',
      location: 'Shillong, Meghalaya',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      interests: ['Music', 'Photography', 'Hiking'],
      rating: 4.8,
      reviews: 156,
      responseTime: '< 2 hours',
      languages: ['English', 'Khasi', 'Hindi'],
      price: '₹2,000/day',
      verified: true,
    },
  ];

  const travelMatches = [
    {
      destination: 'Darjeeling',
      dates: 'Aug 15-18',
      budget: '₹12,000',
      interests: ['Photography', 'Tea Gardens'],
      travelers: 2,
      image: 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=400&h=300&fit=crop',
    },
    {
      destination: 'Spiti Valley',
      dates: 'Sep 10-20',
      budget: '₹18,000',
      interests: ['Adventure', 'Camping'],
      travelers: 4,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop',
    },
    {
      destination: 'Kerala Backwaters',
      dates: 'Oct 5-12',
      budget: '₹15,000',
      interests: ['Relaxation', 'Food', 'Boating'],
      travelers: 3,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
    },
  ];

  const pillars = [
    {
      icon: Compass,
      title: 'Hidden Destinations',
      description: 'Discover authentic places beyond tourist traps. From secret waterfalls to forgotten temples, explore India like a local.',
      color: 'from-emerald-500 to-teal-500',
      stats: '2,500+ Hidden Gems',
    },
    {
      icon: Users,
      title: 'Local Buddies',
      description: 'Connect with passionate locals who share their home, culture, and stories. Not guides—friends who show you the real India.',
      color: 'from-cyan-500 to-blue-500',
      stats: '5,000+ Verified Locals',
    },
    {
      icon: Heart,
      title: 'Travel Together',
      description: 'Find compatible travel companions. Split costs, share experiences, and create memories with like-minded explorers.',
      color: 'from-rose-500 to-pink-500',
      stats: '50,000+ Happy Travelers',
    },
  ];

  const filteredDestinations = activeFilter === 'all'
    ? hiddenDestinations
    : hiddenDestinations.filter(d => d.tags.includes(activeFilter));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[128px]"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/20"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-xl bg-gradient-to-br from-rose-500/20 to-transparent border border-rose-500/20 rotate-12"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight mt-24"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Discover Hidden Places.
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
              Meet Local Experts.
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Travel Together.
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Stop visiting crowded tourist traps. Start exploring authentic India with people who know it best.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Navigate to hidden destinations with search params
                const params = new URLSearchParams();
                if (searchDestination) params.set('q', searchDestination);
                if (searchDate) params.set('date', searchDate);
                navigate(`/hidden-destinations?${params.toString()}`);
              }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-4 p-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                  <input
                    type="text"
                    placeholder="Where do you want to explore?"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>
                <div className="md:w-48 relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <input
                    type="date"
                    placeholder="When?"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
                <button type="submit" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25">
                  Explore
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { value: '2,500+', label: 'Hidden Destinations' },
              { value: '5,000+', label: 'Local Buddies' },
              { value: '50,000+', label: 'Happy Travelers' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-gray-500" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-emerald-500/5 to-[#0a0a0a]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
              Our Three Pillars
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                A Completely Different Way
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                To Experience India
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-transparent transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{pillar.description}</p>
                  <p className="text-sm font-medium text-emerald-400">{pillar.stats}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Destinations Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
                <Compass className="w-4 h-4" />
                Hidden Destinations
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Explore Beyond
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  The Ordinary
                </span>
              </h2>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2">
              View All Destinations <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Quick Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                      {destination.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-400" /> {destination.safetyScore}
                    </span>
                  </div>

                  {/* Save Button */}
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    {destination.location}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{destination.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.highlights.slice(0, 3).map((highlight) => (
                      <span key={highlight} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {destination.bestSeason}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {destination.crowdLevel}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-emerald-400">{destination.budget}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Buddies Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Local Buddies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Spend a Day With
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                A Passionate Local
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Not traditional guides—local friends who share their home, culture, and hidden stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {localBuddies.map((buddy, index) => (
              <motion.div
                key={buddy.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={buddy.image}
                      alt={buddy.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    {buddy.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{buddy.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {buddy.location}
                    </p>
                  </div>
                </div>

                {/* Interests */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {buddy.interests.map((interest) => (
                    <span key={interest} className="px-3 py-1 rounded-full bg-white/5 text-xs">
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-bold">{buddy.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <p className="font-bold">{buddy.reviews}</p>
                    <p className="text-xs text-gray-500">Reviews</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <p className="font-bold text-xs">{buddy.responseTime}</p>
                    <p className="text-xs text-gray-500">Response</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {buddy.languages.map((lang) => (
                    <span key={lang} className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-400">
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-lg font-bold text-rose-400">{buddy.price}</span>
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-all">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all inline-flex items-center gap-2">
              View All Local Buddies <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Travel Matchmaking Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Travel Matchmaking
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Travel Companions
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don't travel alone. Find like-minded explorers heading to the same destination.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelMatches.map((trip, index) => (
              <motion.div
                key={trip.destination}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                    {trip.travelers} travelers needed
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{trip.destination}</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.interests.map((interest) => (
                      <span key={interest} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {trip.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wallet className="w-4 h-4" /> {trip.budget}
                    </span>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all">
                    Join This Trip
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Create Your Own Trip</h3>
            <p className="text-gray-400 mb-6">Looking for companions? Create a trip and let others join you.</p>
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25">
              Start a Trip
            </button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Three Simple Steps to
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Unforgettable Journeys
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Discover',
                description: 'Search hidden destinations based on your interests, budget, and travel style. Explore authentic places beyond tourist traps.',
                icon: Compass,
                color: 'from-emerald-500 to-teal-500',
              },
              {
                step: '02',
                title: 'Connect',
                description: 'Book a local buddy who shares your interests. Spend a day exploring the real culture, food, and stories.',
                icon: Users,
                color: 'from-cyan-500 to-blue-500',
              },
              {
                step: '03',
                title: 'Travel Together',
                description: 'Find compatible companions for your trip. Split costs, share experiences, and create lasting friendships.',
                icon: Heart,
                color: 'from-rose-500 to-pink-500',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <p className="text-5xl font-black bg-gradient-to-r from-white/20 to-white/10 bg-clip-text text-transparent mb-2">
                  {item.step}
                </p>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-rose-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Ready to Explore
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                The Real India?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of travelers who are discovering hidden gems, connecting with locals, and creating unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25">
                Start Exploring
              </button>
              <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all text-lg font-medium">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
