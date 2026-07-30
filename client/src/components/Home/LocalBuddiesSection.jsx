import { motion } from 'framer-motion';
import { MapPin, Star, Shield, Users, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LocalBuddiesSection = ({ buddies, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-rose-500" />
        </div>
      </section>
    );
  }

  return (
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

        {/* Advertisement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 border border-rose-500/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Become a Local Buddy!</h3>
                <p className="text-gray-400">Share your city with travelers and earn while doing what you love.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/become-local-buddy')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/25 flex items-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Apply Now
            </button>
          </div>

          {/* Benefits */}
          <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-rose-400"></div>
              Earn ₹500-5000/day
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              Flexible Schedule
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              Meet Travelers Worldwide
            </div>
          </div>
        </motion.div>

        {buddies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 rounded-3xl bg-white/5 border border-white/10"
          >
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Local Buddies Yet</h3>
            <p className="text-gray-400 mb-4">Be the first to become a local buddy!</p>
            <button
              onClick={() => navigate('/become-local-buddy')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium"
            >
              Add Local Buddy
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {buddies.map((buddy, index) => (
                <motion.div
                  key={buddy._id}
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
                        src={buddy.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'}
                        alt={buddy.displayName}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      {buddy.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{buddy.displayName}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {buddy.location?.city}, {buddy.location?.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {buddy.interests?.slice(0, 3).map((interest) => (
                      <span key={interest} className="px-3 py-1 rounded-full bg-white/5 text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 rounded-xl bg-white/5">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="font-bold">{buddy.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white/5">
                      <p className="font-bold">{buddy.reviewCount || 0}</p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white/5">
                      <p className="font-bold text-xs">{buddy.responseTime || '< 1h'}</p>
                      <p className="text-xs text-gray-500">Response</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {buddy.languages?.slice(0, 3).map((lang) => (
                      <span key={lang} className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-400">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold text-rose-400">₹{buddy.dayRate?.toLocaleString()}/day</span>
                    <button onClick={() => navigate('/local-buddies')} className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-all">
                      View Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button onClick={() => navigate('/local-buddies')} className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all inline-flex items-center gap-2">
                View All Local Buddies <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LocalBuddiesSection;
