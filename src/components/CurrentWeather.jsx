import React from 'react';
import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <FaMapMarkerAlt className="text-red-400 text-xl mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {weather.location.name}, {weather.location.country}
            </h1>
          </div>
          <div className="flex items-center justify-center text-gray-300">
            <FaClock className="mr-2" />
            <span>{formatTime(weather.location.localtime)}</span>
          </div>
        </div>

        {/* Main Weather Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Temperature and Condition */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="w-24 h-24 md:w-32 md:h-32"
              />
              <div className="ml-4">
                <div className="text-6xl md:text-7xl font-bold text-white">
                  {Math.round(weather.current.temp_c)}°
                </div>
                <div className="text-2xl text-gray-300">
                  {weather.current.condition.text}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
              >
                <WiThermometer className="text-3xl text-yellow-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Feels Like</div>
                <div className="text-2xl text-yellow-300 font-bold">
                  {Math.round(weather.current.feelslike_c)}°C
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
              >
                <WiHumidity className="text-3xl text-blue-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Humidity</div>
                <div className="text-2xl text-blue-300 font-bold">
                  {weather.current.humidity}%
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
              >
                <WiStrongWind className="text-3xl text-green-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Wind Speed</div>
                <div className="text-2xl text-green-300 font-bold">
                  {weather.current.wind_kph} km/h
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
              >
                <div className="text-3xl text-purple-400 mx-auto mb-2">🌡️</div>
                <div className="text-white font-semibold">Pressure</div>
                <div className="text-2xl text-purple-300 font-bold">
                  {weather.current.pressure_mb} mb
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-300">
            <div>
              <div className="font-semibold">UV Index</div>
              <div className="text-white">{weather.current.uv}</div>
            </div>
            <div>
              <div className="font-semibold">Visibility</div>
              <div className="text-white">{weather.current.vis_km} km</div>
            </div>
            <div>
              <div className="font-semibold">Cloud Cover</div>
              <div className="text-white">{weather.current.cloud}%</div>
            </div>
            <div>
              <div className="font-semibold">Wind Direction</div>
              <div className="text-white">{weather.current.wind_dir}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather; 