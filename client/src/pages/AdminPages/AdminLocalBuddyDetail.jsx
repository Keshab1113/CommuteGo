import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Star, Loader2, ArrowLeft, Check, X, Trash2,
  Edit3, User, Mail, Phone, Languages, Award, Clock,
  Calendar, CheckCircle, Info
} from 'lucide-react';
import { toast } from 'react-toastify';
import { localBuddiesApi } from '../../services/api/adminApi';
import DeleteConfirmModal from '../../components/ui/DeleteConfirmModal';

const STATUS_COLORS = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20'
};

const AdminLocalBuddyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buddy, setBuddy] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    dayRate: '',
    hourlyRate: '',
    languages: [],
    interests: [],
    certifications: [],
    availability: 'Flexible',
    isVerified: false,
    isFeatured: false,
    isActive: true,
    priceNegotiable: false,
    status: 'pending'
  });

  const fetchBuddy = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await localBuddiesApi.getById(id);
      const data = res.data;
      setBuddy(data);
      setFormData({
        displayName: data.displayName || '',
        bio: data.bio || '',
        dayRate: data.dayRate || '',
        hourlyRate: data.hourlyRate || '',
        languages: data.languages || [],
        interests: data.interests || [],
        certifications: data.certifications || [],
        availability: data.availability || 'Flexible',
        isVerified: data.isVerified || false,
        isFeatured: data.isFeatured || false,
        isActive: data.isActive !== false,
        priceNegotiable: data.priceNegotiable || false,
        status: data.status || 'pending'
      });
    } catch (error) {
      toast.error('Failed to load local buddy');
      navigate('/admin/local-buddies');
    } finally {
      setIsFetching(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchBuddy();
  }, [fetchBuddy]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInput = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(v => v.trim()).filter(Boolean)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await localBuddiesApi.update(id, {
        ...formData,
        dayRate: Number(formData.dayRate),
        hourlyRate: formData.hourlyRate ? Number(formData.hourlyRate) : undefined
      });
      setBuddy(res.data);
      toast.success('Local buddy updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update local buddy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (status) => {
    try {
      await localBuddiesApi.review(id, { status });
      setBuddy(prev => ({ ...prev, status }));
      toast.success(`Local buddy ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${status} local buddy`);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await localBuddiesApi.delete(id);
      toast.success('Local buddy deleted successfully');
      setShowDeleteModal(false);
      navigate('/admin/local-buddies');
    } catch (error) {
      toast.error('Failed to delete local buddy');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!buddy) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white">
        <Info className="w-12 h-12 text-gray-500 mb-3" />
        <p className="text-lg font-bold">Local buddy not found</p>
        <Link to="/admin/local-buddies" className="mt-2 text-cyan-400 hover:underline">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/admin/local-buddies')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to local buddies
        </button>
        <div className="flex items-center gap-2">
          {buddy.status === 'pending' && (
            <>
              <button
                onClick={() => handleReview('approved')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <Check className="w-4 h-4" /> Approve
              </button>
              <button
                onClick={() => handleReview('rejected')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <X className="w-4 h-4" /> Reject
              </button>
            </>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-[#1C1B1B] border border-white/10 overflow-hidden"
      >
        <div className="relative h-48 md:h-64">
          <img
            src={buddy.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'}
            alt={buddy.displayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{buddy.displayName}</h1>
              <div className="flex items-center gap-2 text-gray-300 mt-1">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {buddy.location?.city}, {buddy.location?.state}, {buddy.location?.country || 'India'}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[buddy.status]}`}>
              {buddy.status}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                  <input
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Availability</label>
                  <input
                    name="availability"
                    value={formData.availability}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Day Rate (₹)</label>
                  <input
                    type="number"
                    name="dayRate"
                    value={formData.dayRate}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInput}
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Languages (comma separated)</label>
                  <input
                    value={formData.languages.join(', ')}
                    onChange={(e) => handleArrayInput('languages', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Interests (comma separated)</label>
                  <input
                    value={formData.interests.join(', ')}
                    onChange={(e) => handleArrayInput('interests', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Certifications (comma separated)</label>
                  <input
                    value={formData.certifications.join(', ')}
                    onChange={(e) => handleArrayInput('certifications', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { name: 'isVerified', label: 'Verified' },
                  { name: 'isFeatured', label: 'Featured' },
                  { name: 'isActive', label: 'Active' },
                  { name: 'priceNegotiable', label: 'Negotiable' },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      name={name}
                      checked={formData[name]}
                      onChange={handleInput}
                      className="w-4 h-4 rounded border-white/10 bg-[#0a0a0a] text-cyan-500 focus:ring-cyan-500/50"
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-500 text-white font-medium hover:from-cyan-600 hover:to-rose-600 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Star className="w-4 h-4 text-amber-400" /> Rating
                  </div>
                  <p className="text-xl font-bold">{buddy.rating?.toFixed(1) || 'N/A'} <span className="text-sm text-gray-500 font-normal">({buddy.reviewCount || 0})</span></p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" /> Response Time
                  </div>
                  <p className="text-xl font-bold">{buddy.responseTime || 'N/A'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Calendar className="w-4 h-4 text-emerald-400" /> Trips Completed
                  </div>
                  <p className="text-xl font-bold">{buddy.tripsCompleted || 0}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Award className="w-4 h-4 text-amber-400" /> Day Rate
                  </div>
                  <p className="text-xl font-bold text-cyan-400">₹{buddy.dayRate?.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-emerald-400" /> About
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{buddy.bio || 'No bio provided.'}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Languages className="w-5 h-5 text-cyan-400" /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {buddy.languages?.length > 0 ? buddy.languages.map(lang => (
                        <span key={lang} className="px-3 py-1 rounded-full bg-[#0a0a0a] border border-white/10 text-sm text-gray-300">{lang}</span>
                      )) : <span className="text-gray-500 text-sm">No languages listed</span>}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" /> Certifications
                    </h3>
                    <ul className="space-y-2">
                      {buddy.certifications?.length > 0 ? buddy.certifications.map((cert, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" /> {cert}
                        </li>
                      )) : <span className="text-gray-500 text-sm">No certifications listed</span>}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10">
                    <h3 className="text-lg font-bold mb-4">Submitter Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <User className="w-4 h-4 text-cyan-400" />
                        {buddy.userId?.username || 'Anonymous'}
                      </div>
                      {buddy.userId?.email && (
                        <div className="flex items-center gap-3 text-gray-300">
                          <Mail className="w-4 h-4 text-cyan-400" />
                          {buddy.userId.email}
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        Submitted: {new Date(buddy.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        Source: {buddy.submittedBy || 'admin'}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10">
                    <h3 className="text-lg font-bold mb-4">Status</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[buddy.status]}`}>
                        {buddy.status}
                      </span>
                      {buddy.isVerified && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Verified</span>}
                      {buddy.isFeatured && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Featured</span>}
                      {!buddy.isActive && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">Inactive</span>}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      <DeleteConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Local Buddy"
        description="Are you sure you want to delete this local buddy? This action cannot be undone."
      />
    </div>
  );
};

export default AdminLocalBuddyDetail;
