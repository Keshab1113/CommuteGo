import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Bus, Loader2, Check, Sparkles, Compass, MapPin } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import Seo from '../components/Seo/Seo';

const Signup = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", password: "" });
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: user.password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(user.password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(user.password) },
  ];

  const benefits = [
    { icon: Compass, text: "Discover offbeat destinations" },
    { icon: MapPin, text: "Connect with passionate locals" },
    { icon: Sparkles, text: "Find your travel tribe" },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#141313]">
      <Seo
        title="Sign Up"
        description="Create your free CommuteGo account. Join India's travel community — discover hidden destinations, meet local buddies, and find travel companions."
        path="/signup"
        index={false}
      />
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-rose-500/20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/30 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center items-center px-16"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
            <div className="w-16 h-16 rounded-2xl  flex items-center justify-center  group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="logo"  />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CommuteGo
            </span>
          </Link>

          <h1 className="text-5xl font-bold mb-6 leading-tight text-center">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Begin Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-400 bg-clip-text text-transparent">
              Adventure Today
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-md text-center">
            Join thousands of travelers discovering hidden gems, connecting with local experts, and creating unforgettable journeys together.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-gray-300 font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Signup Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 relative"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Bus className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                CommuteGo
              </span>
            </Link>
          </div>

          {/* Signup Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1C1B1B]/80 backdrop-blur-xl border border-gray-800/50 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create Account
                </span>
              </h2>
              <p className="text-gray-400">Join CommuteGo and start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0a0a0a]/50 border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0a0a0a]/50 border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    className="w-full pl-12 pr-14 py-4 rounded-2xl bg-[#0a0a0a]/50 border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${req.met ? 'bg-emerald-500' : 'bg-gray-800'}`}>
                        {req.met && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-xs transition-colors ${req.met ? 'text-emerald-400' : 'text-gray-500'}`}>
                        {req.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input type="checkbox" required className="w-5 h-5 rounded border-gray-700 bg-[#0a0a0a] text-cyan-500 focus:ring-cyan-500/50 cursor-pointer" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  I agree to the{" "}
                  <Link to="/terms-of-service" className="text-cyan-400 hover:text-cyan-300 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 hover:underline">Privacy Policy</Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-[#1C1B1B] text-sm text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              to="/login"
              className="block w-full text-center px-6 py-4 rounded-2xl border border-gray-800 hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-300 font-medium group"
            >
              <span className="text-gray-400 group-hover:text-white transition-colors">
                Sign in
              </span>
              <span className="ml-2 text-cyan-400 group-hover:text-cyan-300">→</span>
            </Link>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;