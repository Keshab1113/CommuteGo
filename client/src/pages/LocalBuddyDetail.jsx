import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Star, Loader2, ArrowLeft, CheckCircle, Award,
  Calendar, Clock, Languages, Heart, Share2, Info, MessageCircle,
  Camera, Music, Utensils, Mountain, BookOpen, Users, Sparkles,
  Tag, X
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

const interestIcons = {
  photography: Camera,
  music: Music,
  food: Utensils,
  adventure: Mountain,
  heritage: BookOpen,
  nature: Mountain,
  art: Sparkles,
  history: BookOpen,
  trekking: Mountain,
  cooking: Utensils,
  yoga: Users,
  spirituality: Sparkles,
  wildlife: Mountain,
};

const LocalBuddyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken, isLoggedIn } = useAuth();

  const [buddy, setBuddy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDates, setBookingDates] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchBuddy = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/local-buddies/${id}`);
      if (!res.ok) throw new Error('Failed to fetch buddy');
      const data = await res.json();
      setBuddy(data);
    } catch (error) {
      toast.error('Failed to load local buddy');
      navigate('/local-buddies');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, API_URL]);

  useEffect(() => {
    fetchBuddy();
  }, [fetchBuddy]);

  const handleBookRequest = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Please login to book a local buddy');
      return;
    }
    if (!buddy?.userId?._id) {
      toast.error('Unable to contact this buddy');
      return;
    }
    if (!bookingDates.trim() || !bookingMessage.trim()) {
      toast.error('Please fill in preferred dates and a message');
      return;
    }

    setBookingLoading(true);
    try {
      const convRes = await fetch(`${API_URL}/api/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          participantId: buddy.userId._id,
          type: 'direct',
          relatedTo: { type: 'localBuddy', id: buddy._id }
        }),
      });

      if (!convRes.ok) throw new Error('Failed to start conversation');
      const conversation = await convRes.json();

      const content = `Booking request for ${buddy.displayName}:\nDates: ${bookingDates}\n\n${bookingMessage}`;
      const msgRes = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          conversationId: conversation._id,
          content,
          type: 'text'
        }),
      });

      if (!msgRes.ok) throw new Error('Failed to send booking request');

      toast.success('Booking request sent! The buddy will reply soon.');
      setBookingOpen(false);
      setBookingDates('');
      setBookingMessage('');
    } catch (err) {
      toast.error(err.message || 'Failed to send booking request');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!buddy) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <Info className="w-16 h-16 text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold">Local buddy not found</h1>
        <Link to="/local-buddies" className="mt-4 text-cyan-400 hover:underline">
          Back to local buddies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <button
          onClick={() => navigate('/local-buddies')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to local buddies
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <img
                    src={buddy.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'}
                    alt={buddy.displayName}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover"
                  />
                  {buddy.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-rose-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{buddy.displayName}</h1>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        {buddy.location?.city}, {buddy.location?.state}, {buddy.location?.country || 'India'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{buddy.rating?.toFixed(1) || 'N/A'}</span>
                      <span className="text-sm text-gray-500">({buddy.reviewCount || 0} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Response: {buddy.responseTime || 'N/A'}</span>
                    </div>
                    {buddy.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs border border-amber-500/20">
                        <Award className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">About</h2>
                <p className="text-gray-300 leading-relaxed">{buddy.bio || 'No bio provided.'}</p>
              </div>
            </motion.div>

            {/* Languages */}
            {buddy.languages?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-emerald-400" /> Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {buddy.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-white/10 text-sm text-gray-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Interests */}
            {buddy.interests?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-rose-400" /> Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {buddy.interests.map((interest) => {
                    const Icon = interestIcons[interest.toLowerCase()] || Tag;
                    return (
                      <span
                        key={interest}
                        className="px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-white/10 text-sm text-gray-300 flex items-center gap-1.5"
                      >
                        <Icon className="w-3.5 h-3.5 text-cyan-400" />
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {buddy.certifications?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Certifications
                </h2>
                <ul className="space-y-2">
                  {buddy.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> {cert}
                    </li>
                  ))}
                </ul>
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
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-1">Day rate</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-cyan-400">₹{buddy.dayRate?.toLocaleString()}</span>
                  <span className="text-gray-400">/day</span>
                </div>
                {buddy.priceNegotiable && (
                  <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                    Negotiable
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4 text-cyan-400" /> Availability
                  </span>
                  <span className="font-medium">{buddy.availability || 'Flexible'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4 text-emerald-400" /> Trips completed
                  </span>
                  <span className="font-medium">{buddy.tripsCompleted || 0}</span>
                </div>
                {buddy.memberSince && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 text-amber-400" /> Member since
                    </span>
                    <span className="font-medium">{new Date(buddy.memberSince).getFullYear()}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-500 text-white font-medium hover:from-cyan-600 hover:to-rose-600 transition-all"
              >
                Book This Buddy
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Book {buddy.displayName}</h3>
              <button
                onClick={() => setBookingOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              Send a booking request with your preferred dates and message.
            </p>

            <form onSubmit={handleBookRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Preferred dates</label>
                <input
                  type="text"
                  value={bookingDates}
                  onChange={(e) => setBookingDates(e.target.value)}
                  placeholder="e.g. 12 Aug - 15 Aug 2026"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell the buddy about your plans..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-500 text-white font-medium hover:from-cyan-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {bookingLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MessageCircle className="w-4 h-4" />
                )}
                Send Request
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LocalBuddyDetail;
