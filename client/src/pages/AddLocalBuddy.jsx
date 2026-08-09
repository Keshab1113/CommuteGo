import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Globe, Star, Clock, DollarSign, Shield, Loader2, X, Image, Gift, Award, CheckCircle, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SimpleSelect from '../components/ui/SimpleSelect';

const AddLocalBuddy = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    languages: [],
    interests: [],
    profileImage: '',
    location: { city: '', state: '', country: 'India' },
    dayRate: '',
    hourlyRate: '',
    priceNegotiable: false,
    availability: 'weekdays',
    responseTime: '< 1 hour',
    certifications: [],
    experience: '',
    whatIOffer: '',
    languagesSpoken: ''
  });

  const languageOptions = ['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi', 'Nepali', 'Other'];
  const interestOptions = ['Photography', 'Music', 'Art & Culture', 'Food & Cooking', 'Adventure', 'Nature', 'History', 'Trekking', 'Wildlife', 'Local Culture'];
  const availabilityOptions = ['Weekdays', 'Weekends', 'Flexible', 'Full Time'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep < 3) {
      nextStep();
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        ...formData,
        dayRate: Number(formData.dayRate),
        hourlyRate: formData.hourlyRate ? Number(formData.hourlyRate) : null,
        status: 'pending',
        submittedBy: 'user'
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/local-buddies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Application submitted! You will be notified after admin approval.');
        navigate('/local-buddies');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit application');
      }
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.displayName.trim() &&
          formData.location.city.trim() &&
          formData.location.state.trim() &&
          formData.languages.length > 0
        );
      case 2:
        return formData.dayRate && Number(formData.dayRate) > 0;
      case 3:
        return formData.bio.trim() && formData.whatIOffer.trim();
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast.error('Please fill all required fields before continuing.');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Become a Local Buddy
            </h1>
            <p className="text-gray-400 mt-1">Share your city with travelers and earn</p>
          </div>
        </div>

        {/* Reward Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 border border-rose-500/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-400">Why Become a Local Buddy?</h3>
              <p className="text-sm text-gray-400">Share your passion, earn money, make friends</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-black/30 border border-rose-500/20 text-center">
              <DollarSign className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <p className="text-sm font-bold text-white">Earn Extra</p>
              <p className="text-xs text-gray-400">Income sharing</p>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-rose-500/20 text-center">
              <Heart className="w-5 h-5 text-rose-400 mx-auto mb-1" />
              <p className="text-sm font-bold text-white">Meet Travelers</p>
              <p className="text-xs text-gray-400">Global friends</p>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-rose-500/20 text-center">
              <MessageCircle className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <p className="text-sm font-bold text-white">Share Stories</p>
              <p className="text-xs text-gray-400">Your culture</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
          {['Profile', 'Services', 'About'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                currentStep > index + 1
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : currentStep === index + 1
                  ? 'bg-rose-500 border-rose-500 text-white'
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
              {index < 2 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-3 ${
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
            {/* Step 1: Profile */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <User className="w-4 h-4 text-rose-400" />
                    Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="How should we call you?"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Your Location *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={formData.location.city}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      required
                      value={formData.location.state}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    Languages You Speak *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleArrayItem('languages', lang)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.languages.includes(lang)
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                            : 'bg-[#0a0a0a] border border-gray-700 hover:border-rose-500/50 text-gray-300'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Heart className="w-4 h-4 text-pink-400" />
                    Your Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleArrayItem('interests', interest)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                            : 'bg-[#0a0a0a] border border-gray-700 hover:border-rose-500/50 text-gray-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Image className="w-4 h-4 text-cyan-400" />
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Services & Pricing */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      Day Rate (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.dayRate}
                      onChange={(e) => setFormData({ ...formData, dayRate: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                      <Clock className="w-4 h-4 text-amber-400" />
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Availability
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availabilityOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, availability: option.toLowerCase() })}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          formData.availability === option.toLowerCase()
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                            : 'bg-[#0a0a0a] border border-gray-700 hover:border-rose-500/50 text-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Response Time
                  </label>
                  <SimpleSelect
                    value={formData.responseTime}
                    onChange={(value) => setFormData({ ...formData, responseTime: value })}
                    placeholder="Select response time"
                    options={[
                      { value: '< 30 mins', label: 'Less than 30 minutes' },
                      { value: '< 1 hour', label: 'Less than 1 hour' },
                      { value: '< 2 hours', label: 'Less than 2 hours' },
                      { value: '< 24 hours', label: 'Less than 24 hours' },
                    ]}
                    triggerClassName="w-full h-[58px] rounded-xl bg-[#0a0a0a] border-gray-700 text-white"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0a] border border-gray-700">
                  <input
                    type="checkbox"
                    id="negotiable"
                    checked={formData.priceNegotiable}
                    onChange={(e) => setFormData({ ...formData, priceNegotiable: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-rose-500 focus:ring-rose-500/50"
                  />
                  <label htmlFor="negotiable" className="text-sm text-gray-300">
                    My prices are negotiable
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: About */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Star className="w-4 h-4 text-amber-400" />
                    Bio / About You *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Tell travelers about yourself, your background, and why you love your city..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Heart className="w-4 h-4 text-rose-400" />
                    What Can You Offer? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.whatIOffer}
                    onChange={(e) => setFormData({ ...formData, whatIOffer: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Describe the experiences, tours, or activities you can provide to travelers..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Certifications / Experience
                  </label>
                  <input
                    type="text"
                    value={formData.certifications.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      certifications: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
                    })}
                    className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="Certified tour guide, 5+ years experience (comma separated)"
                  />
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-400">Before You Submit</p>
                      <ul className="mt-2 text-xs text-gray-400 space-y-1">
                        <li>• Your profile will be reviewed by admin within 24-48 hours</li>
                        <li>• Make sure your information is accurate and honest</li>
                        <li>• Add a clear profile photo for better engagement</li>
                      </ul>
                    </div>
                  </div>
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
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/25 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>

          <p className="text-center text-xs text-gray-500 pt-2">
            Your application will be reviewed by admin before appearing on the platform.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AddLocalBuddy;
