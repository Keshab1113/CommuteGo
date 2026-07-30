import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, CheckCircle, XCircle, Clock, Loader2, Star, ThumbsUp, Eye } from 'lucide-react';
import { toast } from "react-toastify";
import { adminDataApi } from '../../services/api/adminApi';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await adminDataApi.getAllFeedbacks();
      // Filter only reviews
      const allData = response.data;
      const reviewData = allData.filter(item => item.type === 'review');
      setFeedbacks(reviewData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    try {
      await adminDataApi.deleteFeedback(id);
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await adminDataApi.updateFeedback(id, { status: newStatus });
      toast.success(`Review ${newStatus} successfully`);
      fetchReviews();
    } catch (error) {
      toast.error("Failed to update review");
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch =
      feedback.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'approved' && feedback.status === 'approved') ||
      (filter === 'rejected' && feedback.status === 'rejected') ||
      (filter === 'pending' && feedback.status === 'pending');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-sm text-gray-500">Manage user reviews for approval</p>
        </div>
        <div className="flex items-center gap-3">
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
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[#1C1B1B] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{feedbacks.length}</p>
              <p className="text-xs text-gray-500">Total Reviews</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-4 rounded-xl bg-[#1C1B1B] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{feedbacks.filter(r => r.status === 'pending').length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-[#1C1B1B] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{feedbacks.filter(r => r.status === 'approved').length}</p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-4 rounded-xl bg-[#1C1B1B] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{feedbacks.filter(r => r.status === 'rejected').length}</p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
        </div>
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Rating</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Review</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((review) => (
                  <tr key={review._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-white">{review.fullname}</p>
                      <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (review.rating || 5)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-400 truncate max-w-xs">{review.message}</p>
                    </td>
                    <td className="py-4 px-6">
                      {review.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                          <CheckCircle className="w-3 h-3" /> Approved
                        </span>
                      ) : review.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {review.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(review._id, 'approved')}
                              className="p-2 rounded-lg hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(review._id, 'rejected')}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this review?')) {
                              deleteReview(review._id);
                            }
                          }}
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

          {filteredFeedbacks.length === 0 && (
            <div className="py-12 text-center">
              <ThumbsUp className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-500">No reviews found</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1C1B1B] border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Review Details</h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold">{selectedReview.fullname?.[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{selectedReview.fullname}</p>
                    <p className="text-xs text-gray-500">{selectedReview.email}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= (selectedReview.rating || 5)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Review</p>
                <p className="text-white leading-relaxed">{selectedReview.message}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  Submitted: {new Date(selectedReview.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2">
                  {selectedReview.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          updateStatus(selectedReview._id, 'approved');
                          setSelectedReview(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          updateStatus(selectedReview._id, 'rejected');
                          setSelectedReview(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
