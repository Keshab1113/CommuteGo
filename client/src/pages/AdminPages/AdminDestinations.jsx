import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, MapPin, Shield, Loader2, Clock, Check, X, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { destinationsApi } from '../../services/api/adminApi';

const AdminDestinations = () => {
  const navigate = useNavigate();
  const [approvedDestinations, setApprovedDestinations] = useState([]);
  const [pendingDestinations, setPendingDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('approved');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const [approvedRes, pendingRes] = await Promise.all([
        destinationsApi.getAll({ limit: 100 }),
        destinationsApi.getPending()
      ]);
      setApprovedDestinations(approvedRes.data.destinations || []);
      setPendingDestinations(pendingRes.data.destinations || []);
    } catch (error) {
      toast.error('Failed to fetch destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id, status) => {
    try {
      await destinationsApi.review(id, { status });
      toast.success(`Destination ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      fetchDestinations();
    } catch (error) {
      toast.error(`Failed to ${status} destination`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await destinationsApi.delete(id);
        toast.success('Destination deleted successfully');
        fetchDestinations();
      } catch (error) {
        toast.error('Failed to delete destination');
      }
    }
  };

  const filteredDestinations = (activeTab === 'approved' ? approvedDestinations : pendingDestinations).filter(dest =>
    dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Destinations</h1>
          <p className="text-sm text-gray-500">Manage hidden destinations</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Tabs */}
          <div className="flex bg-[#1C1B1B] rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'approved'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Approved ({approvedDestinations.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              Pending ({pendingDestinations.length})
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
        </div>
      ) : filteredDestinations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 rounded-3xl bg-[#1C1B1B] border border-white/10"
        >
          <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-white">No {activeTab === 'approved' ? 'Approved' : 'Pending'} Destinations</h3>
          <p className="text-gray-500">
            {activeTab === 'pending' ? 'All destinations have been reviewed!' : 'No approved destinations yet.'}
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Destination</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Location</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Difficulty</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Budget</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Safety</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDestinations.map((dest) => (
                  <tr key={dest._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={dest.images?.[0] || 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=100&h=100&fit=crop'}
                          alt={dest.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <button
                            onClick={() => navigate(`/admin/destinations/${dest._id}`)}
                            className="font-medium text-white hover:text-cyan-400 transition-colors text-left"
                          >
                            {dest.name}
                          </button>
                          {dest.submittedBy === 'user' && (
                            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                              User Submit
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        {dest.location?.name || 'Unknown'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        dest.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                        dest.difficulty === 'Moderate' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {dest.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      ₹{dest.estimatedBudget?.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">{dest.safetyScore}/10</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {activeTab === 'pending' ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
                          Pending Review
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                          Approved
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={() => handleReview(dest._id, 'approved')}
                              className="p-2 rounded-lg hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReview(dest._id, 'rejected')}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => navigate(`/admin/destinations/${dest._id}`)}
                          className="p-2 rounded-lg hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(dest._id)}
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

export default AdminDestinations;
