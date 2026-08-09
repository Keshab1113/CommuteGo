import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Wallet, FileText, Image, Tag, Loader2, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    image: '',
    interests: [],
    maxParticipants: 5,
  });

  const interestOptions = [
    'Adventure', 'Nature', 'Photography', 'Food', 'Culture',
    'Beach', 'Mountain', 'Heritage', 'Nightlife', 'Shopping'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Trip created successfully! Pending admin approval.');
        navigate('/trips');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to create trip');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.destination && formData.startDate && formData.endDate;
    }
    if (currentStep === 2) {
      return formData.budget && formData.description && formData.maxParticipants > 0;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12">
      <div className="container mx-auto px-4 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Create a Trip
            </span>
          </h1>
          <p className="text-gray-400">Plan your adventure and find travel companions</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= step
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-2 rounded ${
                    currentStep > step ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? 'text-emerald-400' : 'text-gray-500'}>Basics</span>
            <span className={currentStep >= 2 ? 'text-emerald-400' : 'text-gray-500'}>Details</span>
            <span className={currentStep >= 3 ? 'text-emerald-400' : 'text-gray-500'}>Review</span>
          </div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-white/5 border border-white/10"
        >
          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g., Manali, Goa, Ladakh"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  Budget (₹) *
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g., 15000"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  Max Participants *
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="2"
                  max="20"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your trip plans, what you want to experience..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Image className="w-4 h-4 text-emerald-400" />
                  Trip Image URL (optional)
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold mb-4 text-emerald-400">Trip Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Destination:</span>
                    <span className="font-medium">{formData.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dates:</span>
                    <span className="font-medium">
                      {formData.startDate && new Date(formData.startDate).toLocaleDateString()} - {formData.endDate && new Date(formData.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Budget:</span>
                    <span className="font-medium text-emerald-400">₹{Number(formData.budget).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Participants:</span>
                    <span className="font-medium">{formData.maxParticipants}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Interests:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.interests.map((i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-sm">{i}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-gray-400">Description:</span>
                    <p className="mt-2 text-sm">{formData.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-400">
                  <strong>Note:</strong> Your trip will be reviewed by an admin before being published. You'll be able to see it in your profile once approved.
                </p>
              </div>
            </div>
          )}

        </motion.form>

        {/* Navigation Buttons - outside the form so Next Step never submits */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!isStepValid()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all ml-auto flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {loading ? 'Creating...' : 'Create Trip'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
