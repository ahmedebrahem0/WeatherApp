import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaThermometerHalf } from 'react-icons/fa';

const SearchForm = ({ location, setLocation, days, setDays, date, setDate, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto mb-8"
    >
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location Input */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Enter city name..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/90 text-gray-800 rounded-xl border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all duration-300 placeholder-gray-500"
            />
          </div>

          {/* Days Input */}
          <div className="relative">
            <FaThermometerHalf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="number"
              placeholder="Forecast days (0-7)"
              min="0"
              max="7"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 bg-white/90 text-gray-800 rounded-xl border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all duration-300 placeholder-gray-500"
            />
          </div>

          {/* Date Input */}
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/90 text-gray-800 rounded-xl border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Weather
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchForm; 