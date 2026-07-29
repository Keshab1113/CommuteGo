import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, ArrowRight, Sparkles, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      desc: "Get in touch via email for detailed inquiries",
      value: "keshabdas2003@gmail.com",
      color: "from-cyan-500 to-emerald-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      desc: "Chat with our team for instant assistance",
      value: "Available 24/7",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Phone,
      title: "Phone Support",
      desc: "Call us for urgent matters",
      value: "+91 xxxxxxxxx",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-500/10",
    },
  ];

  const faqs = [
    { q: "How do I find hidden destinations?", a: "Use our Hidden Destinations page to explore authentic places with filters for adventure, nature, peace, and more." },
    { q: "How do I become a Local Buddy?", a: "Apply through our Local Buddies page. We verify all applicants and provide training." },
    { q: "Is my payment secure?", a: "Yes! We use industry-standard encryption for all transactions." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-rose-500/10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              We'd Love to Hear
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-400 bg-clip-text text-transparent">
              From You
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about hidden destinations, becoming a Local Buddy, or finding travel companions? We're here to help!
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl bg-[#1C1B1B] border border-gray-800 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${method.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.desc}</p>
                <p className="text-cyan-400 font-medium">{method.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-16">
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-[#1C1B1B] border border-gray-800"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                  <Send className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Send us a Message</h2>
                  <p className="text-gray-400 text-sm">We typically respond within 24 hours</p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We'll get back to you soon. Check your email!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                        placeholder="Keshab Das"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                        placeholder="keshab@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
                    >
                      <option value="">Select a topic</option>
                      <option value="hidden-destinations">Hidden Destinations</option>
                      <option value="local-buddies">Local Buddies</option>
                      <option value="travel-matchmaking">Travel Matchmaking</option>
                      <option value="bug-report">Bug Report</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border border-gray-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none text-white placeholder-gray-500"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  >
                    Send Message <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Side - FAQ & Info */}
            <div className="space-y-8">
              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-3xl bg-[#1C1B1B] border border-gray-800"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800">
                      <h4 className="font-semibold mb-2 text-gray-200">{faq.q}</h4>
                      <p className="text-sm text-gray-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-xl font-bold">Response Time</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Email</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Live Chat</span>
                    <span className="font-medium">Instant</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Phone</span>
                    <span className="font-medium">Within 1 hour</span>
                  </div>
                </div>
              </motion.div>

              
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-rose-500/10 border border-gray-800 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Want to Explore Right Now?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Start discovering hidden destinations, connect with local experts, or find your travel companions today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/hidden-destinations"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 inline-flex items-center justify-center gap-2"
              >
                Explore Destinations <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/local-buddies"
                className="px-8 py-4 rounded-xl border border-gray-700 hover:bg-white/5 transition-all font-semibold inline-flex items-center justify-center gap-2"
              >
                Meet Local Buddies
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
