import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const CardSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-6 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
          <div className="h-4 bg-white/20 rounded w-4/6"></div>
        </div>
      </div>
    </motion.div>
  );

  const WeatherCardSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="animate-pulse">
        <div className="text-center mb-6">
          <div className="h-8 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 bg-white/20 rounded-full mr-4"></div>
          <div>
            <div className="h-12 bg-white/20 rounded mb-2"></div>
            <div className="h-6 bg-white/10 rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2"></div>
              <div className="h-4 bg-white/20 rounded mb-1"></div>
              <div className="h-6 bg-white/10 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const ForecastSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="animate-pulse">
        <div className="h-6 bg-white/20 rounded mb-4 w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-5 bg-white/20 rounded mb-3"></div>
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-white/10 rounded mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const TableSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="animate-pulse">
        <div className="h-6 bg-white/20 rounded mb-4 w-1/2"></div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-16 h-4 bg-white/20 rounded"></div>
              <div className="w-24 h-4 bg-white/10 rounded"></div>
              <div className="w-20 h-4 bg-white/20 rounded"></div>
              <div className="w-20 h-4 bg-white/10 rounded"></div>
              <div className="w-16 h-4 bg-white/20 rounded"></div>
              <div className="w-20 h-4 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const SearchSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto mb-8"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-white/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'weather-card':
        return <WeatherCardSkeleton />;
      case 'forecast':
        return <ForecastSkeleton />;
      case 'table':
        return <TableSkeleton />;
      case 'search':
        return <SearchSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton; 