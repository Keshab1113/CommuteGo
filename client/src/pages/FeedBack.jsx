import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, User, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from "react-toastify";
import { ThemeContext } from '../context/ThemeContext';

const defaultfeedbackform = {
  fullname: "",
  email: "",
  phone: "",
  message: "",
};

const FeedBack = () => {
  const [feedback, setFeedback] = useState(defaultfeedbackform);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form`, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ ...feedback, type: "contact" }),
      });
      if (response.ok) {
        setFeedback(defaultfeedbackform);
        setSubmitted(true);
        toast.success("Message sent successfully!");
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-20 ${darkMode ? 'bg-[#141313]' : 'bg-white'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4"
          >
            <MessageSquare className="w-4 h-4" />
            Feedback
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
              We Value Your Feedback
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
          >
            Have suggestions or concerns? We'd love to hear from you. Your feedback helps us improve.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-premium"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Your feedback has been received. We appreciate you taking the time to share your thoughts with us.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      name="fullname"
                      value={feedback.fullname}
                      onChange={handleInput}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      name="email"
                      value={feedback.email}
                      onChange={handleInput}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={feedback.phone}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                    placeholder="+91 9999999999"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Feedback</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={feedback.message}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
                    placeholder="Tell us how we can improve..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">keshabdas2003@gmail.com</p>
            </div>
          </div>
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeedBack;
