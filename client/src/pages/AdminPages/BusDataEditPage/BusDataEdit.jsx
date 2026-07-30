import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { ThemeContext } from "../../../context/ThemeContext";
import { toast } from "react-toastify";
import { Bus, MapPin, Route, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const BusDataEdit = () => {
  const [data, setData] = useState({
    name: "",
    from: "",
    to: "",
    route: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { authorizationToken } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  const getSingleBusData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/busdata/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const busData = await response.json();
      setData({
        name: busData.name || "",
        from: busData.from || "",
        to: busData.to || "",
        route: busData.route || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch bus data");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getSingleBusData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/form/busdata/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Bus updated successfully");
        navigate(-1);
      } else {
        toast.error("Failed to update bus");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Bus List
        </button>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-premium">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Bus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Update Bus</h1>
            <p className="text-sm text-gray-500">Edit bus details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Bus Name</label>
              <div className="relative">
                <Bus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInput}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
                  <input
                    type="text"
                    name="from"
                    value={data.from}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  <input
                    type="text"
                    name="to"
                    value={data.to}
                    onChange={handleInput}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Route Details</label>
              <div className="relative">
                <Route className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  rows={4}
                  name="route"
                  value={data.route}
                  onChange={handleInput}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Bus className="w-5 h-5" />
                  Update Bus
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BusDataEdit;
