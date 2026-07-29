import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Route, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from "react-toastify";

const defaultBusDataform = {
  name: "",
  from: "",
  to: "",
  route: "",
};

const AddBus = () => {
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [addbusdata, setaddbusdata] = useState(defaultBusDataform);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setaddbusdata({
      ...addbusdata,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata/addbus`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(addbusdata)
      });
      if (response.ok) {
        setaddbusdata(defaultBusDataform);
        toast.success("Bus added successfully!");
        navigate("/admin/busdata");
      } else {
        toast.error("Failed to add bus");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/busdata")}
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Bus List
        </button>

        {/* Form Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-premium">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Bus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Add New Bus</h1>
            <p className="text-sm text-gray-500">Enter the bus details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Bus Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Bus Name</label>
              <div className="relative">
                <Bus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  name="name"
                  value={addbusdata.name}
                  onChange={handleInput}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  placeholder="e.g., Kolkata Express"
                />
              </div>
            </div>

            {/* From & To */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
                  <input
                    type="text"
                    required
                    name="from"
                    value={addbusdata.from}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                    placeholder="City"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  <input
                    type="text"
                    required
                    name="to"
                    value={addbusdata.to}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    placeholder="City"
                  />
                </div>
              </div>
            </div>

            {/* Route */}
            <div>
              <label className="block text-sm font-medium mb-2">Route Details</label>
              <div className="relative">
                <Route className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  required
                  name="route"
                  value={addbusdata.route}
                  onChange={handleInput}
                  rows={4}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                  placeholder="Enter bus route details, stops, timing, etc."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Bus...
                </>
              ) : (
                <>
                  <Bus className="w-5 h-5" />
                  Add Bus
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBus;
