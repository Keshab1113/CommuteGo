import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, MapPin, Shield, Star, Loader2, Check, X, Clock, Award, Users } from 'lucide-react';
import { useAuth } from '../../store/auth';
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { localBuddiesApi } from '../../services/api/adminApi';

const AdminLocalBuddies = () => {
  const { authorizationToken } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const [approvedBuddies, setApprovedBuddies] = useState([]);
  const [pendingBuddies, setPendingBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('approved');

  useEffect(() => {
    fetchBuddies();
  }, []);

  const fetchBuddies = async () => {
    setLoading(true);
    try {
      const [approvedRes, pendingRes] = await Promise.all([
        localBuddiesApi.getAll({ limit: 100 }),
        localBuddiesApi.getPending()
      ]);
      setApprovedBuddies(approvedRes.data.buddies || []);
      setPendingBuddies(pendingRes.data.buddies || []);
    } catch (error) {
      toast.error('Failed to fetch local buddies');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id, status) => {
    try {
      await localBuddiesApi.review(id, { status });
      toast.success(`Buddy ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      fetchBuddies();
    } catch (error) {
      toast.error(`Failed to ${status} buddy`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this local buddy?')) {
      try {
        await localBuddiesApi.delete(id);
        toast.success('Local buddy deleted successfully');
        fetchBuddies();
      } catch (error) {
        toast.error('Failed to delete local buddy');
      }
    }
  };

  const filteredBuddies = (activeTab === 'approved' ? approvedBuddies : pendingBuddies).filter(buddy =>
    buddy.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buddy.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Local Buddies</h1>
          <p className="text-sm text-gray-500">Manage local buddy profiles</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Tabs */}
          <div className="flex bg-[#1C1B1B] rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'approved'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Approved ({approvedBuddies.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              Pending ({pendingBuddies.length})
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
        </div>
      ) : filteredBuddies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 rounded-3xl bg-[#1C1B1B] border border-white/10"
        >
          <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-white">No {activeTab === 'approved' ? 'Approved' : 'Pending'} Buddies</h3>
          <p className="text-gray-500">
            {activeTab === 'pending' ? 'All buddy applications have been reviewed!' : 'No approved buddies yet.'}
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Buddy</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Location</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Languages</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Rating</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Day Rate</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuddies.map((buddy) => (
                  <tr key={buddy._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={buddy.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                          alt={buddy.displayName}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <span className="font-medium text-white">{buddy.displayName}</span>
                          {buddy.isFeatured && (
                            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                              <Award className="w-3 h-3" /> Featured
                            </span>
                          )}
                          {buddy.submittedBy === 'user' && (
                            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-xs">
                              User Submit
                            </span>
                          )}
                        </div>
                      </div>
                      {buddy.submittedBy === 'user' && buddy.userId && (
                        <p className="text-xs text-gray-500 mt-1">{buddy.userId.email}</p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-4 h-4 text-rose-400" />
                        {buddy.location?.city}, {buddy.location?.state}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {buddy.languages?.slice(0, 2).map((lang) => (
                          <span key={lang} className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-400">
                            {lang}
                          </span>
                        ))}
                        {buddy.languages?.length > 2 && (
                          <span className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-500">
                            +{buddy.languages.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white">{buddy.rating?.toFixed(1) || 'N/A'}</span>
                        <span className="text-gray-500 text-xs">({buddy.reviewCount || 0})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      ₹{buddy.dayRate?.toLocaleString()}/day
                    </td>
                    <td className="py-4 px-6">
                      {activeTab === 'pending' ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
                          Pending Review
                        </span>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          buddy.isVerified
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {buddy.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={() => handleReview(buddy._id, 'approved')}
                              className="p-2 rounded-lg hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReview(buddy._id, 'rejected')}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(buddy._id)}
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

export default AdminLocalBuddies;
