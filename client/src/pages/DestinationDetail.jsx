import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Shield, Star, Loader2, ArrowLeft, Calendar, Users,
  DollarSign, Tag, Clock, Heart, Share2, Info, Compass
} from 'lucide-react';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const fetchDestination = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/destinations/${id}`);
      if (!res.ok) throw new Error('Failed to fetch destination');
      const data = await res.json();
      setDestination(data);
    } catch (error) {
      toast.error('Failed to load destination');
      navigate('/hidden-destinations');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchDestination();
  }, [fetchDestination]);

  const sanitizedHtml = (html) => ({
    __html: DOMPurify.sanitize(html || '')
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <Info className="w-16 h-16 text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold">Destination not found</h1>
        <Link to="/hidden-destinations" className="mt-4 text-cyan-400 hover:underline">
          Back to destinations
        </Link>
      </div>
    );
  }

  const images = destination.images?.length > 0 ? destination.images : [
    'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=1200&h=800&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <button
          onClick={() => navigate('/hidden-destinations')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to destinations
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden bg-[#1C1B1B] border border-white/10"
            >
              <div className="relative aspect-video">
                <img
                  src={images[activeImage]}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-cyan-500' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`${destination.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    {destination.location?.name || 'Unknown location'}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    ₹{destination.estimatedBudget?.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">{destination.description}</p>
            </motion.div>

            {/* Blog Content */}
            {(destination.blogContent || destination.additionalDetails) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-cyan-400" /> About this destination
                </h2>

                {destination.blogContent && (
                  <div
                    className="prose prose-invert max-w-none ql-preview"
                    dangerouslySetInnerHTML={sanitizedHtml(destination.blogContent)}
                  />
                )}

                {destination.additionalDetails && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-emerald-400">Additional Details</h3>
                    <div
                      className="prose prose-invert max-w-none ql-preview"
                      dangerouslySetInnerHTML={sanitizedHtml(destination.additionalDetails)}
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Tags */}
            {destination.tags?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-rose-400" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-gray-700 text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
            >
              <h3 className="text-lg font-bold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Shield className="w-4 h-4 text-cyan-400" /> Safety
                  </span>
                  <span className="font-medium">{destination.safetyScore}/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4 text-emerald-400" /> Crowd
                  </span>
                  <span className="font-medium">{destination.crowdLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Star className="w-4 h-4 text-amber-400" /> Difficulty
                  </span>
                  <span className="font-medium">{destination.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <DollarSign className="w-4 h-4 text-rose-400" /> Budget
                  </span>
                  <span className="font-medium">₹{destination.estimatedBudget?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4 text-purple-400" /> Best Season
                  </span>
                  <span className="font-medium text-right">{destination.bestSeason?.join(', ') || 'N/A'}</span>
                </div>
                {destination.timeRequired && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 text-orange-400" /> Time Required
                    </span>
                    <span className="font-medium">{destination.timeRequired}</span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-6"
            >
              <h3 className="text-lg font-bold mb-2">Want to visit?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Connect with local buddies and travelers heading to this destination.
              </p>
              <button
                onClick={() => navigate('/local-buddies')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all"
              >
                Find Local Buddies
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
