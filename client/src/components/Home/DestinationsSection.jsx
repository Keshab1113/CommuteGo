import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Shield, Heart, Compass, ArrowRight, Loader2, Mountain, TreePine, Tent, Utensils, Camera as CameraIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const DestinationsSection = ({ destinations, loading }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDestinations = activeFilter === 'all'
    ? destinations
    : destinations.filter(d => d.tags?.includes(activeFilter));

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div className='  w-full flex justify-center items-center flex-col text-center'>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
              <Compass className="w-4 h-4" />
              Hidden Destinations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Explore Beyond
              </span>
              {" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                The Ordinary
              </span>
            </h2>
          </div>
          
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

        {/* Advertisement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 border border-cyan-500/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Share Hidden Gems & Earn Rewards!</h3>
                <p className="text-gray-400">Know a beautiful offbeat destination? Add it and unlock exclusive discounts!</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <div className="text-center px-4 py-2 rounded-xl bg-white/5">
                  <span className="block text-2xl font-bold text-cyan-400">10+</span>
                  <span className="text-xs text-gray-400">Approved</span>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-white/5">
                  <span className="block text-2xl font-bold text-emerald-400">20%</span>
                  <span className="text-xs text-gray-400">Discount</span>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-white/5">
                  <span className="block text-2xl font-bold text-amber-400">50%</span>
                  <span className="text-xs text-gray-400">Discount</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/add-destination')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Add Destination
              </button>
            </div>
          </div>

          {/* Reward Tiers */}
          <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              10 Approved Destinations = 10% Discount
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              20 Approved Destinations = 20% Discount
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              50 Approved Destinations = 50% Discount
            </div>
          </div>
        </motion.div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 rounded-3xl bg-white/5 border border-white/10"
          >
            <Compass className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Destinations Yet</h3>
            <p className="text-gray-400 mb-4">Be the first to add a hidden destination!</p>
            <button
              onClick={() => navigate('/add-destination')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium"
            >
              Add Destination
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Image */}
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/hidden-destinations/${destination._id}`)}
                >
                  <img
                    src={destination.images?.[0] || 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=600&h=400&fit=crop'}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                      {destination.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-400" /> {destination.safetyScore}
                    </span>
                  </div>

                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 cursor-pointer" onClick={() => navigate(`/hidden-destinations/${destination._id}`)}>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    {destination.location?.name || 'Unknown'}
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-cyan-400 transition-colors">{destination.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{destination.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {destination.bestSeason?.join(', ') || 'All seasons'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {destination.crowdLevel}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-emerald-400">₹{destination.estimatedBudget?.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div className=' w-full flex justify-center items-center mt-10'>
        <button onClick={() => navigate('/hidden-destinations')} className="mt-4 md:mt-0 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2">
            View All Destinations <ArrowRight className="w-4 h-4" />
          </button>
          </div>
      </div>
    </section>
  );
};

DestinationsSection.propTypes = {
  destinations: PropTypes.array,
  loading: PropTypes.bool
};

export default DestinationsSection;
