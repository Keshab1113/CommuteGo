import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Search, Calendar, Users, Shield, Star, Clock, Heart, Share2, Camera, Mountain, TreePine, Tent, Utensils, Waves, Building, Compass, ChevronDown, X, Loader2, Plus, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const HiddenDestinations = () => {
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: Compass },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'nature', label: 'Nature', icon: TreePine },
    { id: 'peaceful', label: 'Peaceful', icon: Heart },
    { id: 'weekend', label: 'Weekend Getaway', icon: Calendar },
    { id: 'camping', label: 'Camping', icon: Tent },
    { id: 'food', label: 'Food & Culture', icon: Utensils },
    { id: 'beach', label: 'Beach', icon: Waves },
    { id: 'heritage', label: 'Heritage', icon: Building },
    { id: 'photography', label: 'Photography', icon: Camera },
  ];

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/destinations?limit=50`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setDestinations(data.destinations || []);
      } else {
        throw new Error('Failed to fetch destinations');
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter === 'all' || dest.tags?.includes(activeFilter);
    const matchesSearch = dest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || dest.difficulty === selectedDifficulty;
    const matchesBudget = selectedBudget === 'all' ||
                          (selectedBudget === 'low' && dest.estimatedBudget < 4000) ||
                          (selectedBudget === 'medium' && dest.estimatedBudget >= 4000 && dest.estimatedBudget < 8000) ||
                          (selectedBudget === 'high' && dest.estimatedBudget >= 8000);
    return matchesFilter && matchesSearch && matchesDifficulty && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-cyan-500/10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
              <Compass className="w-4 h-4" />
              Hidden Destinations
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Discover India's
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Hidden Gems
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Beyond tourist traps. Beyond crowded destinations. Find authentic India with us.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
              <input
                type="text"
                placeholder="Search destinations, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Additional Filters */}
            <div className="flex gap-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Budget</option>
                <option value="low">Budget (Under ₹4K)</option>
                <option value="medium">Mid-range (₹4K-8K)</option>
                <option value="high">Premium (₹8K+)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              Showing <span className="text-emerald-400 font-semibold">{filteredDestinations.length}</span> destinations
            </p>
            <button
              onClick={() => navigate('/add-destination')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              <Gift className="w-4 h-4" />
              Add & Earn Discount
            </button>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchDestinations}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Destinations Grid */}
      {!loading && !error && (
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4">
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-20">
                <Compass className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.images?.[0] || 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=600&h=400&fit=crop'}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Quick Tags */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                          {destination.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                          <Shield className="w-3 h-3 text-emerald-400" /> {destination.safetyScore || 'N/A'}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        {destination.location?.name || 'Unknown'}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{destination.description}</p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-semibold">{destination.rating || 'N/A'}</span>
                        </div>
                        <span className="text-gray-500 text-sm">({destination.reviewCount || 0} reviews)</span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {destination.bestSeason?.join(', ') || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {destination.crowdLevel || 'N/A'}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-emerald-400">₹{destination.estimatedBudget?.toLocaleString()}</span>
                      </div>

                      {/* CTA */}
                      <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all">
                        Explore Destination
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HiddenDestinations;
