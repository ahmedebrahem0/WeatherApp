import React from 'react';
import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const ForecastCard = ({ forecast }) => {
  if (!forecast?.forecastday || forecast.forecastday.length === 0) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
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
        📅 Weather Forecast
      </h2>
      
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        {forecast.forecastday.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
            className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
          >
            {/* Date */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-1">
                {formatDate(day.date)}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Weather Icon and Condition */}
            <div className="text-center mb-4">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-20 h-20 mx-auto mb-2"
              />
              <p className="text-gray-300 text-sm font-medium">
                {day.day.condition.text}
              </p>
            </div>

            {/* Temperature */}
            <div className="text-center mb-4">
              <div className="flex justify-center items-center space-x-4">
                <div>
                  <div className="text-red-400 text-sm font-semibold">Max</div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(day.day.maxtemp_c)}°
                  </div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div>
                  <div className="text-blue-400 text-sm font-semibold">Min</div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(day.day.mintemp_c)}°
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-300">
                  <WiHumidity className="text-blue-400 mr-2" />
                  <span>Humidity</span>
                </div>
                <span className="text-white font-semibold">
                  {day.day.avghumidity}%
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-300">
                  <WiStrongWind className="text-green-400 mr-2" />
                  <span>Wind</span>
                </div>
                <span className="text-white font-semibold">
                  {Math.round(day.day.maxwind_kph)} km/h
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Chance of Rain</span>
                <span className="text-white font-semibold">
                  {day.day.daily_chance_of_rain}%
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">UV Index</span>
                <span className="text-white font-semibold">
                  {day.day.uv}
                </span>
              </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center text-xs">
                <div>
                  <div className="text-yellow-400 mb-1">🌅 Sunrise</div>
                  <div className="text-white font-semibold">
                    {day.astro.sunrise}
                  </div>
                </div>
                <div>
                  <div className="text-orange-400 mb-1">🌇 Sunset</div>
                  <div className="text-white font-semibold">
                    {day.astro.sunset}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastCard; 