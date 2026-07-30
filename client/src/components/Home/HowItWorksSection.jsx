import { motion } from 'framer-motion';
import { Compass, Users, Heart, Sparkles } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Discover',
      description: 'Search hidden destinations based on your interests, budget, and travel style. Explore authentic places beyond tourist traps.',
      icon: Compass,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      step: '02',
      title: 'Connect',
      description: 'Book a local buddy who shares your interests. Spend a day exploring the real culture, food, and stories.',
      icon: Users,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      step: '03',
      title: 'Travel Together',
      description: 'Find compatible companions for your trip. Split costs, share experiences, and create lasting friendships.',
      icon: Heart,
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Three Simple Steps to
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Unforgettable Journeys
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <p className="text-5xl font-black bg-gradient-to-r from-white/20 to-white/10 bg-clip-text text-transparent mb-2">
                {item.step}
              </p>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
