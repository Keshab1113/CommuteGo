import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Compass, Users, Heart, ArrowRight, MapPin, Star, Shield, Clock, CheckCircle } from 'lucide-react';
import Seo from '../Seo/Seo';

const Services = () => {
  const services = [
    {
      icon: Compass,
      title: 'Hidden Destinations',
      description: 'Discover authentic, lesser-known destinations beyond tourist traps. From hidden waterfalls in Meghalaya to ancient trading posts on the Silk Road.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      features: [
        '2,500+ hidden gems documented',
        'Filter by adventure, nature, peace',
        'Safety scores & crowd levels',
        'Local tips & highlights',
      ],
      stats: [
        { value: '2,500+', label: 'Hidden Places' },
        { value: '50+', label: 'States Covered' },
        { value: '100%', label: 'Authentic' },
      ],
      link: '/hidden-destinations',
    },
    {
      icon: Users,
      title: 'Local Buddies',
      description: 'Connect with verified passionate locals who share their home, culture, and stories. Not guides—friends who show you the real India.',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      features: [
        '5,000+ verified local experts',
        'Photography, food, adventure',
        'Identity verified & background checked',
        'Real reviews from travelers',
      ],
      stats: [
        { value: '5,000+', label: 'Local Buddies' },
        { value: '100+', label: 'Cities' },
        { value: '4.9★', label: 'Avg Rating' },
      ],
      link: '/local-buddies',
    },
    {
      icon: Heart,
      title: 'Travel Matchmaking',
      description: "Don't travel alone. Find compatible companions heading to the same destination. Split costs, share experiences, create memories.",
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      features: [
        'Smart compatibility matching',
        'Destination & interest based',
        'Group trip creation',
        'Safe & verified profiles',
      ],
      stats: [
        { value: '50K+', label: 'Happy Travelers' },
        { value: '10K+', label: 'Trips Matched' },
        { value: '95%', label: 'Match Rate' },
      ],
      link: '/trips',
    },
  ];

  const whyChooseUs = [
    { icon: Shield, title: 'Verified & Safe', description: 'All Local Buddies are identity verified with background checks' },
    { icon: Star, title: 'Quality Assured', description: 'Only the best locals make it to our platform with 4.8+ ratings' },
    { icon: Clock, title: '24/7 Support', description: 'Our support team is always available to help you' },
    { icon: CheckCircle, title: 'Best Prices', description: 'Get authentic experiences at competitive prices' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Seo
        title="Services — Bus, Flight, Hidden Destinations & More"
        description="Explore CommuteGo services: book buses and flights, discover hidden destinations, connect with verified local buddies, and find travel companions for your next India trip."
        path="/services"
        keywords="bus booking India, flight booking, transport booking, CommuteGo services, travel services India"
      />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-rose-500/10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-rose-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Three Pillars of
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-400 bg-clip-text text-transparent">
                Unforgettable Travel
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              CommuteGo answers three questions no other travel platform addresses:
              Where to go? Who shows the real place? Who travels with you?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="pb-24 pt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 md:p-12 ${service.bgColor} border ${service.borderColor} overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center", service.color)}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                    </div>

                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className={cn("w-5 h-5", service.color.split(' ')[0])} />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <NavLink
                      to={service.link}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all",
                        `bg-gradient-to-r ${service.color} hover:shadow-lg hover:shadow-current/25`
                      )}
                    >
                      Explore {service.title} <ArrowRight className="w-4 h-4" />
                    </NavLink>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {service.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                      >
                        <p className={cn("text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent", service.color)}>
                          {stat.value}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Why Choose CommuteGo?
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We're not just another travel platform. We're your gateway to authentic Indian experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#1C1B1B] border border-gray-800 text-center hover:border-cyan-500/30 transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-rose-500/10 border border-gray-800 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore the Real India?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of travelers who have discovered authentic India through CommuteGo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/hidden-destinations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25"
              >
                Start Exploring <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-all font-semibold"
              >
                Learn More
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default Services;
