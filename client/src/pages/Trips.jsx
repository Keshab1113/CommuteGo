import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import SimpleSelect from '../components/ui/SimpleSelect';
import {
  Heart,
  Search,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Shield,
  Star,
  UserPlus,
  MessageCircle,
  Compass,
  Camera,
  Mountain,
  Utensils,
  Backpack,
  Loader2,
  Sparkles,
  ChevronRight,
  Tag,
} from 'lucide-react';

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

const Trips = () => {
  const { authorizationToken, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ interests: [], destinations: [] });
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  useEffect(() => {
    fetchTrips();
    fetchFilterOptions();
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

  const fetchFilterOptions = async () => {
    setFiltersLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips/filters`);
      if (response.ok) {
        const data = await response.json();
        setFilterOptions({
          interests: data.interests || [],
          destinations: data.destinations || [],
        });
      }
    } catch (err) {
      console.error('Failed to fetch trip filter options:', err);
      toast.error('Failed to load filter options');
    } finally {
      setFiltersLoading(false);
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

  const handleMessageCreator = async (trip) => {
    if (!isLoggedIn) {
      toast.error('Please login to message the trip creator');
      return;
    }

    const creatorId = trip.creatorId?._id || trip.creatorId;
    if (!creatorId) {
      toast.error('Trip creator not found');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          participantId: creatorId,
          type: 'direct',
          relatedTo: { type: 'trip', id: trip._id },
        }),
      });

      if (response.ok) {
        const conversation = await response.json();
        navigate(`/conversations/${conversation._id}`);
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to start conversation');
      }
    } catch (err) {
      toast.error('Failed to start conversation');
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = !searchQuery ||
                         trip.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.interests?.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesInterest = selectedInterest === 'all' ||
                            trip.interests?.some((i) => i.toLowerCase() === selectedInterest.toLowerCase());
    const matchesDestination = selectedDestination === 'all' ||
                               trip.destination?.toLowerCase() === selectedDestination.toLowerCase();
    const matchesBudget = selectedBudget === 'all' ||
                          (selectedBudget === 'low' && trip.budget < 5000) ||
                          (selectedBudget === 'medium' && trip.budget >= 5000 && trip.budget < 15000) ||
                          (selectedBudget === 'high' && trip.budget >= 15000);
    return matchesSearch && matchesInterest && matchesDestination && matchesBudget;
  });

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
              All Trips
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Find Your Next
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 to-emerald-400 bg-clip-text text-transparent">
                Adventure Together
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Browse all open trips from travelers across India. Join one or create your own.
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

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Interest Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedInterest('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedInterest === 'all'
                    ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <Compass className="w-4 h-4" />
                All
              </button>

              {filtersLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
              ) : (
                filterOptions.interests.map((interest) => {
                  const Icon = interestIcons[interest.toLowerCase()] || Tag;
                  return (
                    <button
                      key={interest}
                      onClick={() => setSelectedInterest(interest)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedInterest.toLowerCase() === interest.toLowerCase()
                          ? 'bg-gradient-to-r from-rose-500 to-emerald-500 text-white'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {interest.charAt(0).toUpperCase() + interest.slice(1)}
                    </button>
                  );
                })
              )}
            </div>

            {/* Additional Filters */}
            <div className="flex flex-wrap gap-3">
              {filterOptions.destinations.length > 0 && (
                <SimpleSelect
                  value={selectedDestination}
                  onChange={setSelectedDestination}
                  placeholder="All Destinations"
                  options={[
                    { value: 'all', label: 'All Destinations' },
                    ...filterOptions.destinations.map((dest) => ({
                      value: dest,
                      label: dest,
                    })),
                  ]}
                  triggerClassName="min-w-[160px]"
                />
              )}

              <SimpleSelect
                value={selectedBudget}
                onChange={setSelectedBudget}
                placeholder="All Budget"
                options={[
                  { value: 'all', label: 'All Budget' },
                  { value: 'low', label: 'Budget (Under ₹5K)' },
                  { value: 'medium', label: 'Mid-range (₹5K-15K)' },
                  { value: 'high', label: 'Premium (₹15K+)' },
                ]}
                triggerClassName="min-w-[160px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              Showing <span className="text-rose-400 font-semibold">{filteredTrips.length}</span> open trips
            </p>
            <button
              onClick={() => navigate('/create-trip')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Create Trip
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

      {/* Trips Grid */}
      {!loading && !error && (
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4">
            {filteredTrips.length === 0 ? (
              <div className="text-center py-20">
                <Backpack className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No trips found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => navigate('/create-trip')}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-medium hover:from-rose-600 hover:to-emerald-600 transition-all"
                >
                  Create a Trip
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip, index) => (
                  <motion.div
                    key={trip._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/trips/${trip._id}`)}
                    className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all duration-300 cursor-pointer"
                  >
                    {/* Cover */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={trip.image || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop'}
                        alt={trip.destination}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                          {trip.tripStatus || 'open'}
                        </span>
                        {trip.safetyVerified && (
                          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                            <Shield className="w-3 h-3 text-emerald-400" /> Verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{trip.destination}</h3>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-400" /> {trip.location?.name || 'India'}
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
                      </div>

                      {/* CTA */}
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleJoinTrip(trip._id); }}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-medium hover:from-rose-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          Join Trip
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleMessageCreator(trip); }}
                          className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 to-emerald-500/10 border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-2">How Trip Matching Works</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Search open trips, filter by your interests and budget, then request to join. Travel better together.
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

export default Trips;
