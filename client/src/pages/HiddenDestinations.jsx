import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Search, Calendar, Users, Shield, Star, Clock, Heart, Share2, Camera, Mountain, TreePine, Tent, Utensils, Waves, Building, Compass, ChevronDown, X } from 'lucide-react';

const HiddenDestinations = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: Compass },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'nature', label: 'Nature', icon: TreePine },
    { id: 'peaceful', label: 'Peaceful', icon: Heart },
    { id: 'weekend', label: 'Weekend Getaway', icon: Calendar },
    { id: 'camping', label: 'Camping', icon: Tent },
    { id: 'food', label: 'Food & Culture', icon: Utensils },
    { id: 'beach', label: 'Beach', icon: Waves },
    { id: 'heritage', label: 'Heritage', icon: Building },
    { id: 'photography', label: 'Photography', icon: Camera },
  ];

  const destinations = [
    {
      name: 'Mawlynnong Village',
      location: 'Meghalaya',
      image: 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Oct - Mar',
      crowdLevel: 'Very Low',
      budget: '₹3,500',
      tags: ['peaceful', 'nature', 'photography'],
      description: 'Asia\'s cleanest village with living root bridges and cloud-kissing peaks.',
      highlights: ['Living Root Bridges', 'Mawlynnong Falls', 'Sky Viewpoint'],
      safetyScore: 9.5,
      ratings: 4.9,
      reviews: 234,
    },
    {
      name: 'Chopta-Tungnath',
      location: 'Uttarakhand',
      image: 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=600&h=400&fit=crop',
      difficulty: 'Moderate',
      bestSeason: 'Apr - Jun',
      crowdLevel: 'Low',
      budget: '₹5,000',
      tags: ['adventure', 'nature', 'photography', 'weekend'],
      description: 'A pristine meadow surrounded by alpine flowers with ancient Tungnath temple.',
      highlights: ['Tungnath Temple', 'Chandrashila Summit', 'Alpine Meadows'],
      safetyScore: 8.8,
      ratings: 4.7,
      reviews: 456,
    },
    {
      name: 'Majuli Island',
      location: 'Assam',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Nov - Feb',
      crowdLevel: 'Very Low',
      budget: '₹4,000',
      tags: ['peaceful', 'heritage', 'weekend'],
      description: 'World\'s largest river island with Vaishnavite culture and mask-making.',
      highlights: ['Mask Workshops', 'River Cruise', 'Satras (Monasteries)'],
      safetyScore: 9.2,
      ratings: 4.8,
      reviews: 189,
    },
    {
      name: 'Spiti Valley',
      location: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop',
      difficulty: 'Challenging',
      bestSeason: 'May - Oct',
      crowdLevel: 'Low',
      budget: '₹12,000',
      tags: ['adventure', 'photography', 'camping'],
      description: 'A cold desert mountain valley with Buddhist monasteries and surreal landscapes.',
      highlights: ['Key Monastery', 'Chandratal Lake', 'Kibber Village'],
      safetyScore: 7.5,
      ratings: 4.9,
      reviews: 678,
    },
    {
      name: 'Gokarna',
      location: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Sep - Mar',
      crowdLevel: 'Medium',
      budget: '₹4,500',
      tags: ['beach', 'peaceful', 'weekend'],
      description: 'Serene beaches without commercial tourism, perfect for meditation and sunsets.',
      highlights: ['Om Beach', 'Mahabaleshwar Temple', 'Nameless Beaches'],
      safetyScore: 9.0,
      ratings: 4.6,
      reviews: 892,
    },
    {
      name: 'Ziro Valley',
      location: 'Arunachal Pradesh',
      image: 'https://images.unsplash.com/photo-1600091166971-7f16c8c7e7f2?w=600&h=400&fit=crop',
      difficulty: 'Moderate',
      bestSeason: 'Mar - Oct',
      crowdLevel: 'Very Low',
      budget: '₹6,500',
      tags: ['nature', 'heritage', 'photography'],
      description: 'Home to Apatani tribes with stunning rice terraces and tribal heritage.',
      highlights: ['Apatani Tribe', 'Rice Terraces', 'Dolphin Nose Viewpoint'],
      safetyScore: 8.5,
      ratings: 4.8,
      reviews: 167,
    },
    {
      name: 'Kinnaur Valley',
      location: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1585136917228-bd77b11cf700?w=600&h=400&fit=crop',
      difficulty: 'Moderate',
      bestSeason: 'Mar - Jun',
      crowdLevel: 'Low',
      budget: '₹7,000',
      tags: ['nature', 'adventure', 'photography'],
      description: 'A scenic valley with apple orchards, Himalayas views, and temples.',
      highlights: ['Apple Orchards', 'Nako Lake', 'Rekong Peo'],
      safetyScore: 8.7,
      ratings: 4.7,
      reviews: 312,
    },
    {
      name: 'Chaukhandi Bazar',
      location: 'Uttarakhand',
      image: 'https://images.unsplash.com/photo-1600091166971-7f16c8c7e7f2?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Year Round',
      crowdLevel: 'Very Low',
      budget: '₹2,500',
      tags: ['peaceful', 'heritage', 'weekend'],
      description: 'An ancient trade hub on the Silk Road with Buddhist stupas and temples.',
      highlights: ['Buddhist Stupas', 'Temple Complex', 'Mountain Views'],
      safetyScore: 9.1,
      ratings: 4.5,
      reviews: 98,
    },
    {
      name: 'Dhanushkodi',
      location: 'Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
      difficulty: 'Easy',
      bestSeason: 'Oct - Mar',
      crowdLevel: 'Very Low',
      budget: '₹3,000',
      tags: ['beach', 'heritage', 'adventure'],
      description: 'A ghost town at India\'s tip with ruins and pristine beaches.',
      highlights: ['Ghost Town Ruins', 'Pristine Beaches', 'Adam\'s Bridge'],
      safetyScore: 8.2,
      ratings: 4.6,
      reviews: 245,
    },
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter === 'all' || dest.tags.includes(activeFilter);
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || dest.difficulty === selectedDifficulty;
    const matchesBudget = selectedBudget === 'all' ||
                          (selectedBudget === 'low' && parseInt(dest.budget.replace(/[₹,]/g, '')) < 4000) ||
                          (selectedBudget === 'medium' && parseInt(dest.budget.replace(/[₹,]/g, '')) >= 4000 && parseInt(dest.budget.replace(/[₹,]/g, '')) < 8000) ||
                          (selectedBudget === 'high' && parseInt(dest.budget.replace(/[₹,]/g, '')) >= 8000);
    return matchesFilter && matchesSearch && matchesDifficulty && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-cyan-500/10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
              <Compass className="w-4 h-4" />
              Hidden Destinations
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Discover India's
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Hidden Gems
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Beyond tourist traps. Beyond crowded destinations. Find authentic India with us.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
              <input
                type="text"
                placeholder="Search destinations, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Additional Filters */}
            <div className="flex gap-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Budget</option>
                <option value="low">Budget (Under ₹4K)</option>
                <option value="medium">Mid-range (₹4K-8K)</option>
                <option value="high">Premium (₹8K+)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-500">
            Showing <span className="text-emerald-400 font-semibold">{filteredDestinations.length}</span> destinations
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <Compass className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Quick Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                        {destination.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" /> {destination.safetyScore}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      {destination.location}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{destination.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.highlights.slice(0, 3).map((highlight) => (
                        <span key={highlight} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold">{destination.ratings}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({destination.reviews} reviews)</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {destination.bestSeason}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {destination.crowdLevel}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-emerald-400">{destination.budget}</span>
                    </div>

                    {/* CTA */}
                    <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all">
                      Explore Destination
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HiddenDestinations;
