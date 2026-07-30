import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, MapPin, Calendar, Users, Wallet, Shield, Star, Clock, Filter, MessageCircle, UserPlus, Sparkles, ArrowRight, ChevronRight, Compass, Camera, Mountain, Utensils, Loader2 } from 'lucide-react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const TravelMatchmaking = () => {
  const { authorizationToken, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for creating trip
  const [tripForm, setTripForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    maxParticipants: '',
    description: '',
    interests: []
  });

  const interests = [
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'food', label: 'Food & Dining', icon: Utensils },
    { id: 'nature', label: 'Nature', icon: Compass },
  ];

  useEffect(() => {
    fetchTrips();
    if (isLoggedIn) {
      fetchMyTrips();
    }
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips?limit=50`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setTrips(data.trips || []);
      } else {
        throw new Error('Failed to fetch trips');
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyTrips = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips/my/trips`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMyTrips(data || []);
      }
    } catch (err) {
      console.error('Failed to fetch my trips:', err);
    }
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Please login to create a trip');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(tripForm),
      });

      if (response.ok) {
        toast.success('Trip created successfully!');
        setTripForm({
          destination: '',
          startDate: '',
          endDate: '',
          budget: '',
          maxParticipants: '',
          description: '',
          interests: []
        });
        fetchMyTrips();
        setActiveTab('matches');
      } else {
        throw new Error('Failed to create trip');
      }
    } catch (err) {
      toast.error('Failed to create trip');
    }
  };

  const handleJoinTrip = async (tripId) => {
    if (!isLoggedIn) {
      toast.error('Please login to join a trip');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips/${tripId}/join`, {
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
    }
  };

  const toggleInterest = (interestId) => {
    setTripForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const filteredTrips = trips.filter(trip =>
    trip.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.interests?.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-emerald-500/10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Travel Matchmaking
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 to-emerald-400 bg-clip-text text-transparent">
                Travel Companions
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Don't travel alone. Find like-minded explorers heading to the same destination.
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
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
              <input
                type="text"
                placeholder="Search by destination, interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('find')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'find'
                  ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              Find Trips
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              Create Trip
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'matches'
                  ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              My Trips
            </button>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-rose-500" />
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchTrips}
              className="px-6 py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-all"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Content */}
      {!loading && !error && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-gray-500 mb-6">
              <span className="text-rose-400 font-semibold">{filteredTrips.length}</span> open trips available
            </p>

            {activeTab === 'find' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip, index) => (
                  <motion.div
                    key={trip._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all duration-300"
                  >
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{trip.destination}</h3>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-400" /> {trip.location?.name || 'N/A'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-semibold">{trip.creatorId?.rating || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Trip Creator */}
                      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                          {trip.creatorName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{trip.creatorName || 'Unknown'}</p>
                          <p className="text-xs text-gray-500">Created {new Date(trip.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{trip.description}</p>

                      {/* Trip Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-rose-400" />
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet className="w-4 h-4 text-emerald-400" /> ₹{trip.budget?.toLocaleString()}
                        </span>
                      </div>

                      {/* Interests */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trip.interests?.slice(0, 3).map((interest) => (
                          <span key={interest} className="px-2 py-0.5 rounded-full bg-white/5 text-xs">
                            {interest}
                          </span>
                        ))}
                      </div>

                      {/* Participants */}
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {trip.currentParticipants?.length || 1}/{trip.maxParticipants} travelers
                        </span>
                        {trip.safetyVerified && (
                          <Shield className="w-4 h-4 text-emerald-400 ml-2" />
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleJoinTrip(trip._id)}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-medium hover:from-rose-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          Join Trip
                        </button>
                        <button className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'create' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <h3 className="text-2xl font-bold mb-6 text-center">Create Your Trip</h3>

                  <form onSubmit={handleCreateTrip} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Destination</label>
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        value={tripForm.destination}
                        onChange={(e) => setTripForm({ ...tripForm, destination: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Date</label>
                        <input
                          type="date"
                          value={tripForm.startDate}
                          onChange={(e) => setTripForm({ ...tripForm, startDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">End Date</label>
                        <input
                          type="date"
                          value={tripForm.endDate}
                          onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Budget (₹)</label>
                        <input
                          type="number"
                          placeholder="Total budget per person"
                          value={tripForm.budget}
                          onChange={(e) => setTripForm({ ...tripForm, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Max Travelers</label>
                        <input
                          type="number"
                          placeholder="How many can join?"
                          value={tripForm.maxParticipants}
                          onChange={(e) => setTripForm({ ...tripForm, maxParticipants: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <button
                            key={interest.id}
                            type="button"
                            onClick={() => toggleInterest(interest.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                              tripForm.interests.includes(interest.id)
                                ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <interest.icon className="w-4 h-4" />
                            {interest.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Trip Description</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your trip plans, who you're looking for..."
                        value={tripForm.description}
                        onChange={(e) => setTripForm({ ...tripForm, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-semibold hover:from-rose-600 hover:to-emerald-600 transition-all"
                    >
                      Create Trip
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === 'matches' && (
              <div>
                {myTrips.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <Sparkles className="w-16 h-16 text-rose-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">No Trips Yet</h3>
                    <p className="text-gray-400 mb-6">Create your first trip to find travel companions</p>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-medium hover:from-rose-600 hover:to-emerald-600 transition-all"
                    >
                      Create a Trip
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myTrips.map((trip) => (
                      <motion.div
                        key={trip._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-3xl bg-white/5 border border-white/10"
                      >
                        <h3 className="text-xl font-bold mb-2">{trip.destination}</h3>
                        <p className="text-sm text-gray-400 mb-4">
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            trip.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' :
                            trip.status === 'closed' ? 'bg-gray-500/10 text-gray-400' :
                            'bg-rose-500/10 text-rose-400'
                          }`}>
                            {trip.status}
                          </span>
                          <span className="text-sm text-gray-400">
                            {trip.currentParticipants?.length || 1}/{trip.maxParticipants} travelers
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* How Matching Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 to-emerald-500/10 border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-2">How Matching Works</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Our algorithm matches you with travelers based on destination, dates, budget, interests, and travel style.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Search, label: 'Search' },
                { icon: Heart, label: 'Like' },
                { icon: Users, label: 'Match' },
                { icon: Compass, label: 'Travel' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-rose-400" />
                  </div>
                  <span className="font-medium">{step.label}</span>
                  {i < 3 && <ChevronRight className="w-4 h-4 text-gray-600" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TravelMatchmaking;
