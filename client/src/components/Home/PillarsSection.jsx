import { motion } from 'framer-motion';
import { Compass, Users, Heart } from 'lucide-react';

const PillarsSection = ({ destinationsCount, localBuddiesCount, tripsCount }) => {
  const pillars = [
    {
      icon: Compass,
      title: 'Hidden Destinations',
      description: 'Discover authentic places beyond tourist traps. From secret waterfalls to forgotten temples, explore India like a local.',
      color: 'from-emerald-500 to-teal-500',
      stats: `${destinationsCount}+ Hidden Gems`,
    },
    {
      icon: Users,
      title: 'Local Buddies',
      description: 'Connect with passionate locals who share their home, culture, and stories. Not guides—friends who show you the real India.',
      color: 'from-cyan-500 to-blue-500',
      stats: `${localBuddiesCount}+ Verified Locals`,
    },
    {
      icon: Heart,
      title: 'Travel Together',
      description: 'Find compatible travel companions. Split costs, share experiences, and create memories with like-minded explorers.',
      color: 'from-rose-500 to-pink-500',
      stats: `${tripsCount}+ Happy Travelers`,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-emerald-500/5 to-[#0a0a0a]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            Our Three Pillars
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              A Completely Different Way
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              To Experience India
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-transparent transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{pillar.description}</p>
                <p className="text-sm font-medium text-emerald-400">{pillar.stats}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
