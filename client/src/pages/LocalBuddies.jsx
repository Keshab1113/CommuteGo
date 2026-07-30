import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, Star, Clock, Shield, Heart, Camera, Music, Utensils, Mountain, BookOpen, Users, CheckCircle, MessageCircle, Calendar, ChevronDown, X, Award, Loader2 } from 'lucide-react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LocalBuddies = () => {
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchBuddies();
  }, []);

  const fetchBuddies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/local-buddies?limit=50`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setBuddies(data.buddies || []);
      } else {
        throw new Error('Failed to fetch local buddies');
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load local buddies');
    } finally {
      setLoading(false);
    }
  };

  const filteredBuddies = buddies.filter(buddy => {
    const matchesSearch = buddy.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buddy.location?.city?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterest = selectedInterest === 'all' ||
                            buddy.interests?.some(i => i.toLowerCase().includes(selectedInterest.toLowerCase()));
    const matchesLocation = selectedLocation === 'all' ||
                           buddy.location?.city?.toLowerCase().includes(selectedLocation.toLowerCase());
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

      {/* Loading State */}
      {loading && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchBuddies}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-all"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Results */}
      {!loading && !error && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500">
                Showing <span className="text-cyan-400 font-semibold">{filteredBuddies.length}</span> local buddies
              </p>
              <button
                onClick={() => navigate('/become-local-buddy')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                <Award className="w-4 h-4" />
                Become a Buddy
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuddies.map((buddy, index) => (
                <motion.div
                  key={buddy._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* Badge */}
                  {buddy.isFeatured && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                      <span className="text-xs font-medium text-amber-400 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Profile */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={buddy.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'}
                        alt={buddy.displayName}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />
                      {buddy.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-rose-500 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{buddy.displayName}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {buddy.location?.city}, {buddy.location?.state}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Local since {new Date(buddy.createdAt).getFullYear()}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{buddy.bio}</p>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {buddy.interests?.slice(0, 3).map((interest) => (
                      <span key={interest} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                        {interest}
                      </span>
                    ))}
                    {buddy.interests?.length > 3 && (
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
                        <span className="font-bold text-sm">{buddy.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white/5">
                      <p className="font-bold text-sm">{buddy.reviewCount || 0}</p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white/5">
                      <p className="font-bold text-sm">{buddy.tripsCompleted || 0}</p>
                      <p className="text-xs text-gray-500">Trips</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white/5">
                      <p className="font-bold text-xs">{buddy.responseTime || 'N/A'}</p>
                      <p className="text-xs text-gray-500">Response</p>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {buddy.languages?.map((lang) => (
                      <span key={lang} className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-400">
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xl font-bold text-cyan-400">₹{buddy.dayRate?.toLocaleString()}</span>
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
      )}

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
