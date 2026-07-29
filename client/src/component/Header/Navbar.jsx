import React, { useState, useEffect } from "react";
import { Menu, X, Bus, Train, Plane, Home, Info, Phone, User, LogOut, ChevronDown, MapPin, ArrowRight, Compass, Users, Heart, Sparkles } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { cn } from "../../lib/utils";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const adminlogin = () => {
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
    { to: "/services", label: "Services", icon: MapPin },
  ];

  const pillars = [
    { to: "/hidden-destinations", label: "Hidden Destinations", icon: Compass, color: "from-emerald-500 to-teal-500", description: "Discover authentic places" },
    { to: "/local-buddies", label: "Local Buddies", icon: Users, color: "from-cyan-500 to-blue-500", description: "Connect with passionate locals" },
    { to: "/travel-matchmaking", label: "Travel Together", icon: Heart, color: "from-rose-500 to-pink-500", description: "Find compatible companions" },
  ];

  const transportServices = [
    { to: "/bus", label: "Bus Booking", icon: Bus, color: "from-orange-500 to-red-500" },
    { to: "/flight", label: "Flight Booking", icon: Plane, color: "from-blue-500 to-cyan-500" },
    { to: "/train", label: "Train Booking", icon: Train, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2"
            : "py-4"
        )}
      >
        <div
          className={cn(
            "mx-auto w-[95vw] lg:w-[92vw] xl:w-[90vw] transition-all duration-500 rounded-2xl",
            scrolled
              ? "bg-[#141313]/90 backdrop-blur-xl shadow-premium border border-gray-800/50"
              : "bg-transparent"
          )}
        >
          <div className="px-4 lg:px-8 h-16 lg:h-18 flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl  flex items-center justify-center  transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg"><img src="/logo.png" alt="company logo" /></span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                  CommuteGo
                </span>
                <span className="text-[10px] text-gray-400 -mt-1 hidden sm:block">
                  Discover. Connect. Travel.
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Explore Dropdown - Three Pillars */}
              <div className="relative">
                <button
                  onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 rounded-xl transition-all duration-200 flex items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExploreDropdownOpen && "rotate-180")} />
                </button>

                {isExploreDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsExploreDropdownOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-80 rounded-2xl bg-[#1C1B1B] border border-gray-800 shadow-xl shadow-emerald-500/10 overflow-hidden z-50 animate-scale-in">
                      <div className="p-3">
                        <p className="px-3 py-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Discover India Differently
                        </p>
                        {pillars.map((pillar) => (
                          <NavLink
                            key={pillar.to}
                            to={pillar.to}
                            onClick={() => setIsExploreDropdownOpen(false)}
                            className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
                          >
                            <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0", pillar.color)}>
                              <pillar.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-200 group-hover:text-emerald-400 block">
                                {pillar.label}
                              </span>
                              <span className="text-xs text-gray-400">
                                {pillar.description}
                              </span>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                      <div className="border-t border-gray-800 p-2">
                        <NavLink
                          to="/hidden-destinations"
                          onClick={() => setIsExploreDropdownOpen(false)}
                          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all duration-200"
                        >
                          <span className="text-sm font-semibold text-emerald-400">
                            View All Destinations
                          </span>
                          <ArrowRight className="w-4 h-4 text-emerald-500" />
                        </NavLink>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Auth Button */}
              {isLoggedIn ? (
                <NavLink
                  to="/admin/profile"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <User className="w-4 h-4" />
                  Profile
                </NavLink>
              ) : (
                <button
                  onClick={adminlogin}
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <LogOut className="w-4 h-4" />
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-200"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden mx-auto w-[95vw] rounded-2xl overflow-hidden transition-all duration-300",
            isOpen
              ? "max-h-[500px] opacity-100 mt-2"
              : "max-h-0 opacity-0 mt-0"
          )}
        >
          <div className="bg-[#141313]/95 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-xl p-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-gray-300 hover:bg-gray-800/50"
                    )
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Transport Services
              </p>
              <div className="grid grid-cols-3 gap-2">
                {transportServices.map((service) => (
                  <NavLink
                    key={service.to}
                    to={service.to}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center gap-2 px-3 py-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-200"
                  >
                    <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center", service.color)}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-300">
                      {service.label.split(" ")[0]}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              {isLoggedIn ? (
                <NavLink
                  to="/admin/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-semibold"
                >
                  <User className="w-4 h-4" />
                  Profile
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    adminlogin();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
