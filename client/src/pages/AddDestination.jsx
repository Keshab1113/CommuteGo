import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Shield, Star, Loader2, Image, Gift, Award, Navigation, Calendar, DollarSign, Tag, Info, CheckCircle, User, Mail, Phone, Map as MapIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddDestination = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'Easy',
    estimatedBudget: '',
    bestSeason: [],
    tags: [],
    images: [],
    locationName: '',
    latitude: '',
    longitude: '',
    safetyScore: 5,
    crowdLevel: 'Medium',
    timeRequired: '',
    category: 'nature',
    submitterName: '',
    submitterEmail: '',
    submitterPhone: '',
    mapEmbedUrl: '',
    howToReach: []
  });

  // Keep raw input strings so spaces/commas aren't stripped while typing.
  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only allow actual submission on the final step. On earlier steps,
    // pressing Enter or any unexpected submit should advance instead.
    if (currentStep < 4) {
      nextStep();
      return;
    }

    if (!validateStep(4)) {
      toast.error('Please fill all required contact fields with a valid email.');
      return;
    }

    setIsLoading(true);

    // Commit image URLs in case onBlur wasn't fired before submit.
    const images = parseImages(imageInput);
    const finalFormData = { ...formData, images };
    setImageInput(images.join(', '));

    try {
      const data = {
        ...finalFormData,
        estimatedBudget: Number(finalFormData.estimatedBudget),
        safetyScore: Number(finalFormData.safetyScore),
        location: {
          name: finalFormData.locationName,
          coordinates: {
            lat: finalFormData.latitude ? Number(finalFormData.latitude) : 0,
            lng: finalFormData.longitude ? Number(finalFormData.longitude) : 0
          }
        },
        status: 'pending',
        submittedBy: 'user',
        mapEmbedUrl: finalFormData.mapEmbedUrl.trim(),
        howToReach: finalFormData.howToReach
          .map(r => ({ ...r, steps: r.steps.filter(s => s.trim()) }))
          .filter(r => r.steps.length > 0),
        submitter: {
          name: finalFormData.submitterName.trim(),
          email: finalFormData.submitterEmail.trim(),
          phone: finalFormData.submitterPhone.trim()
        }
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/destinations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Destination submitted! It will be visible after admin approval.');
        navigate('/hidden-destinations');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit destination');
      }
    } catch (error) {
      toast.error('Failed to submit destination. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagBlur = () => {
    const tags = parseTags(tagInput);
    setFormData(prev => ({ ...prev, tags }));
    setTagInput(tags.join(', '));
  };

  const parseImages = (raw) =>
    raw.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));

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

  const handleImageChange = (e) => {
    setImageInput(e.target.value);
  };

  const handleImageBlur = () => {
    const images = parseImages(imageInput);
    setFormData(prev => ({ ...prev, images }));
    setImageInput(images.join(', '));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name.trim() && formData.locationName.trim() && formData.description.trim();
      case 2:
        return formData.estimatedBudget && Number(formData.estimatedBudget) > 0;
      case 3:
        return true;
      case 4:
        return (
          formData.submitterName.trim() &&
          formData.submitterEmail.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.submitterEmail) &&
          formData.submitterPhone.trim()
        );
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast.error('Please fill all required fields before continuing.');
      return;
    }

    // Commit raw comma-separated inputs into formData before leaving the step,
    // in case the user advanced without triggering onBlur.
    if (currentStep === 2) {
      const tags = parseTags(tagInput);
      setFormData(prev => ({ ...prev, tags }));
      setTagInput(tags.join(', '));
    }

    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    // Commit tags if navigating away from step 2 without blurring.
    if (currentStep === 2) {
      const tags = parseTags(tagInput);
      setFormData(prev => ({ ...prev, tags }));
      setTagInput(tags.join(', '));
    }
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Submit a Destination
            </h1>
            <p className="text-gray-400 mt-1">Share a hidden gem with the community</p>
          </div>
          
        </div>

        {/* Reward Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-400">Earn Rewards!</h3>
              <p className="text-sm text-gray-400">Get discounts when your destinations get approved</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 text-center">
              <p className="text-xl font-bold text-amber-400">10+</p>
              <p className="text-xs text-gray-400">Approved</p>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-emerald-500/20 text-center">
              <p className="text-xl font-bold text-emerald-400">10%</p>
              <p className="text-xs text-gray-400">Discount</p>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-cyan-500/20 text-center">
              <p className="text-xl font-bold text-cyan-400">20%</p>
              <p className="text-xs text-gray-400">Max Discount</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
          {['Basics', 'Details', 'Media', 'Contact'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                currentStep > index + 1
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : currentStep === index + 1
                  ? 'bg-cyan-500 border-cyan-500 text-white'
                  : 'bg-transparent border-gray-600 text-gray-400'
              }`}>
                {currentStep > index + 1 ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`ml-3 text-sm font-medium hidden sm:block ${
                currentStep >= index + 1 ? 'text-white' : 'text-gray-500'
              }`}>{step}</span>
              {index < 3 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-3 ${
                  currentStep > index + 1 ? 'bg-emerald-500' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl bg-[#141313] border border-gray-800 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="e.g., Mawlynnong Village"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Navigation className="w-4 h-4 text-cyan-400" />
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.locationName}
                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="e.g., East Khasi Hills, Meghalaya"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Info className="w-4 h-4 text-rose-400" />
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Describe what makes this place special, unique experiences, what travelers can expect..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                      <Star className="w-4 h-4 text-amber-400" />
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      Budget (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                      placeholder="3500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      Safety Score (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.safetyScore}
                      onChange={(e) => setFormData({ ...formData, safetyScore: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 text-gray-300">Crowd Level</label>
                    <select
                      value={formData.crowdLevel}
                      onChange={(e) => setFormData({ ...formData, crowdLevel: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
                    >
                      <option value="Very Low">Very Low</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Very High">Very High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 text-gray-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
                  >
                    <option value="adventure">Adventure</option>
                    <option value="nature">Nature</option>
                    <option value="heritage">Heritage</option>
                    <option value="beach">Beach</option>
                    <option value="spiritual">Spiritual</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Best Season (select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'].map((season) => (
                      <button
                        key={season}
                        type="button"
                        onClick={() => handleSeasonToggle(season)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          formData.bestSeason.includes(season)
                            ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                            : 'bg-[#0a0a0a] border border-gray-700 hover:border-cyan-500/50 text-gray-300'
                        }`}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Tag className="w-4 h-4 text-rose-400" />
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagChange}
                    onBlur={handleTagBlur}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="peaceful, nature, photography, camping"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <MapIcon className="w-4 h-4 text-cyan-400" />
                    Google Map Embed URL
                  </label>
                  <input
                    type="url"
                    value={formData.mapEmbedUrl}
                    onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                  <p className="mt-2 text-xs text-gray-500">Paste a Google Maps embed URL to show the location on the detail page.</p>
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-start gap-3">
                    <MapIcon className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-cyan-400 mb-2">How to Reach</p>
                      <p className="text-xs text-gray-400 mb-4">Add one or more travel routes with steps. Each route can use Bus, Train, Flight, or Personal Car.</p>

                      {formData.howToReach.map((route, routeIndex) => (
                        <div key={routeIndex} className="mb-4 p-3 rounded-lg bg-[#0a0a0a] border border-gray-700">
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
                              type="button"
                              onClick={() => removeHowToReachRoute(routeIndex)}
                              className="ml-auto text-xs text-red-400 hover:text-red-300"
                            >
                              Remove Route
                            </button>
                          </div>

                          {route.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-gray-500 w-12">Step {stepIndex + 1}</span>
                              <input
                                type="text"
                                value={step}
                                onChange={(e) => updateHowToReachStep(routeIndex, stepIndex, e.target.value)}
                                placeholder="e.g., From Kolkata to New Jalpaiguri by Train"
                                className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-gray-700 text-white text-sm focus:border-cyan-500 focus:outline-none"
                              />
                              {route.steps.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeHowToReachStep(routeIndex, stepIndex)}
                                  className="text-xs text-red-400 hover:text-red-300"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => addHowToReachStep(routeIndex)}
                            className="mt-2 text-xs text-cyan-400 hover:text-cyan-300"
                          >
                            + Add Step
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addHowToReachRoute}
                        className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                      >
                        + Add Route
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Media */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Image className="w-4 h-4 text-cyan-400" />
                    Image URLs
                  </label>
                  <textarea
                    rows={3}
                    value={imageInput}
                    onChange={handleImageChange}
                    onBlur={handleImageBlur}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                  <p className="mt-2 text-xs text-gray-500">Separate multiple URLs with commas</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-400">Tips for better approval</p>
                      <ul className="mt-2 text-xs text-gray-400 space-y-1">
                        <li>• Add at least 2-3 high-quality images</li>
                        <li>• Use real photos of the destination</li>
                        <li>• Write a detailed, honest description</li>
                        <li>• Include accurate budget estimate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-700">
                  <h4 className="text-sm font-medium mb-3 text-gray-300">Summary</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 rounded bg-black/30">
                      <span className="text-gray-500">Name:</span>
                      <p className="text-white font-medium truncate">{formData.name || '-'}</p>
                    </div>
                    <div className="p-2 rounded bg-black/30">
                      <span className="text-gray-500">Location:</span>
                      <p className="text-white font-medium truncate">{formData.locationName || '-'}</p>
                    </div>
                    <div className="p-2 rounded bg-black/30">
                      <span className="text-gray-500">Budget:</span>
                      <p className="text-emerald-400 font-medium">₹{formData.estimatedBudget || '0'}</p>
                    </div>
                    <div className="p-2 rounded bg-black/30">
                      <span className="text-gray-500">Difficulty:</span>
                      <p className="text-white font-medium">{formData.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Info */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-cyan-400">Almost there!</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Please share your contact details so our team can reach you if we need more information about this destination.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <User className="w-4 h-4 text-emerald-400" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.submitterName}
                    onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.submitterEmail}
                    onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Phone className="w-4 h-4 text-rose-400" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.submitterPhone}
                    onChange={(e) => setFormData({ ...formData, submitterPhone: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="+91 99999 99999"
                  />
                </div>
              </div>
            )}

          </form>

          {/* Navigation Buttons - kept OUTSIDE the form so Continue/Back never submit */}
          <div className="flex gap-4 pt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-4 rounded-xl bg-white/5 border border-gray-700 text-white font-medium hover:bg-white/10 transition-all"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                  </span>
                ) : (
                  'Submit for Review'
                )}
              </button>
            )}
          </div>

          <p className="text-center text-xs text-gray-500 pt-2">
            Submitted destinations will be reviewed by admin before appearing on the site.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AddDestination;
