import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMap, FaTimes, FaSearch, FaLocationArrow } from 'react-icons/fa';

const WeatherMap = ({ currentLocation, onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Mock map data - in real app, you'd use a mapping library like Leaflet or Google Maps
  const popularCities = [
    // Sunny Cities
    { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, temp: '22°C', condition: 'Sunny' },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, temp: '25°C', condition: 'Clear' },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, temp: '28°C', condition: 'Sunny' },
    { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, temp: '32°C', condition: 'Clear' },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, temp: '30°C', condition: 'Humid' },
    { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729, temp: '26°C', condition: 'Partly Cloudy' },
    
    // Rainy Cities
    { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, temp: '15°C', condition: 'Rainy' },
    { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, temp: '18°C', condition: 'Light Rain' },
    { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041, temp: '14°C', condition: 'Drizzle' },
    { name: 'Seattle', country: 'USA', lat: 47.6062, lng: -122.3321, temp: '12°C', condition: 'Heavy Rain' },
    { name: 'Vancouver', country: 'Canada', lat: 49.2827, lng: -123.1207, temp: '10°C', condition: 'Rainy' },
    { name: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522, temp: '8°C', condition: 'Light Rain' },
    { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686, temp: '9°C', condition: 'Drizzle' },
    { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lng: 12.5683, temp: '11°C', condition: 'Rainy' },
    { name: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603, temp: '13°C', condition: 'Light Rain' },
    { name: 'Glasgow', country: 'Scotland', lat: 55.8642, lng: -4.2518, temp: '12°C', condition: 'Heavy Rain' },
    { name: 'Manchester', country: 'UK', lat: 53.4808, lng: -2.2426, temp: '14°C', condition: 'Rainy' },
    { name: 'Belfast', country: 'Northern Ireland', lat: 54.5973, lng: -5.9301, temp: '11°C', condition: 'Drizzle' },
    { name: 'Bergen', country: 'Norway', lat: 60.3913, lng: 5.3221, temp: '7°C', condition: 'Heavy Rain' },
    { name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lng: -21.9426, temp: '5°C', condition: 'Light Rain' },
    
    // Cloudy Cities
    { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, temp: '16°C', condition: 'Cloudy' },
    { name: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, temp: '15°C', condition: 'Overcast' },
    { name: 'Warsaw', country: 'Poland', lat: 52.2297, lng: 21.0122, temp: '13°C', condition: 'Cloudy' },
    { name: 'Prague', country: 'Czech Republic', lat: 50.0755, lng: 14.4378, temp: '14°C', condition: 'Partly Cloudy' },
    { name: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, temp: '17°C', condition: 'Cloudy' },
    
    // Stormy Cities
    { name: 'Miami', country: 'USA', lat: 25.7617, lng: -80.1918, temp: '28°C', condition: 'Thunderstorm' },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, temp: '30°C', condition: 'Thunderstorm' },
    { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, temp: '32°C', condition: 'Heavy Rain' },
    { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, temp: '29°C', condition: 'Thunderstorm' },
    { name: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, temp: '31°C', condition: 'Heavy Rain' },
    
    // Foggy Cities
    { name: 'San Francisco', country: 'USA', lat: 37.7749, lng: -122.4194, temp: '18°C', condition: 'Foggy' },
    { name: 'Lima', country: 'Peru', lat: -12.0464, lng: -77.0428, temp: '20°C', condition: 'Misty' },
    { name: 'Valencia', country: 'Spain', lat: 39.4699, lng: -0.3763, temp: '22°C', condition: 'Foggy' },
  ];

  const filteredCities = popularCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    onLocationSelect(city.name, city.condition);
    setTimeout(() => setIsOpen(false), 1000);
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return '☀️';
    if (conditionLower.includes('cloudy') || conditionLower.includes('partly') || conditionLower.includes('overcast')) return '⛅';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return '🌧️';
    if (conditionLower.includes('snow') || conditionLower.includes('sleet')) return '❄️';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return '⛈️';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
    return '🌤️';
  };

  const getMarkerColor = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return 'bg-blue-500';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return 'bg-purple-500';
    if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) return 'bg-gray-500';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'bg-gray-400';
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Map Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/20 backdrop-blur-lg rounded-full p-3 shadow-lg border border-white/20 hover:bg-white/30 transition-all duration-300"
      >
        <FaMap className="text-white text-xl" />
      </motion.button>

      {/* Map Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-[500px] h-96 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Weather Map</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg border border-white/20 focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Map and Cities Side by Side */}
            <div className="flex gap-4 h-64">
              {/* Map Container */}
              <div className="flex-1 relative bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-lg border border-white/20 overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-green-200/30">
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="absolute w-full h-px bg-white" style={{ top: `${i * 10}%` }} />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="absolute h-full w-px bg-white" style={{ left: `${i * 10}%` }} />
                    ))}
                  </div>
                </div>

                {/* City Markers */}
                {filteredCities.map((city, index) => (
                  <motion.div
                    key={city.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${(city.lng + 180) / 360 * 100}%`,
                      top: `${(90 - city.lat) / 180 * 100}%`,
                    }}
                    onClick={() => handleLocationSelect(city)}
                  >
                    <div className="relative">
                      <div className={`w-3 h-3 ${getMarkerColor(city.condition)} rounded-full border-2 border-white shadow-lg`} />
                      {/* Tooltip */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        {city.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Current Location Marker */}
                {currentLocation && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                      <FaLocationArrow className="absolute -top-1 -right-1 text-blue-500 text-xs" />
                      {/* Tooltip */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        Current: {currentLocation.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600/90"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Cities List */}
              <div className="w-48 overflow-hidden">
                <div className="space-y-2">
                  {filteredCities.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-300 text-sm">No cities found</p>
                    </div>
                  ) : (
                    filteredCities.map((city) => (
                      <motion.button
                        key={city.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLocationSelect(city)}
                        className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200"
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getWeatherIcon(city.condition)}</span>
                          <div className="text-left">
                            <div className="text-white font-medium text-sm">{city.name}</div>
                            <div className="text-gray-300 text-xs">{city.country}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold text-sm">{city.temp}</div>
                          <div className="text-gray-300 text-xs">{city.condition}</div>
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Selected Location Info */}
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-400/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{selectedLocation.name}</div>
                    <div className="text-green-300 text-sm">Selected for weather info</div>
                  </div>
                  <span className="text-2xl">{getWeatherIcon(selectedLocation.condition)}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherMap; 