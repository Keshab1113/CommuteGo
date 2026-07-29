import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { Mail, ArrowRight, Bus, Loader2, CheckCircle, Shield, Sparkles, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset link sent! Check your email.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#141313]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-cyan-500/10 to-emerald-500/20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/30 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center px-16"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
            <div className="w-16 h-16 rounded-2xl  flex items-center justify-center  group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="logo"  />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CommuteGo
            </span>
          </Link>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Reset Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-rose-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Password
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-md">
            Don't worry, we've got you covered. Enter your email and we'll send you a link to reset your password.
          </p>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-cyan-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-rose-400" />
              </div>
              <span className="text-gray-300 font-medium">Your security is our priority</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-gray-300 font-medium">Secure password reset process</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-rose-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-gray-300 font-medium">Back to exploring in no time</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 relative"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
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

          {/* Forgot Password Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1C1B1B]/80 backdrop-blur-xl border border-gray-800/50 shadow-2xl">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500/20 to-cyan-500/20 flex items-center justify-center">
                    <KeyRound className="w-10 h-10 text-rose-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Forgot Password?
                    </span>
                  </h2>
                  <p className="text-gray-400">No worries, we'll send you reset instructions.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-rose-400 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0a0a0a]/50 border border-gray-800 focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 transition-all text-white placeholder-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-cyan-500 text-white font-semibold hover:from-rose-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending reset link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-8 text-center">
                  <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Check Your Email
                  </span>
                </h2>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  We've sent a password reset link to <span className="text-cyan-400 font-medium">{email}</span>. Please check your inbox and spam folder.
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                >
                  Didn't receive the email? Try again
                </button>
              </motion.div>
            )}
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

export default ForgotPassword;