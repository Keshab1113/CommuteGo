import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, Star, Clock, Shield, Heart, Camera, Music, Utensils, Mountain, BookOpen, Users, CheckCircle, MessageCircle, Calendar, ChevronDown, X, Award } from 'lucide-react';

const LocalBuddies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const interests = [
    { id: 'all', label: 'All', icon: Users },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'music', label: 'Music & Arts', icon: Music },
    { id: 'food', label: 'Food & Cooking', icon: Utensils },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'heritage', label: 'Heritage', icon: BookOpen },
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'darjeeling', label: 'Darjeeling, WB' },
    { id: 'jaipur', label: 'Jaipur, Rajasthan' },
    { id: 'shillong', label: 'Shillong, Meghalaya' },
    { id: 'varanasi', label: 'Varanasi, UP' },
    { id: 'kochi', label: 'Kochi, Kerala' },
    { id: 'goa', label: 'Goa' },
  ];

  const buddies = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Darjeeling, WB',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      interests: ['Tea Gardens', 'Photography', 'Trekking', 'Buddhist Culture'],
      rating: 4.9,
      reviews: 127,
      responseTime: '< 1 hour',
      languages: ['Hindi', 'English', 'Nepali'],
      price: '₹2,500/day',
      priceNegotiable: true,
      verified: true,
      badge: 'Top Rated',
      bio: 'Born and raised in Darjeeling, I\'ve spent 15 years exploring every corner of this beautiful hill station. I love sharing stories about tea, mountains, and local culture.',
      availability: 'Mon-Sun',
      tripsCompleted: 89,
      localSince: 2018,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Jaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      interests: ['Folk Music', 'Art & Crafts', 'Cooking', 'History'],
      rating: 5.0,
      reviews: 89,
      responseTime: '< 30 mins',
      languages: ['Hindi', 'English', 'Rajasthani'],
      price: '₹3,000/day',
      priceNegotiable: false,
      verified: true,
      badge: 'Superhost',
      bio: 'A passionate artist and musician from Jaipur. I host folk music sessions, cooking classes, and guided tours through the old city.',
      availability: 'Mon-Sat',
      tripsCompleted: 67,
      localSince: 2019,
    },
    {
      id: 3,
      name: 'Amit Nath',
      location: 'Shillong, Meghalaya',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      interests: ['Music', 'Photography', 'Hiking', 'Local Food'],
      rating: 4.8,
      reviews: 156,
      responseTime: '< 2 hours',
      languages: ['English', 'Khasi', 'Hindi'],
      price: '₹2,000/day',
      priceNegotiable: true,
      verified: true,
      badge: 'Quick Responder',
      bio: 'Shillong native with a passion for photography and music. I know all the hidden waterfalls and can show you the real Meghalaya.',
      availability: 'Mon-Sun',
      tripsCompleted: 112,
      localSince: 2017,
    },
    {
      id: 4,
      name: 'Vikram Singh',
      location: 'Varanasi, UP',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      interests: ['Spirituality', 'History', 'Photography', 'Yoga'],
      rating: 4.9,
      reviews: 203,
      responseTime: '< 1 hour',
      languages: ['Hindi', 'English', 'Bhojpuri'],
      price: '₹2,500/day',
      priceNegotiable: false,
      verified: true,
      badge: 'Heritage Expert',
      bio: 'A Varanasi local who has been conducting spiritual tours for 10 years. I can explain the deepest meanings of the ghats and temples.',
      availability: 'Mon-Sun',
      tripsCompleted: 156,
      localSince: 2016,
    },
    {
      id: 5,
      name: 'Anita Menon',
      location: 'Kochi, Kerala',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      interests: ['Spice Markets', 'Cooking', 'Backwaters', 'Ayurveda'],
      rating: 5.0,
      reviews: 94,
      responseTime: '< 30 mins',
      languages: ['Malayalam', 'English', 'Tamil'],
      price: '₹3,500/day',
      priceNegotiable: true,
      verified: true,
      badge: 'Food Expert',
      bio: 'Born in Kerala\'s spice country. I host cooking sessions, spice market tours, and Ayurvedic experiences.',
      availability: 'Mon-Sat',
      tripsCompleted: 78,
      localSince: 2020,
    },
    {
      id: 6,
      name: 'Carlos Fernandes',
      location: 'Goa',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
      interests: ['Beach Life', 'History', 'Portuguese Heritage', 'Nightlife'],
      rating: 4.7,
      reviews: 118,
      responseTime: '< 2 hours',
      languages: ['Konkani', 'English', 'Hindi', 'Portuguese'],
      price: '₹2,800/day',
      priceNegotiable: true,
      verified: true,
      badge: 'History Buff',
      bio: 'Goan born and bred with deep knowledge of Portuguese colonial history and hidden beach spots.',
      availability: 'Mon-Sun',
      tripsCompleted: 95,
      localSince: 2019,
    },
  ];

  const filteredBuddies = buddies.filter(buddy => {
    const matchesSearch = buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buddy.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterest = selectedInterest === 'all' ||
                            buddy.interests.some(i => i.toLowerCase().includes(selectedInterest.toLowerCase()));
    const matchesLocation = selectedLocation === 'all' || buddy.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesInterest && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-rose-500/10"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-rose-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Local Buddies
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Spend a Day With
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-rose-400 bg-clip-text text-transparent">
                A Passionate Local
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Not guides—friends. Real people who love their home and want to share it with you.
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
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interest Filters */}
      <section className="py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => setSelectedInterest(interest.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedInterest === interest.id
                    ? 'bg-gradient-to-r from-cyan-500 to-rose-500 text-white'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <interest.icon className="w-4 h-4" />
                {interest.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Location Filter */}
      <section className="py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm text-gray-500">Filter by location:</span>
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedLocation === loc.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-500 mb-6">
            Showing <span className="text-cyan-400 font-semibold">{filteredBuddies.length}</span> local buddies
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuddies.map((buddy, index) => (
              <motion.div
                key={buddy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Badge */}
                {buddy.badge && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                    <span className="text-xs font-medium text-amber-400 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {buddy.badge}
                    </span>
                  </div>
                )}

                {/* Profile */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={buddy.image}
                      alt={buddy.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                    {buddy.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-rose-500 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{buddy.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {buddy.location}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Local since {buddy.localSince}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{buddy.bio}</p>

                {/* Interests */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {buddy.interests.slice(0, 3).map((interest) => (
                    <span key={interest} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                      {interest}
                    </span>
                  ))}
                  {buddy.interests.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                      +{buddy.interests.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-sm">{buddy.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <p className="font-bold text-sm">{buddy.reviews}</p>
                    <p className="text-xs text-gray-500">Reviews</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <p className="font-bold text-sm">{buddy.tripsCompleted}</p>
                    <p className="text-xs text-gray-500">Trips</p>
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
                  <div>
                    <span className="text-xl font-bold text-cyan-400">{buddy.price}</span>
                    <span className="text-xs text-gray-500 ml-1">/day</span>
                    {buddy.priceNegotiable && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/10 text-xs text-emerald-400">
                        Negotiable
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-rose-600 transition-all">
                      Book
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-rose-500/10 border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Become a Local Buddy</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Love your city? Share it with travelers and earn while doing what you love.
            </p>
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-rose-500 text-white font-semibold hover:from-cyan-600 hover:to-rose-600 transition-all shadow-lg shadow-cyan-500/25">
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LocalBuddies;
