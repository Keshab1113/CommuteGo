import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ThumbsUp, User } from "lucide-react";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/reviews/approved`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group p-6 rounded-2xl bg-[#1C1B1B] border border-gray-800 hover:border-cyan-500/30 transition-all duration-300"
        >
          {/* Quote Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
            <Quote className="w-5 h-5 text-cyan-400" />
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-4">
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

          {/* Review Text */}
          <p className="text-gray-300 mb-6 line-clamp-4 leading-relaxed">
            "{review.message || review.comment}"
          </p>

          {/* Reviewer */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">{review.fullname}</p>
              <p className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CustomerReviews;
