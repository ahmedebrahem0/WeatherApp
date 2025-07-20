import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTrash, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const FavoriteLocations = ({ currentLocation, onLocationSelect }) => {
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weather-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (location) => {
    if (!favorites.find(fav => fav.name === location.name)) {
      const newFavorite = {
        ...location,
        addedAt: new Date().toISOString(),
      };
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFromFavorites = (locationName) => {
    setFavorites(favorites.filter(fav => fav.name !== locationName));
  };

  const isFavorite = (locationName) => {
    return favorites.some(fav => fav.name === locationName);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Favorites Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/20 backdrop-blur-lg rounded-full p-3 shadow-lg border border-white/20 hover:bg-white/30 transition-all duration-300"
      >
        <FaHeart className="text-white text-xl" />
        {favorites.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </motion.button>

      {/* Favorites Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-80 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Favorite Locations</h3>
              <FaStar className="text-yellow-400 text-lg" />
            </div>

            {/* Current Location */}
            {currentLocation && (
              <div className="mb-4 p-3 bg-white/10 rounded-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-red-400 mr-2" />
                    <div>
                      <div className="text-white font-medium">{currentLocation.name}</div>
                      <div className="text-gray-300 text-sm">{currentLocation.country}</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToFavorites(currentLocation)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite(currentLocation.name)
                        ? 'text-red-500 bg-red-500/20'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-500/20'
                    }`}
                  >
                    <FaHeart className={isFavorite(currentLocation.name) ? 'fill-current' : ''} />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Favorites List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <FaHeart className="text-gray-400 text-3xl mx-auto mb-2" />
                  <p className="text-gray-300 text-sm">No favorite locations yet</p>
                  <p className="text-gray-400 text-xs">Add locations to see them here</p>
                </div>
              ) : (
                favorites.map((favorite, index) => (
                  <motion.div
                    key={favorite.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onLocationSelect(favorite.name);
                        setIsOpen(false);
                      }}
                      className="flex items-center flex-1 text-left"
                    >
                      <FaMapMarkerAlt className="text-blue-400 mr-2" />
                      <div>
                        <div className="text-white font-medium">{favorite.name}</div>
                        <div className="text-gray-300 text-xs">{favorite.country}</div>
                        <div className="text-gray-400 text-xs">
                          Added {formatDate(favorite.addedAt)}
                        </div>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromFavorites(favorite.name)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors"
                    >
                      <FaTrash className="text-sm" />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Quick Actions */}
            {favorites.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {favorites.length} location{favorites.length !== 1 ? 's' : ''}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFavorites([]);
                      localStorage.removeItem('weather-favorites');
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteLocations; 