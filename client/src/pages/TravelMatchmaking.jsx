import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, MapPin, Calendar, Users, Wallet, Shield, Star, Clock, Filter, MessageCircle, UserPlus, Sparkles, ArrowRight, ChevronRight, Compass, Camera, Mountain, Utensils } from 'lucide-react';

const TravelMatchmaking = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [searchQuery, setSearchQuery] = useState('');

  const interests = [
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'food', label: 'Food & Dining', icon: Utensils },
    { id: 'nature', label: 'Nature', icon: Compass },
  ];

  const openTrips = [
    {
      id: 1,
      destination: 'Darjeeling',
      location: 'West Bengal',
      image: 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=400&h=300&fit=crop',
      dates: 'Aug 15-18, 2026',
      budget: '₹12,000',
      interests: ['Photography', 'Tea Gardens', 'Mountains'],
      travelers: 2,
      maxTravelers: 4,
      createdBy: 'Rahul M.',
      createdByImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      gender: 'Male',
      age: 28,
      createdAt: '2 hours ago',
      description: 'Planning a relaxed trip to Darjeeling for the tea gardens and sunrise at Tiger Hill. Looking for photography enthusiasts or anyone who loves mountains!',
      safetyVerified: true,
      rating: 4.8,
    },
    {
      id: 2,
      destination: 'Spiti Valley',
      location: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop',
      dates: 'Sep 10-20, 2026',
      budget: '₹18,000',
      interests: ['Adventure', 'Camping', 'Photography'],
      travelers: 3,
      maxTravelers: 6,
      createdBy: 'Priya S.',
      createdByImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      gender: 'Female',
      age: 26,
      createdAt: '5 hours ago',
      description: 'Spiti Valley road trip! We have a rented SUV and camping gear. Looking for adventurous souls who are okay with long drives and basic accommodations.',
      safetyVerified: true,
      rating: 4.9,
    },
    {
      id: 3,
      destination: 'Kerala Backwaters',
      location: 'Kerala',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
      dates: 'Oct 5-12, 2026',
      budget: '₹15,000',
      interests: ['Relaxation', 'Food', 'Boating'],
      travelers: 1,
      maxTravelers: 3,
      createdBy: 'Ankit K.',
      createdByImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      gender: 'Male',
      age: 30,
      createdAt: '1 day ago',
      description: 'Houseboat experience in Alleppey! I\'ve already booked the houseboat for 2 nights. Looking for 1-2 more people to split costs and share the experience.',
      safetyVerified: true,
      rating: 4.7,
    },
    {
      id: 4,
      destination: 'Rajasthan Heritage',
      location: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop',
      dates: 'Nov 1-10, 2026',
      budget: '₹20,000',
      interests: ['History', 'Architecture', 'Food'],
      travelers: 2,
      maxTravelers: 5,
      createdBy: 'Sneha V.',
      createdByImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      gender: 'Female',
      age: 27,
      createdAt: '3 hours ago',
      description: 'Exploring Jaipur, Jodhpur, and Udaipur! Want to cover all the forts, palaces, and local food. Looking for history buffs and culture lovers.',
      safetyVerified: true,
      rating: 5.0,
    },
    {
      id: 5,
      destination: 'Meghalaya',
      location: 'Meghalaya',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop',
      dates: 'Dec 20-28, 2026',
      budget: '₹16,000',
      interests: ['Nature', 'Caves', 'Waterfalls'],
      travelers: 1,
      maxTravelers: 4,
      createdBy: 'Arjun R.',
      createdByImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      gender: 'Male',
      age: 25,
      createdAt: '6 hours ago',
      description: 'Winter trip to see the living root bridges and caves of Meghalaya. Perfect for nature lovers. Solo traveler looking for company!',
      safetyVerified: true,
      rating: 4.6,
    },
  ];

  const filteredTrips = openTrips.filter(trip =>
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-emerald-500/10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Travel Matchmaking
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 to-emerald-400 bg-clip-text text-transparent">
                Travel Companions
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Don't travel alone. Find like-minded explorers heading to the same destination.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
              <input
                type="text"
                placeholder="Search by destination, interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('find')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'find'
                  ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              Find Trips
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              Create Trip
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'matches'
                  ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              My Matches
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-500 mb-6">
            <span className="text-rose-400 font-semibold">{filteredTrips.length}</span> open trips available
          </p>

          {activeTab === 'find' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                        <Users className="w-3 h-3" /> {trip.travelers}/{trip.maxTravelers} travelers
                      </span>
                      {trip.safetyVerified && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                          <Shield className="w-3 h-3 text-emerald-400" /> Verified
                        </span>
                      )}
                    </div>

                    {/* Interest Tags */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {trip.interests.map((interest) => (
                        <span key={interest} className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{trip.destination}</h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-400" /> {trip.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold">{trip.rating}</span>
                      </div>
                    </div>

                    {/* Trip Creator */}
                    <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5">
                      <img
                        src={trip.createdByImage}
                        alt={trip.createdBy}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{trip.createdBy}</p>
                        <p className="text-xs text-gray-500">{trip.gender}, {trip.age} • Created {trip.createdAt}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{trip.description}</p>

                    {/* Trip Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-rose-400" /> {trip.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wallet className="w-4 h-4 text-emerald-400" /> {trip.budget}
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2">
                      <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-medium hover:from-rose-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Join Trip
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Create Your Trip</h3>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Destination</label>
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Budget (₹)</label>
                    <input
                      type="number"
                      placeholder="Total budget per person"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Max Travelers</label>
                    <input
                      type="number"
                      placeholder="How many people can join?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                          <interest.icon className="w-4 h-4" />
                          {interest.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Trip Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your trip plans, who you're looking for..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-semibold hover:from-rose-600 hover:to-emerald-600 transition-all"
                  >
                    Create Trip
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'matches' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Sparkles className="w-16 h-16 text-rose-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Matches Yet</h3>
              <p className="text-gray-400 mb-6">Join trips or create your own to find travel companions</p>
              <button
                onClick={() => setActiveTab('create')}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-medium hover:from-rose-600 hover:to-emerald-600 transition-all"
              >
                Create a Trip
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 to-emerald-500/10 border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-2">How Matching Works</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Our algorithm matches you with travelers based on destination, dates, budget, interests, and travel style.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Search, label: 'Search' },
                { icon: Heart, label: 'Like' },
                { icon: Users, label: 'Match' },
                { icon: Compass, label: 'Travel' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-rose-400" />
                  </div>
                  <span className="font-medium">{step.label}</span>
                  {i < 3 && <ChevronRight className="w-4 h-4 text-gray-600" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TravelMatchmaking;
