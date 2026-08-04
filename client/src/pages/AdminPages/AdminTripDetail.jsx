import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Loader2, ArrowLeft, Check, X, Trash2,
  Edit3, Calendar, Users, Wallet, Shield, Info,
  Tag
} from 'lucide-react';
import { toast } from 'react-toastify';
import { tripsApi } from '../../services/api/adminApi';

const STATUS_COLORS = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20'
};

const TRIP_STATUS_COLORS = {
  open: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  closed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  completed: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20'
};

const AdminTripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    destination: '',
    description: '',
    budget: '',
    maxParticipants: '',
    tripStatus: 'open',
    interests: [],
    isPublic: true,
    allowExternalJoin: true,
    safetyVerified: false
  });

  const fetchTrip = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await tripsApi.getAdminById(id);
      const data = res.data;
      setTrip(data);
      setFormData({
        destination: data.destination || '',
        description: data.description || '',
        budget: data.budget || '',
        maxParticipants: data.maxParticipants || '',
        tripStatus: data.tripStatus || 'open',
        interests: data.interests || [],
        isPublic: data.isPublic !== false,
        allowExternalJoin: data.allowExternalJoin !== false,
        safetyVerified: data.safetyVerified || false
      });
    } catch (error) {
      toast.error('Failed to load trip');
      navigate('/admin/trips');
    } finally {
      setIsFetching(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchTrip();
  }, [fetchTrip]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInput = (value) => {
    setFormData(prev => ({
      ...prev,
      interests: value.split(',').map(v => v.trim()).filter(Boolean)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await tripsApi.update(id, {
        ...formData,
        budget: Number(formData.budget),
        maxParticipants: Number(formData.maxParticipants)
      });
      setTrip(res.data);
      toast.success('Trip updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update trip');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (status) => {
    try {
      await tripsApi.review(id, { status });
      setTrip(prev => ({ ...prev, status }));
      toast.success(`Trip ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${status} trip`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to cancel/delete this trip?')) return;
    setIsLoading(true);
    try {
      await tripsApi.delete(id);
      toast.success('Trip cancelled successfully');
      navigate('/admin/trips');
    } catch (error) {
      toast.error('Failed to cancel trip');
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white">
        <Info className="w-12 h-12 text-gray-500 mb-3" />
        <p className="text-lg font-bold">Trip not found</p>
        <Link to="/admin/trips" className="mt-2 text-emerald-400 hover:underline">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/admin/trips')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to trips
        </button>
        <div className="flex items-center gap-2">
          {trip.status === 'pending' && (
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
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Cancel
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
            src={trip.image || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=400&fit=crop'}
            alt={trip.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{trip.destination}</h1>
              <div className="flex items-center gap-2 text-gray-300 mt-1">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {trip.location?.name || trip.destination}
              </div>
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[trip.status]}`}>
                {trip.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${TRIP_STATUS_COLORS[trip.tripStatus]}`}>
                {trip.tripStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Destination</label>
                  <input
                    name="destination"
                    value={formData.destination}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Trip Status</label>
                  <select
                    name="tripStatus"
                    value={formData.tripStatus}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Max Participants</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInput}
                    className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInput}
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Interests (comma separated)</label>
                <input
                  value={formData.interests.join(', ')}
                  onChange={(e) => handleArrayInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { name: 'isPublic', label: 'Public' },
                  { name: 'allowExternalJoin', label: 'Allow External Join' },
                  { name: 'safetyVerified', label: 'Safety Verified' },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      name={name}
                      checked={formData[name]}
                      onChange={handleInput}
                      className="w-4 h-4 rounded border-white/10 bg-[#0a0a0a] text-emerald-500 focus:ring-emerald-500/50"
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
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center gap-2 disabled:opacity-50"
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
                    <Calendar className="w-4 h-4 text-rose-400" /> Dates
                  </div>
                  <p className="font-medium">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Wallet className="w-4 h-4 text-emerald-400" /> Budget
                  </div>
                  <p className="font-medium">₹{trip.budget?.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Users className="w-4 h-4 text-cyan-400" /> Participants
                  </div>
                  <p className="font-medium">{trip.currentParticipants?.length || 1} / {trip.maxParticipants}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Shield className="w-4 h-4 text-emerald-400" /> Safety
                  </div>
                  <p className="font-medium">{trip.safetyVerified ? 'Verified' : 'Not Verified'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-emerald-400" /> About
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{trip.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-cyan-400" /> Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trip.interests?.length > 0 ? trip.interests.map(interest => (
                        <span key={interest} className="px-3 py-1 rounded-full bg-[#0a0a0a] border border-white/10 text-sm text-gray-300">{interest}</span>
                      )) : <span className="text-gray-500 text-sm">No interests listed</span>}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10">
                    <h3 className="text-lg font-bold mb-4">Creator</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-emerald-500 flex items-center justify-center text-white font-bold"
                      >
                        {trip.creatorName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium">{trip.creatorName || 'Anonymous'}</p>
                        <p className="text-sm text-gray-400">{trip.creatorId?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10">
                    <h3 className="text-lg font-bold mb-4">Travelers ({trip.currentParticipants?.length || 0})</h3>
                    <div className="space-y-3">
                      {trip.currentParticipants?.length > 0 ? trip.currentParticipants.map((p) => (
                        <div key={p._id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-xs font-bold">
                            {p.username?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{p.username || 'Traveler'}</p>
                            <p className="text-xs text-gray-500">{p.email}</p>
                          </div>
                        </div>
                      )) : <p className="text-sm text-gray-500">No participants yet</p>}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTripDetail;
