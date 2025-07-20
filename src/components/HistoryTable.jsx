import React from 'react';
import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi';

const HistoryTable = ({ history }) => {
  if (!history || history.length === 0) return null;

  const formatTime = (timeEpoch) => {
    return new Date(timeEpoch * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mb-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
        📊 Historical Weather Data
      </h2>

      <div className="space-y-4">
        {history.map((day, dayIndex) => (
          <motion.div
            key={dayIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
            className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20"
          >
            {/* Day Header */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {formatDate(day.date)}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {day.day.condition.text}
                    </div>
                  </div>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="w-16 h-16"
                  />
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-red-400 text-sm">Max</div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(day.day.maxtemp_c)}°
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 text-sm">Min</div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(day.day.mintemp_c)}°
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Data - Always Visible */}
            <div className="px-6 pb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {day.hour.map((hourData, hourIndex) => (
                    <motion.div
                      key={hourIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: hourIndex * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-white font-semibold">
                          {formatTime(hourData.time_epoch)}
                        </div>
                        <img
                          src={hourData.condition.icon}
                          alt={hourData.condition.text}
                          className="w-8 h-8"
                        />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <WiThermometer className="text-yellow-400 mr-2" />
                            <span>Temp</span>
                          </div>
                          <span className="text-white font-semibold">
                            {Math.round(hourData.temp_c)}°C
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <WiThermometer className="text-orange-400 mr-2" />
                            <span>Feels</span>
                          </div>
                          <span className="text-white font-semibold">
                            {Math.round(hourData.feelslike_c)}°C
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <WiHumidity className="text-blue-400 mr-2" />
                            <span>Humidity</span>
                          </div>
                          <span className="text-white font-semibold">
                            {hourData.humidity}%
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <WiStrongWind className="text-green-400 mr-2" />
                            <span>Wind</span>
                          </div>
                          <span className="text-white font-semibold">
                            {Math.round(hourData.wind_kph)} km/h
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HistoryTable; 