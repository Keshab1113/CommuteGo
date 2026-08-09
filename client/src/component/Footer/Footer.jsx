import React from "react";
import { Link } from "react-router-dom";
import { Bus, Train, Plane, Home, Info, Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, ArrowRight, ChevronRight, Compass, Users, Heart, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About Us", icon: Info },
    { to: "/contact", label: "Contact Us", icon: Phone },
    { to: "/services", label: "Services", icon: MapPin },
  ];

  const pillars = [
    { to: "/hidden-destinations", label: "Hidden Destinations", icon: Compass, color: "from-emerald-500 to-teal-500" },
    { to: "/local-buddies", label: "Local Buddies", icon: Users, color: "from-cyan-500 to-blue-500" },
    { to: "/trips", label: "Travel Together", icon: Heart, color: "from-rose-500 to-pink-500" },
  ];

  const services = [
    { to: "/bus", label: "Bus Booking", icon: Bus },
    { to: "/flight", label: "Flight Booking", icon: Plane },
    { to: "/train", label: "Train Booking", icon: Train },
  ];

  const socialLinks = [
    { href: "#", label: "Facebook", icon: Facebook },
    { href: "#", label: "Twitter", icon: Twitter },
    { href: "#", label: "LinkedIn", icon: Linkedin },
    { href: "#", label: "Instagram", icon: Instagram },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] text-gray-300 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 group mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl  flex items-center justify-center  transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-xl"><img src="/logo.png" alt="company logo" /></span>
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">
                    CommuteGo
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Your Journey, Simplified
                  </p>
                </div>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                India's #1 platform for hidden travel experiences. Discover authentic destinations,
                connect with passionate locals, and travel with like-minded companions.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">2.5k+</p>
                  <p className="text-xs text-gray-500">Hidden Places</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">5k+</p>
                  <p className="text-xs text-gray-500">Local Buddies</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">50K+</p>
                  <p className="text-xs text-gray-500">Travelers</p>
                </div>
              </div>
            </div>

            {/* Three Pillars */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full"></span>
                Explore India
              </h3>
              <ul className="space-y-3">
                {pillars.map((pillar) => (
                  <li key={pillar.to}>
                    <Link
                      to={pillar.to}
                      className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors duration-200 group"
                    >
                      <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center", pillar.color)}>
                        <pillar.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm">{pillar.label}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 group"
                    >
                      <link.icon className="w-4 h-4 text-gray-500 group-hover:text-cyan-500 transition-colors" />
                      <span className="text-sm">{link.label}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"></span>
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>

              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-xs text-gray-500 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500 hover:to-emerald-500 hover:border-transparent transition-all duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              

              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email Us</p>
                    <p className="text-sm text-gray-300">keshabdas2003@gmail.com</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Established 2024</span>
              </div>

              <p className="text-sm text-gray-500 text-center">
                © {currentYear}{" "}
                <span className="text-gray-400">CommuteGo</span>. All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
