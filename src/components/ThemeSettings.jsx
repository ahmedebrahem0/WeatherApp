import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FaSun, 
  FaMoon, 
  FaCog, 
  FaLeaf, 
  FaCloudSun, 
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

const ThemeSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isDark,
    seasonalTheme,
    weatherTheme,
    toggleTheme,
    setSeasonalThemeMode,
    setWeatherThemeMode,
    getCurrentSeason,
  } = useTheme();

  const seasonalOptions = [
    { value: 'auto', label: 'Auto', icon: FaLeaf, description: 'Based on current season' },
    { value: 'spring', label: 'Spring', icon: FaLeaf, description: 'Green & Pink theme' },
    { value: 'summer', label: 'Summer', icon: FaSun, description: 'Yellow & Orange theme' },
    { value: 'autumn', label: 'Autumn', icon: FaLeaf, description: 'Orange & Red theme' },
    { value: 'winter', label: 'Winter', icon: FaSnowflake, description: 'Blue & Cyan theme' },
    { value: 'none', label: 'None', icon: FaEyeSlash, description: 'No seasonal theme' },
  ];

  const weatherOptions = [
    { value: 'auto', label: 'Auto', icon: FaCloudSun, description: 'Based on weather' },
    { value: 'sunny', label: 'Sunny', icon: FaSun, description: 'Bright & Warm' },
    { value: 'rainy', label: 'Rainy', icon: FaCloudRain, description: 'Cool & Blue' },
    { value: 'snowy', label: 'Snowy', icon: FaSnowflake, description: 'Crisp & White' },
    { value: 'stormy', label: 'Stormy', icon: FaBolt, description: 'Dark & Purple' },
    { value: 'cloudy', label: 'Cloudy', icon: FaCloudSun, description: 'Gray & Blue' },
    { value: 'foggy', label: 'Foggy', icon: FaEye, description: 'Misty & Gray' },
    { value: 'none', label: 'None', icon: FaEyeSlash, description: 'No weather theme' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/20 backdrop-blur-lg rounded-full p-3 shadow-lg border border-white/20 hover:bg-white/30 transition-all duration-300"
      >
        <FaCog className="text-white text-xl" />
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 right-0 w-80 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">Theme Settings</h3>

            {/* Dark/Light Mode Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Dark Mode</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                    isDark ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    layout
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md ${
                      isDark ? 'right-1' : 'left-1'
                    }`}
                  />
                  <div className="flex items-center justify-between px-1 h-full">
                    <FaSun className="text-yellow-500 text-xs" />
                    <FaMoon className="text-blue-500 text-xs" />
                  </div>
                </motion.button>
              </div>
              <p className="text-gray-300 text-sm">
                Switch between light and dark themes
              </p>
            </div>

            {/* Current Info */}
            <div className="pt-4 border-t border-white/20">
              <div className="text-gray-300 text-sm">
                <div>Current Season: <span className="text-white font-medium">{getCurrentSeason()}</span></div>
                <div>Theme Mode: <span className="text-white font-medium">{isDark ? 'Dark' : 'Light'}</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSettings; 