import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, MapPin, Calendar, Users, Loader2, Check, X, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tripsApi } from '../../services/api/adminApi';

const AdminTrips = () => {
  const navigate = useNavigate();
  const [approvedTrips, setApprovedTrips] = useState([]);
  const [pendingTrips, setPendingTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('approved');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const [approvedRes, pendingRes] = await Promise.all([
        tripsApi.getAll({ limit: 100 }),
        tripsApi.getPending()
      ]);
      setApprovedTrips(approvedRes.data.trips || []);
      setPendingTrips(pendingRes.data.trips || []);
    } catch (error) {
      toast.error('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id, status) => {
    try {
      await tripsApi.review(id, { status });
      toast.success(`Trip ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      fetchTrips();
    } catch (error) {
      toast.error(`Failed to ${status} trip`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await tripsApi.delete(id);
        toast.success('Trip deleted successfully');
        fetchTrips();
      } catch (error) {
        toast.error('Failed to delete trip');
      }
    }
  };

  const filteredTrips = (activeTab === 'approved' ? approvedTrips : pendingTrips).filter(trip =>
    trip.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-emerald-500/10 text-emerald-400';
      case 'completed': return 'bg-blue-500/10 text-blue-400';
      case 'cancelled': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Trips</h1>
          <p className="text-sm text-gray-500">Manage travel matchmaking trips</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Tabs */}
          <div className="flex bg-[#1C1B1B] rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'approved'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Approved ({approvedTrips.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              Pending ({pendingTrips.length})
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      ) : filteredTrips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 rounded-3xl bg-[#1C1B1B] border border-white/10"
        >
          <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-white">No {activeTab === 'approved' ? 'Approved' : 'Pending'} Trips</h3>
          <p className="text-gray-500">
            {activeTab === 'pending' ? 'All trips have been reviewed!' : 'No approved trips yet.'}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-[#1C1B1B] border border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-[#0a0a0a]">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Trip</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Destination</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Dates</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Budget</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Participants</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrips.map((trip) => (
                  <tr
                    key={trip._id}
                    onClick={() => navigate(`/admin/trips/${trip._id}`)}
                    className="border-b border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={trip.image || 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=100&h=100&fit=crop'}
                          alt={trip.destination}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <span className="font-medium text-white">{trip.destination}</span>
                          {trip.submittedBy === 'user' && (
                            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                              User Submit
                            </span>
                          )}
                        </div>
                      </div>
                      {trip.submittedBy === 'user' && trip.creatorId && (
                        <p className="text-xs text-gray-500 mt-1">{trip.creatorId.email}</p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        {trip.destination}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      ₹{trip.budget?.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{trip.currentParticipants?.length || 0}/{trip.maxParticipants}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {activeTab === 'pending' ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
                          Pending Review
                        </span>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.tripStatus)}`}>
                          {trip.tripStatus}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReview(trip._id, 'approved'); }}
                              className="p-2 rounded-lg hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReview(trip._id, 'rejected'); }}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(trip._id); }}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminTrips;
