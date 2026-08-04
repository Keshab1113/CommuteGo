import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Loader2, ArrowLeft, Calendar, Users, Wallet,
  Shield, Heart, Share2, Info, Compass, UserPlus,
  CheckCircle, Clock, Tag, Camera, Mountain, Utensils, Backpack,
  Sparkles
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

const interestIcons = {
  photography: Camera,
  adventure: Mountain,
  food: Utensils,
  nature: Compass,
  trekking: Mountain,
  camping: Backpack,
  spirituality: Sparkles,
  wildlife: Compass,
};

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken, isLoggedIn, user } = useAuth();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTrip = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/trips/${id}`);
      if (!res.ok) throw new Error('Failed to fetch trip');
      const data = await res.json();
      setTrip(data);
    } catch (error) {
      toast.error('Failed to load trip');
      navigate('/trips');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, API_URL]);

  useEffect(() => {
    fetchTrip();
  }, [fetchTrip]);

  const handleJoinTrip = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to join this trip');
      return;
    }

    setJoining(true);
    try {
      const response = await fetch(`${API_URL}/api/trips/${id}/join`, {
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
      setJoining(false);
    }
  };

  const isCreator = user && trip?.creatorId?._id === user._id;
  const isParticipant = user && trip?.currentParticipants?.some(p => p._id === user._id);
  const canJoin = trip?.tripStatus === 'open' && !isCreator && !isParticipant;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <Info className="w-16 h-16 text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold">Trip not found</h1>
        <Link to="/trips" className="mt-4 text-rose-400 hover:underline">
          Back to trips
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <button
          onClick={() => navigate('/trips')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to trips
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden bg-[#1C1B1B] border border-white/10"
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={trip.image || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&h=800&fit=crop'}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium capitalize">
                      {trip.tripStatus}
                    </span>
                    {trip.safetyVerified && (
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" /> Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">{trip.destination}</h1>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <MapPin className="w-5 h-5 text-rose-400" />
                {trip.destination}
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{trip.description}</p>
            </motion.div>

            {/* Trip Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" /> Trip Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-rose-400" /> Dates
                  </p>
                  <p className="font-medium">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Wallet className="w-4 h-4 text-emerald-400" /> Budget
                  </p>
                  <p className="font-medium">₹{trip.budget?.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-cyan-400" /> Participants
                  </p>
                  <p className="font-medium">
                    {trip.currentParticipants?.length || 1} / {trip.maxParticipants}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-amber-400" /> Created
                  </p>
                  <p className="font-medium">{new Date(trip.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            {trip.interests?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-cyan-400" /> Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trip.interests.map((interest) => {
                    const Icon = interestIcons[interest.toLowerCase()] || Tag;
                    return (
                      <span
                        key={interest}
                        className="px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-white/10 text-sm text-gray-300 flex items-center gap-1.5"
                      >
                        <Icon className="w-3.5 h-3.5 text-rose-400" />
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Participants */}
            {trip.currentParticipants?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" /> Travelers
                </h2>
                <div className="flex flex-wrap gap-3">
                  {trip.currentParticipants.map((participant) => (
                    <div key={participant._id} className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a] border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                        {participant.username?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{participant.username || 'Traveler'}</p>
                        <p className="text-xs text-gray-500">{participant.email}</p>
                      </div>
                    </div>
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
              <h3 className="text-lg font-bold mb-4">Trip Creator</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white text-xl font-bold"
                  style={trip.creatorAvatar ? { backgroundImage: `url(${trip.creatorAvatar})`, backgroundSize: 'cover' } : {}}
                >
                  {!trip.creatorAvatar && (trip.creatorName?.charAt(0) || 'U')}
                </div>
                <div>
                  <p className="font-bold">{trip.creatorName || 'Anonymous Traveler'}</p>
                  <p className="text-sm text-gray-400">{trip.creatorId?.email}</p>
                </div>
              </div>

              {canJoin ? (
                <button
                  onClick={handleJoinTrip}
                  disabled={joining}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-medium hover:from-rose-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {joining ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  Request to Join
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">
                    {isCreator ? 'You created this trip' : 'You are already part of this trip'}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
