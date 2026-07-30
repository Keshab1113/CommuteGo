import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, Star, Loader2, MessageSquare, User, MapPin, Backpack } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { reviewsApi } from '../../services/api/adminApi';

const AdminReviews = () => {
  const { darkMode } = useContext(ThemeContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await reviewsApi.getAll({ limit: 100 });
      setReviews(response.data.reviews || []);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewsApi.delete(id);
        toast.success('Review deleted successfully');
        fetchReviews();
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.reviewerId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || review.targetType === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'destination': return <MapPin className="w-4 h-4 text-emerald-400" />;
      case 'buddy': return <User className="w-4 h-4 text-cyan-400" />;
      case 'trip': return <Backpack className="w-4 h-4 text-rose-400" />;
      default: return <Star className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-sm text-gray-500">Moderate user reviews</p>
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
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Types</option>
            <option value="destination">Destination</option>
            <option value="buddy">Local Buddy</option>
            <option value="trip">Trip</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {filteredReviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-[#1C1B1B] border border-white/10 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={review.reviewerId?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                    alt={review.reviewerId?.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{review.reviewerId?.name || 'Anonymous'}</span>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(review.targetType)}
                        <span className="text-xs text-gray-500 capitalize">{review.targetType}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{review.rating}/5</span>
                    </div>
                    <p className="text-gray-400">{review.content}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-3">
                      {new Date(review.createdAt).toLocaleDateString()}
                      {review.targetId && ` • ID: ${review.targetId}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-12 rounded-2xl bg-[#1C1B1B] border border-white/10">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No reviews found</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AdminReviews;
