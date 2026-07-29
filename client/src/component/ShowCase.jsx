import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { Shield, Route, Headphones, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ShowCase = () => {
  const { darkMode } = useContext(ThemeContext);

  const features = [
    {
      icon: Shield,
      title: 'Safety and Support',
      desc: 'Our top priority is the safety and well-being of our clients. We maintain high safety standards and have emergency support.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Route,
      title: 'Diverse Range of Destinations',
      desc: 'Whether it\'s a domestic tour or an international adventure, we cover a wide range of destinations to cater to different interests.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      desc: 'Our dedicated customer support team is available round the clock to address any queries or concerns before, during, and after the journey.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const benefits = [
    'Real-time bus tracking',
    'Instant booking confirmation',
    'Secure payment processing',
    'Multiple payment options',
    'Customer reviews and ratings',
    'Cancellation made easy'
  ];

  return (
    <div className={`min-h-screen py-20 ${darkMode ? 'bg-[#141313]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
              Why Should You Choose Us
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We have extensive knowledge and experience in the travel industry. Discover what makes us different.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Globe & Benefits */}
          <div className="relative">
            {/* Globe Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 blur-3xl"></div>
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden">
                <Globe className="w-48 h-48 text-cyan-500/50" />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white dark:bg-[#1C1B1B] shadow-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium">500+ Routes</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white dark:bg-[#1C1B1B] shadow-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-sm font-medium">100% Safe</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-lg font-bold mb-4">What You Get</h3>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
