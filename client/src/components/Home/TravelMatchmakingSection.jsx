import { motion } from 'framer-motion';
import { Calendar, Wallet, Heart, ArrowRight, Loader2, Users, MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravelMatchmakingSection = ({ trips, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
        </div>
      </section>
    );
  }

  return (
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

        {/* Advertisement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 border border-emerald-500/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Create a Trip & Find Companions!</h3>
                <p className="text-gray-400">Don't travel alone. Find like-minded explorers for your next adventure.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/create-trip')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Create Trip
            </button>
          </div>

          {/* Benefits */}
          <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              Find Travel Buddies
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              Split Travel Costs
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              Make New Friends
            </div>
          </div>
        </motion.div>

        {trips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 rounded-3xl bg-white/5 border border-white/10"
          >
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Trips Yet</h3>
            <p className="text-gray-400 mb-4">Be the first to create a trip!</p>
            <button
              onClick={() => navigate('/create-trip')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium"
            >
              Create Trip
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={trip.image || 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=400&h=300&fit=crop'}
                      alt={trip.destination}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                      {trip.maxParticipants - trip.currentParticipants} spots left
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{trip.destination}</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {trip.interests?.slice(0, 3).map((interest) => (
                        <span key={interest} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wallet className="w-4 h-4" /> ₹{trip.budget?.toLocaleString()}
                      </span>
                    </div>

                    <button onClick={() => navigate('/travel-matchmaking')} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all">
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
              <button onClick={() => navigate('/travel-matchmaking')} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25">
                Start a Trip
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default TravelMatchmakingSection;
