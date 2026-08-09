import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit, Trash2, User, Mail, Shield, MoreVertical, ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from '../../store/auth';
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from "react-toastify";
import DeleteConfirmModal from '../../components/ui/DeleteConfirmModal';

const AllUsers = () => {
  const { authorizationToken } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const usersPerPage = 10;

  const getAllUsersData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setDeleteItem(id);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/delete/${deleteItem}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("User deleted successfully");
        getAllUsersData();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
      setDeleteItem(null);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">All Users</h1>
          <p className="text-sm text-gray-500">Manage and view all registered users</p>
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Joined</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((curUser) => (
                  <tr key={curUser._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                          {curUser.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-white">{curUser.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4" />
                        {curUser.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {curUser.isAdmin ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                          <Shield className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-medium">
                          <User className="w-3 h-3" /> User
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {curUser.createdAt ? new Date(curUser.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/users/${curUser._id}/edit`}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteUser(curUser._id)}
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

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                        : 'border border-white/10 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <DeleteConfirmModal
        open={!!deleteItem}
        onOpenChange={(open) => {
          if (!open) setDeleteItem(null);
        }}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AllUsers;
