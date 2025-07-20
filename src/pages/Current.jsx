import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWeather } from "../hooks/useWeather";
import { useTheme } from "../contexts/ThemeContext";
import SearchForm from "../components/SearchForm";
import CurrentWeather from "../components/CurrentWeather";
import ForecastCard from "../components/ForecastCard";
import HistoryTable from "../components/HistoryTable";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSkeleton from "../components/LoadingSkeleton";
import WeatherAnimations from "../components/WeatherAnimations";
import WeatherCharts from "../components/WeatherCharts";
import ThemeSettings from "../components/ThemeSettings";
import FavoriteLocations from "../components/FavoriteLocations";
import WeatherMap from "../components/WeatherMap";

export default function Current() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState(null);
  const [search, setSearch] = useState("2025-02-1");
  const [town, setTown] = useState("Egypt");
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "aab2a1b0c365457eaa564535250202";

  const handleMapLocationSelect = (cityName, weatherCondition) => {
    setLocation(cityName);
    setMapWeatherCondition(weatherCondition);
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-all duration-300';
    notification.innerHTML = `
      <div class="flex items-center">
        <span class="text-lg mr-2">${getWeatherIcon(weatherCondition)}</span>
        <div>
          <div class="font-semibold">${cityName}</div>
          <div class="text-sm opacity-90">${weatherCondition}</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
    
    // Clear map weather condition after 5 seconds
    setTimeout(() => setMapWeatherCondition(null), 5000);
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return '🌧️';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return '⛈️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) return '⛅';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return '☀️';
    return '🌤️';
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // Use map weather condition if available, otherwise use actual weather
  const currentWeatherCondition = mapWeatherCondition || weather?.current?.condition?.text;

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600'
    }`}>
      {/* Weather Animations */}
      <WeatherAnimations weatherCondition={currentWeatherCondition} />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Action Buttons */}
      <ThemeSettings />
      <FavoriteLocations 
        currentLocation={weather?.location} 
        onLocationSelect={handleLocationSelect} 
      />
      <WeatherMap 
        currentLocation={weather?.location} 
        onLocationSelect={handleMapLocationSelect} 
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🌤️ Weather App
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get real-time weather information, forecasts, and historical data for any location around the world
          </p>
        </motion.div>

        {/* Search Form */}
        <SearchForm
          location={location}
          setLocation={setLocation}
          days={days}
          setDays={setDays}
          date={date}
          setDate={setDate}
          onSearch={handleSearch}
        />

        {/* Error Message */}
        {error && (
          <ErrorMessage error={error} onRetry={handleRetry} />
        )}

        {/* Loading States */}
        {loading && !error && (
          <div className="space-y-8">
            <LoadingSkeleton type="search" />
            <LoadingSkeleton type="weather-card" />
            {days > 0 && <LoadingSkeleton type="forecast" />}
            {history && history.length > 0 && <LoadingSkeleton type="table" />}
          </div>
        )}

        {/* Weather Content */}
        {!loading && !error && weather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Current Weather */}
            <CurrentWeather weather={weather} />

            {/* Forecast */}
            {days > 0 && forecast && (
              <ForecastCard forecast={forecast} />
            )}

            {/* Weather Charts */}
            {history && history.length > 0 && (
              <WeatherCharts history={history} />
            )}

            {/* Historical Data */}
            {history && history.length > 0 && (
              <HistoryTable history={history} />
            )}
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-white/20"
        >
          <p className="text-gray-400 text-sm">
            Powered by WeatherAPI.com • Built with React & Tailwind CSS
          </p>
          <div className="mt-2 text-gray-500 text-xs">
            Features: Dark/Light Mode • Seasonal Themes • Weather Animations • Interactive Maps • Analytics
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
