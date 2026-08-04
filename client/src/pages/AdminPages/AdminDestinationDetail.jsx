import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Shield, Loader2, ArrowLeft, Check, X, Trash2,
  Image, Tag, Info, Edit3, Send,
  User, Mail, Phone, Clock, FileText, MessageSquare, ExternalLink
} from 'lucide-react';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { destinationsApi } from '../../services/api/adminApi';

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ table: 'insert-table' }],
    ['clean']
  ],
  clipboard: {
    matchVisual: true
  }
};

const QUILL_FORMATS = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'list', 'bullet', 'indent',
  'align',
  'blockquote', 'code-block',
  'link', 'image', 'video',
  'table'
];

const STATUS_COLORS = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20'
};

const AdminDestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState('');
  const [isSendingQuestion, setIsSendingQuestion] = useState(false);

  // Raw comma-separated inputs for array fields to avoid cursor jumping.
  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    locationName: '',
    description: '',
    difficulty: 'Easy',
    estimatedBudget: '',
    safetyScore: 5,
    crowdLevel: 'Medium',
    timeRequired: '',
    category: 'nature',
    bestSeason: [],
    tags: [],
    images: [],
    videos: [],
    transportDetails: '',
    nearbyHospitals: '',
    localCuisine: [],
    photographySpots: [],
    internetAvailability: '',
    blogContent: '',
    adminNotes: '',
    additionalDetails: '',
    mapEmbedUrl: '',
    howToReach: []
  });

  const fetchDestination = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await destinationsApi.getById(id);
      const data = res.data;
      setDestination(data);
      setFormData({
        name: data.name || '',
        locationName: data.location?.name || '',
        description: data.description || '',
        difficulty: data.difficulty || 'Easy',
        estimatedBudget: data.estimatedBudget || '',
        safetyScore: data.safetyScore ?? 5,
        crowdLevel: data.crowdLevel || 'Medium',
        timeRequired: data.timeRequired || '',
        category: data.category || 'nature',
        bestSeason: data.bestSeason || [],
        tags: data.tags || [],
        images: data.images || [],
        videos: data.videos || [],
        transportDetails: data.transportDetails || '',
        nearbyHospitals: data.nearbyHospitals || '',
        localCuisine: data.localCuisine || [],
        photographySpots: data.photographySpots || [],
        internetAvailability: data.internetAvailability || '',
        blogContent: data.blogContent || '',
        adminNotes: data.adminNotes || '',
        additionalDetails: data.additionalDetails || '',
        mapEmbedUrl: data.mapEmbedUrl || '',
        howToReach: data.howToReach || []
      });
      setTagInput((data.tags || []).join(', '));
      setImageInput((data.images || []).join(', '));
    } catch (error) {
      toast.error('Failed to load destination');
      navigate('/admin/destinations');
    } finally {
      setIsFetching(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchDestination();
  }, [fetchDestination]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSeasonToggle = (season) => {
    setFormData(prev => ({
      ...prev,
      bestSeason: prev.bestSeason.includes(season)
        ? prev.bestSeason.filter(s => s !== season)
        : [...prev.bestSeason, season]
    }));
  };

  const parseTags = (raw) => raw.split(',').map(t => t.trim()).filter(Boolean);
  const parseImages = (raw) => raw.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));

  const handleTagBlur = () => {
    const tags = parseTags(tagInput);
    setFormData(prev => ({ ...prev, tags }));
    setTagInput(tags.join(', '));
  };

  const handleImageBlur = () => {
    const images = parseImages(imageInput);
    setFormData(prev => ({ ...prev, images }));
    setImageInput(images.join(', '));
  };

  const commitArrayInputs = () => {
    const tags = parseTags(tagInput);
    const images = parseImages(imageInput);
    setFormData(prev => ({ ...prev, tags, images }));
    setTagInput(tags.join(', '));
    setImageInput(images.join(', '));
    return { tags, images };
  };

  const addHowToReachRoute = () => {
    setFormData(prev => ({
      ...prev,
      howToReach: [...prev.howToReach, { mode: 'Bus', steps: [''] }]
    }));
  };

  const removeHowToReachRoute = (routeIndex) => {
    setFormData(prev => ({
      ...prev,
      howToReach: prev.howToReach.filter((_, i) => i !== routeIndex)
    }));
  };

  const updateHowToReachMode = (routeIndex, mode) => {
    setFormData(prev => ({
      ...prev,
      howToReach: prev.howToReach.map((route, i) =>
        i === routeIndex ? { ...route, mode } : route
      )
    }));
  };

  const updateHowToReachStep = (routeIndex, stepIndex, value) => {
    setFormData(prev => ({
      ...prev,
      howToReach: prev.howToReach.map((route, i) =>
        i === routeIndex
          ? { ...route, steps: route.steps.map((step, j) => j === stepIndex ? value : step) }
          : route
      )
    }));
  };

  const addHowToReachStep = (routeIndex) => {
    setFormData(prev => ({
      ...prev,
      howToReach: prev.howToReach.map((route, i) =>
        i === routeIndex ? { ...route, steps: [...route.steps, ''] } : route
      )
    }));
  };

  const removeHowToReachStep = (routeIndex, stepIndex) => {
    setFormData(prev => ({
      ...prev,
      howToReach: prev.howToReach.map((route, i) =>
        i === routeIndex
          ? { ...route, steps: route.steps.filter((_, j) => j !== stepIndex) }
          : route
      )
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const { tags, images } = commitArrayInputs();

    const payload = {
      ...formData,
      tags,
      images,
      estimatedBudget: Number(formData.estimatedBudget),
      safetyScore: Number(formData.safetyScore),
      howToReach: formData.howToReach
        .map(r => ({ ...r, steps: r.steps.filter(s => s.trim()) }))
        .filter(r => r.steps.length > 0),
      location: {
        name: formData.locationName,
        coordinates: {
          lat: destination?.location?.coordinates?.lat || 0,
          lng: destination?.location?.coordinates?.lng || 0
        }
      }
    };

    try {
      const res = await destinationsApi.update(id, payload);
      setDestination(res.data);
      toast.success('Destination updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update destination');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (status) => {
    try {
      await destinationsApi.review(id, { status });
      setDestination(prev => ({ ...prev, status }));
      toast.success(`Destination ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${status} destination`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this destination? This cannot be undone.')) return;
    setIsLoading(true);
    try {
      await destinationsApi.delete(id);
      toast.success('Destination deleted successfully');
      navigate('/admin/destinations');
    } catch (error) {
      toast.error('Failed to delete destination');
      setIsLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    if (!destination?.createdBy) {
      toast.error('This destination was submitted anonymously. No registered user to message.');
      return;
    }

    setIsSendingQuestion(true);
    try {
      await destinationsApi.askSubmitter(id, { message: question.trim() });
      toast.success('Question sent to submitter');
      setQuestion('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send question');
    } finally {
      setIsSendingQuestion(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="text-center py-16">
        <Info className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white">Destination not found</h3>
      </div>
    );
  }

  const renderField = (label, value, type = 'text', name, options = null) => {
    if (!isEditing) {
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
          <div className="text-white text-sm">{value || '-'}</div>
        </div>
      );
    }

    if (type === 'select' && options) {
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
          <select
            name={name}
            value={formData[name]}
            onChange={handleInput}
            className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }

    if (type === 'rich-text') {
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
          {isEditing ? (
            <ReactQuill
              theme="snow"
              value={formData[name]}
              onChange={(value) => setFormData(prev => ({ ...prev, [name]: value }))}
              modules={QUILL_MODULES}
              formats={QUILL_FORMATS}
              className="bg-[#0a0a0a] rounded-lg border border-gray-700 overflow-hidden"
            />
          ) : (
            <div
              className="prose prose-invert max-w-none ql-preview"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value || '<p class="text-gray-500">-</p>') }}
            />
          )}
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
          <textarea
            name={name}
            rows={3}
            value={formData[name]}
            onChange={handleInput}
            className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>
      );
    }

    return (
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInput}
          className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/destinations"
            className="p-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{destination.name}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              {destination.location?.name || 'Unknown location'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[destination.status] || STATUS_COLORS.pending}`}>
            {destination.status}
          </span>
          {destination.submittedBy === 'user' && (
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              User Submit
            </span>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {destination.status === 'pending' && (
          <>
            <button
              onClick={() => handleReview('approved')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors text-sm font-medium"
            >
              <Check className="w-4 h-4" /> Approve
            </button>
            <button
              onClick={() => handleReview('rejected')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
            >
              <X className="w-4 h-4" /> Reject
            </button>
          </>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors text-sm font-medium"
        >
          <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-400" /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField('Name', destination.name, 'text', 'name')}
              {renderField('Location', destination.location?.name, 'text', 'locationName')}
              <div className="md:col-span-2">
                {renderField('Description', destination.description, 'textarea', 'description')}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" /> Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField('Difficulty', destination.difficulty, 'select', 'difficulty', ['Easy', 'Moderate', 'Challenging'])}
              {renderField('Budget (₹)', `₹${destination.estimatedBudget?.toLocaleString()}`, 'number', 'estimatedBudget')}
              {renderField('Safety Score', `${destination.safetyScore}/10`, 'number', 'safetyScore')}
              {renderField('Crowd Level', destination.crowdLevel, 'select', 'crowdLevel', ['Very Low', 'Low', 'Medium', 'High', 'Very High'])}
              {renderField('Category', destination.category, 'select', 'category', ['adventure', 'nature', 'heritage', 'beach', 'spiritual', 'cultural'])}
              {renderField('Time Required', destination.timeRequired, 'text', 'timeRequired')}
            </div>

            <div className="mt-6">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-3">
                Best Season
              </label>
              <div className="flex flex-wrap gap-2">
                {['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'].map(season => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => isEditing && handleSeasonToggle(season)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      formData.bestSeason.includes(season)
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                        : 'bg-[#0a0a0a] border-gray-700 text-gray-400'
                    } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-400" /> Extended Content
            </h2>
            <div className="space-y-6">
              {renderField('Blog / Long-form Content', DOMPurify.sanitize(destination.blogContent || ''), 'rich-text', 'blogContent')}
              {renderField('Additional Details', DOMPurify.sanitize(destination.additionalDetails || ''), 'rich-text', 'additionalDetails')}
              {renderField('Admin Notes (internal)', destination.adminNotes, 'textarea', 'adminNotes')}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> How to Reach
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                    Google Map Embed URL
                  </label>
                  <input
                    type="url"
                    name="mapEmbedUrl"
                    value={formData.mapEmbedUrl}
                    onChange={handleInput}
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">
                    Routes
                  </label>
                  {formData.howToReach.map((route, routeIndex) => (
                    <div key={routeIndex} className="p-3 rounded-lg bg-[#0a0a0a] border border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <select
                          value={route.mode}
                          onChange={(e) => updateHowToReachMode(routeIndex, e.target.value)}
                          className="px-3 py-2 rounded-lg bg-black/30 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
                        >
                          {['Bus', 'Train', 'Flight', 'Personal Car'].map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeHowToReachRoute(routeIndex)}
                          className="ml-auto text-xs text-red-400 hover:text-red-300"
                        >
                          Remove Route
                        </button>
                      </div>
                      {route.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-500 w-14">Step {stepIndex + 1}</span>
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => updateHowToReachStep(routeIndex, stepIndex, e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
                            placeholder="e.g., From Kolkata to New Jalpaiguri by Train"
                          />
                          {route.steps.length > 1 && (
                            <button
                              onClick={() => removeHowToReachStep(routeIndex, stepIndex)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addHowToReachStep(routeIndex)}
                        className="mt-1 text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        + Add Step
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addHowToReachRoute}
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    + Add Route
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {destination.mapEmbedUrl && (
                  <div className="rounded-xl overflow-hidden border border-gray-700">
                    <iframe
                      src={destination.mapEmbedUrl}
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${destination.name} map`}
                    />
                  </div>
                )}

                {destination.howToReach?.length > 0 ? destination.howToReach.map((route, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-700">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                      {route.mode === 'Flight' && '✈️'}
                      {route.mode === 'Train' && '🚆'}
                      {route.mode === 'Bus' && '🚌'}
                      {route.mode === 'Personal Car' && '🚗'}
                      Route {i + 1}: {route.mode}
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      {route.steps.map((step, j) => (
                        <li key={j}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )) : (
                  <p className="text-sm text-gray-500">No routes added yet.</p>
                )}
              </div>
            )}
          </motion.div>

          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Images, Tags, Submitter, Q&A */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Image className="w-5 h-5 text-cyan-400" /> Images
            </h2>
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onBlur={handleImageBlur}
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none resize-none"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
                <p className="text-xs text-gray-500">Separate image URLs with commas. Only http/https URLs are kept.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {destination.images?.length > 0 ? destination.images.map((img, i) => (
                  <a key={i} href={img} target="_blank" rel="noreferrer" className="relative group aspect-square">
                    <img src={img} alt={`${destination.name} ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </a>
                )) : (
                  <p className="text-sm text-gray-500 col-span-2">No images uploaded</p>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-rose-400" /> Tags
            </h2>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onBlur={handleTagBlur}
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
                  placeholder="nature, hiking, camping"
                />
                <p className="text-xs text-gray-500">Separate tags with commas.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {destination.tags?.length > 0 ? destination.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#0a0a0a] border border-gray-700 text-sm text-gray-300">
                    {tag}
                  </span>
                )) : (
                  <p className="text-sm text-gray-500">No tags</p>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-400" /> Submitter
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{destination.submitter?.name || 'Anonymous'}</span>
              </div>
              {destination.submitter?.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{destination.submitter.email}</span>
                </div>
              )}
              {destination.submitter?.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white">{destination.submitter.phone}</span>
                </div>
              )}
              {destination.createdBy && (
                <div className="flex items-center gap-3 text-sm">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Registered User:</span>
                  <span className="text-white">{destination.createdBy?.username || 'Unknown'}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Submitted:</span>
                <span className="text-white">{formatDate(destination.createdAt)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" /> Ask Submitter
            </h2>
            <div className="space-y-3">
              <textarea
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={destination.createdBy ? "Type your question to the submitter..." : "Cannot message anonymous submitters."}
                disabled={!destination.createdBy || isSendingQuestion}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none resize-none disabled:opacity-50"
              />
              <button
                onClick={handleAskQuestion}
                disabled={!destination.createdBy || isSendingQuestion}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium hover:from-purple-600 hover:to-cyan-600 transition-all disabled:opacity-50"
              >
                {isSendingQuestion ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send Question
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDestinationDetail;
