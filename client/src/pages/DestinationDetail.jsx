import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Shield, Star, Loader2, ArrowLeft, Calendar, Users,
  DollarSign, Tag, Clock, Heart, Share2, Info, Compass,
  Navigation, Map as MapIcon, Bus, Train, Plane, Car,
  CheckCircle, UserPlus, Wallet
} from 'lucide-react';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { useAuth } from '../store/auth';

const modeIcons = {
  Bus: Bus,
  Train: Train,
  Flight: Plane,
  'Personal Car': Car,
};

const modeColors = {
  Bus: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Train: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Flight: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Personal Car': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken, isLoggedIn } = useAuth();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const [buddies, setBuddies] = useState([]);
  const [buddiesLoading, setBuddiesLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [joiningTripId, setJoiningTripId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchDestination = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/destinations/${id}`);
      if (!res.ok) throw new Error('Failed to fetch destination');
      const data = await res.json();
      setDestination(data);
    } catch (error) {
      toast.error('Failed to load destination');
      navigate('/hidden-destinations');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, API_URL]);

  const fetchRelated = useCallback(async () => {
    if (!destination) return;
    const location = destination.location?.name || destination.name;

    setBuddiesLoading(true);
    setTripsLoading(true);
    try {
      const [buddiesRes, tripsRes] = await Promise.all([
        fetch(`${API_URL}/api/local-buddies?search=${encodeURIComponent(location)}&limit=8`),
        fetch(`${API_URL}/api/trips?destination=${encodeURIComponent(location)}&limit=8`)
      ]);

      if (buddiesRes.ok) {
        const buddiesData = await buddiesRes.json();
        setBuddies(buddiesData.buddies || []);
      }
      if (tripsRes.ok) {
        const tripsData = await tripsRes.json();
        setTrips(tripsData.trips || []);
      }
    } catch (error) {
      // Silent: related content is optional
    } finally {
      setBuddiesLoading(false);
      setTripsLoading(false);
    }
  }, [destination, API_URL]);

  useEffect(() => {
    fetchDestination();
  }, [fetchDestination]);

  useEffect(() => {
    fetchRelated();
  }, [fetchRelated]);

  const sanitizedHtml = (html) => ({
    __html: DOMPurify.sanitize(html || '')
  });

  const isSafeMapUrl = (url) => {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  };

  const handleJoinTrip = async (tripId, e) => {
    e?.stopPropagation();
    if (!isLoggedIn) {
      toast.error('Please login to request joining this trip');
      return;
    }

    setJoiningTripId(tripId);
    try {
      const response = await fetch(`${API_URL}/api/trips/${tripId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ message: 'I would like to join this trip!' }),
      });

      if (response.ok) {
        toast.success('Join request sent!');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to join trip');
      }
    } catch (err) {
      toast.error('Failed to join trip');
    } finally {
      setJoiningTripId(null);
    }
  };

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

  const hasHowToReach = destination.howToReach && destination.howToReach.length > 0;
  const hasMap = isSafeMapUrl(destination.mapEmbedUrl);

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
                    className="ql-preview"
                    dangerouslySetInnerHTML={sanitizedHtml(destination.blogContent)}
                  />
                )}

                {destination.additionalDetails && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-emerald-400">Additional Details</h3>
                    <div
                      className="ql-preview"
                      dangerouslySetInnerHTML={sanitizedHtml(destination.additionalDetails)}
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* How to Reach */}
            {(hasHowToReach || hasMap) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-rose-400" /> How to Reach
                </h2>

                {hasHowToReach && (
                  <div className="space-y-6 mb-8">
                    {destination.howToReach.map((route, routeIndex) => {
                      const ModeIcon = modeIcons[route.mode] || Navigation;
                      return (
                        <div
                          key={routeIndex}
                          className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${modeColors[route.mode] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                              <ModeIcon className="w-3.5 h-3.5" /> {route.mode}
                            </span>
                            <span className="text-sm text-gray-500">Route {routeIndex + 1}</span>
                          </div>
                          <ol className="space-y-3">
                            {route.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-gray-300 text-xs font-bold flex items-center justify-center">
                                  {stepIndex + 1}
                                </span>
                                <span className="text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      );
                    })}
                  </div>
                )}

                {hasMap && (
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <MapIcon className="w-5 h-5 text-emerald-400" /> Location on Map
                    </h3>
                    <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
                      <iframe
                        src={destination.mapEmbedUrl}
                        title={`${destination.name} map`}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Local Buddies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6 text-cyan-400" /> Local Buddies in {destination.location?.name || 'this area'}
                </h2>
                <Link
                  to="/local-buddies"
                  className="text-sm text-cyan-400 hover:underline"
                >
                  View all
                </Link>
              </div>

              {buddiesLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                </div>
              ) : buddies.length === 0 ? (
                <div className="text-center py-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">No local buddies available in this location yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {buddies.map((buddy) => (
                    <button
                      key={buddy._id}
                      onClick={() => navigate(`/local-buddies/${buddy._id}`)}
                      className="text-left p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={buddy.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                          alt={buddy.displayName}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold truncate">{buddy.displayName}</h3>
                            {buddy.isVerified && (
                              <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400 flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {buddy.location?.city}, {buddy.location?.state}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{buddy.bio}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-medium">{buddy.rating?.toFixed(1) || 'N/A'}</span>
                              <span className="text-xs text-gray-500">({buddy.reviewCount || 0})</span>
                            </div>
                            <span className="text-sm font-bold text-cyan-400">₹{buddy.dayRate?.toLocaleString()}/day</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Perfect Travel Companions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Compass className="w-6 h-6 text-rose-400" /> Perfect Travel Companions
                </h2>
                <Link
                  to="/trips"
                  className="text-sm text-rose-400 hover:underline"
                >
                  View all trips
                </Link>
              </div>

              {tripsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                </div>
              ) : trips.length === 0 ? (
                <div className="text-center py-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <Compass className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">No open trips heading to this destination right now.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trips.map((trip) => (
                    <div
                      key={trip._id}
                      onClick={() => navigate(`/trips/${trip._id}`)}
                      className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-rose-500/30 transition-all cursor-pointer group"
                    >
                      <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                        <img
                          src={trip.image || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop'}
                          alt={trip.destination}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium capitalize">
                          {trip.tripStatus}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg mb-1">{trip.destination}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{trip.description}</p>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-rose-400" />
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet className="w-4 h-4 text-emerald-400" /> ₹{trip.budget?.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          {trip.currentParticipants?.length || 1}/{trip.maxParticipants}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleJoinTrip(trip._id, e)}
                        disabled={joiningTripId === trip._id}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white text-sm font-medium hover:from-rose-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {joiningTripId === trip._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <UserPlus className="w-4 h-4" />
                        )}
                        Request to Join
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Tags */}
            {destination.tags?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
