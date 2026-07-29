import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { MapPin, Route, ArrowRightLeft, Search as SearchIcon, Bus, X } from "lucide-react";
import "../../index.css";
import { useAuth } from "../../store/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from "../../context/ThemeContext";
import { cn } from "../../lib/utils";

const Search = () => {
  const { busdata } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("HOWRAH");
  const [fromvalue, setFvalue] = useState("JADAVPUR");
  const [open, setOpen] = useState(false);
  const [sopen, setSopen] = useState(false);
  const [stopen, setStopen] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);

  const onChange = (event) => {
    setStopen(true);
    setValue(event.target.value);
  };

  const onFchange = (event) => {
    setFvalue(event.target.value);
    setSopen(true);
    uniqueValue();
  };

  const onSearch = (searchTerm) => {
    setStopen(false);
    setValue(searchTerm);
  };

  const onFsearch = (searchFterm) => {
    setSopen(false);
    setFvalue(searchFterm);
  };

  const Swap = () => {
    const temp = value;
    setValue(fromvalue);
    setFvalue(temp);
  };

  const onButtonclick = () => {
    if (value === "" || fromvalue === "") {
      setOpen(false);
      toast.warn("Please Choose Your Destination");
    } else {
      setOpen(true);
      const result = busdata.filter(
        (item) => item.from === fromvalue && item.to === value
      );
      setResultSearch(result);
    }
    setSopen(false);
    setStopen(false);
  };

  const uniqueValue = () => {
    const searchVal = sopen ? fromvalue : value;
    const destination = sopen ? "from" : "to";
    const result = busdata
      .filter((item) => {
        const desVal = item[destination]?.toLowerCase() || "";
        const serVal = searchVal.toLowerCase();
        return desVal && serVal && desVal.startsWith(serVal);
      })
      .slice(0, 10)
      .filter(
        (item, i, arr) =>
          arr.findIndex((ele) => ele[destination] === item[destination]) === i
      );
    return result;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/header.mp4?alt=media&token=ec250b2e-12a1-433d-a937-afa21a10f5fc"
          muted
          autoPlay
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <ToastContainer position="top-center" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Search Your Destination
          </h1>
          <p className="text-gray-300 text-lg">Find buses and plan your journey easily</p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/95 dark:bg-[#1C1B1B]/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="flex flex-col md:flex-row">
              {/* From Input */}
              <div className="flex-1 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                <label className="block text-xs font-medium text-gray-500 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
                  <input
                    type="text"
                    value={fromvalue}
                    onChange={onFchange}
                    placeholder="Where from?"
                    className="w-full pl-10 pr-4 py-3 text-lg font-medium bg-transparent focus:outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="hidden md:flex items-center justify-center px-4 relative z-10">
                <button
                  onClick={Swap}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center text-white shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-110"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Swap Button */}
              <div className="flex md:hidden items-center justify-center p-2">
                <button
                  onClick={Swap}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm"
                >
                  <ArrowRightLeft className="w-4 h-4" /> Swap
                </button>
              </div>

              {/* To Input */}
              <div className="flex-1 p-4 md:p-6">
                <label className="block text-xs font-medium text-gray-500 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Where to?"
                    className="w-full pl-10 pr-4 py-3 text-lg font-medium bg-transparent focus:outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="p-4 md:p-6 flex items-center">
                <button
                  onClick={onButtonclick}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <SearchIcon className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Dropdown Results */}
          {(sopen || stopen) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1C1B1B] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20">
              {(sopen ? uniqueValue() : []).map((item, index) => (
                <button
                  key={index}
                  onClick={() => onFsearch(item.from)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  {item.from}
                </button>
              ))}
              {(stopen ? uniqueValue() : []).map((item, index) => (
                <button
                  key={index}
                  onClick={() => onSearch(item.to)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  {item.to}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            {resultSearch.length > 0 ? (
              <div className="space-y-4">
                {resultSearch.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-6 rounded-2xl bg-white/95 dark:bg-[#1C1B1B]/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                          <Bus className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4 text-cyan-500" />
                            {item.from}
                            <ArrowRightLeft className="w-3 h-3" />
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            {item.to}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Route</p>
                          <p className="text-sm font-medium">{item.route}</p>
                        </div>
                        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl bg-white/95 dark:bg-[#1C1B1B]/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
                <Bus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold mb-2">No Buses Found</h3>
                <p className="text-gray-500">Sorry, no buses found on this route. Try different locations.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
