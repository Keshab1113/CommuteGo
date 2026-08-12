import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Heart, Award, ArrowRight, Sparkles, Compass, Users as Buddies, Target, Eye, Globe, TrendingUp, Map } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Seo from '../components/Seo/Seo';

const About = () => {
  const team = [
    { name: 'Keshab Das', role: 'Founder & Developer', src: '/keshab.png', stats: '500+ Routes' },
    ];

  const values = [
    { icon: Target, title: 'Our Mission', desc: 'To make hidden travel experiences accessible for every Indian explorer.', color: 'from-emerald-500 to-teal-500' },
    { icon: Eye, title: 'Our Vision', desc: "To become India's most trusted travel companion for discovering authentic destinations.", color: 'from-cyan-500 to-blue-500' },
    { icon: Heart, title: 'Our Values', desc: 'Customer-first approach, transparency, innovation, and unwavering commitment to safety.', color: 'from-rose-500 to-pink-500' },
  ];

  const pillars = [
    { icon: Compass, title: 'Hidden Destinations', desc: '2,500+ authentic places', color: 'from-emerald-500 to-teal-500' },
    { icon: Buddies, title: 'Local Buddies', desc: '5,000+ verified experts', color: 'from-cyan-500 to-blue-500' },
    { icon: Heart, title: 'Travel Together', desc: '50,000+ happy travelers', color: 'from-rose-500 to-pink-500' },
  ];

  const stats = [
    { value: '2,500+', label: 'Hidden Places', icon: MapPin },
    { value: '5,000+', label: 'Local Buddies', icon: Users },
    { value: '50K+', label: 'Happy Travelers', icon: Heart },
    { value: '24/7', label: 'Support', icon: Globe },
  ];

  const milestones = [
    { year: '2024', title: 'Launch', desc: 'CommuteGo officially launched', icon: Sparkles },
    { year: '2024', title: '100+ Routes', desc: 'Expanded to 100+ routes', icon: Map },
    { year: '2025', title: '10K Users', desc: 'Reached 10,000 active users', icon: TrendingUp },
    { year: '2026', title: '500+ Routes', desc: '500+ destinations covered', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Seo
        title="About Us"
        description="CommuteGo helps travelers discover hidden destinations, connect with verified local buddies, and find travel companions. Learn about our mission to make every Indian explorer discover the real India."
        path="/about"
        keywords="about CommuteGo, India travel platform, travel community, hidden places story, travel mission"
      />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-rose-500/10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
            >
              <Heart className="w-4 h-4" />
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                CommuteGo
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-400 bg-clip-text text-transparent">
                Your Travel Companion
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Discover Hidden Places. Meet Local Experts. Travel Together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <NavLink
                to="/hidden-destinations"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 inline-flex items-center justify-center gap-2"
              >
                Start Exploring <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/contact"
                className="px-8 py-4 rounded-2xl border border-gray-700 hover:bg-white/5 transition-all font-semibold inline-flex items-center justify-center gap-2"
              >
                Contact Us
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Our Three Pillars
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                A Different Way to Travel
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${pillar.color} opacity-90 hover:opacity-100 transition-all cursor-pointer group`}
              >
                <div className="absolute inset-0 bg-[#1C1B1B] rounded-3xl z-0 group-hover:opacity-90 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-gray-300">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-rose-500/10 border border-white/10 p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                  <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Redefining Travel in India
                </span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                CommuteGo is India's #1 platform for hidden travel experiences. We believe that the best journeys aren't found in guidebooks—they're discovered through local connections and authentic experiences.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Most travel websites answer: "Where should I stay?" We answer three completely different questions:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Where should I actually go?',
                  'Who can show me the real place?',
                  'Who can travel with me?'
                ].map((q, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <span className="text-lg text-gray-300">{q}</span>
                  </li>
                ))}
              </ul>
              <NavLink
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </NavLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
                  alt="Mountain landscape"
                  className="w-full h-auto rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">100%</p>
                      <p className="text-sm text-gray-300">Authentic</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">24/7</p>
                      <p className="text-sm text-gray-300">Support</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">50K+</p>
                      <p className="text-sm text-gray-300">Happy Users</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full blur-[64px] opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                What Drives Us
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-8 rounded-3xl bg-[#1C1B1B] border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Meet the People
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1  gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-1">
                    <img
                      src={member.src}
                      alt={member.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#1C1B1B] border border-gray-800">
                    <span className="text-sm font-medium text-cyan-400">{member.stats}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="relative py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-3xl bg-[#1C1B1B] border border-gray-800 hover:border-cyan-500/30 transition-all">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                    <milestone.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-1">{milestone.year}</h3>
                  <p className="text-lg font-semibold text-center mb-1">{milestone.title}</p>
                  <p className="text-sm text-gray-400 text-center">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-[#1C1B1B] border border-gray-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold">Important Disclaimer</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              This web site (CommuteGo) is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-rose-500/20 rounded-full blur-[128px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Ready to Explore?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Join thousands of travelers discovering the real India through CommuteGo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/hidden-destinations"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 inline-flex items-center justify-center gap-2"
              >
                Start Exploring <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/contact"
                className="px-8 py-4 rounded-2xl border border-gray-700 hover:bg-white/5 transition-all font-semibold inline-flex items-center justify-center gap-2"
              >
                Get In Touch
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
