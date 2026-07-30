import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, MessageSquare, Clock, Filter, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from '../../store/auth';
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from "react-toastify";

const AdminFeedback = () => {
  const { authorizationToken } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsersData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/feedback`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch feedbacks");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFeedBack = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/feedback/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Feedback deleted successfully");
        getAllUsersData();
      }
    } catch (error) {
      toast.error("Failed to delete feedback");
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch =
      feedback.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'done' && feedback.isDone) ||
      (filter === 'pending' && !feedback.isDone);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white dark:bg-[#1C1B1B] border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Feedback Management</h1>
            <p className="text-sm text-gray-500">Review and manage user feedback</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="all">All</option>
              <option value="done">Resolved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{feedbacks.length}</p>
              <p className="text-xs text-gray-500">Total Feedbacks</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{feedbacks.filter(f => f.isDone).length}</p>
              <p className="text-xs text-gray-500">Resolved</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{feedbacks.filter(f => !f.isDone).length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
            </div>
          ) : (
          <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a]">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Phone</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Message</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((val, key) => (
                  <motion.tr
                    key={val._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: key * 0.03 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-medium">{val.fullname}</p>
                      <p className="text-xs text-gray-500">{new Date(val.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">{val.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{val.phone}</td>
                    <td className="py-4 px-6">
                      <p className="text-sm truncate max-w-xs">{val.message}</p>
                    </td>
                    <td className="py-4 px-6">
                      {val.isDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">
                          <CheckCircle className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-medium">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/feedbacks/${val._id}/edit`}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-cyan-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this feedback?')) {
                              deleteFeedBack(val._id);
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredFeedbacks.length === 0 && (
            <div className="py-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No feedbacks found</p>
            </div>
          )}
          </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminFeedback;
