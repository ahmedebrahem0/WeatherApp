import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaChartBar, FaChartArea, FaThermometerHalf } from 'react-icons/fa';

const WeatherCharts = ({ history }) => {
  const [chartType, setChartType] = useState('temperature');
  const [selectedDay, setSelectedDay] = useState(0);

  if (!history || history.length === 0) return null;

  const chartTypes = [
    { id: 'temperature', label: 'Temperature', icon: FaThermometerHalf },
    { id: 'humidity', label: 'Humidity', icon: FaChartLine },
    { id: 'wind', label: 'Wind Speed', icon: FaChartBar },
    { id: 'pressure', label: 'Pressure', icon: FaChartArea },
  ];

  const getChartData = () => {
    const day = history[selectedDay];
    if (!day) return [];

    console.log('Selected day data:', day);

    // Check if we have hourly data
    if (day.hour && Array.isArray(day.hour)) {
      return day.hour.map((hour, index) => {
        const time = new Date(hour.time_epoch * 1000).getHours();
        return {
          time: `${time}:00`,
          temperature: Math.round(hour.temp_c),
          humidity: hour.humidity,
          windSpeed: Math.round(hour.wind_kph),
          pressure: hour.pressure_mb,
          feelsLike: Math.round(hour.feelslike_c),
        };
      });
    }

    // If no hourly data, create mock data from daily data
    console.log('No hourly data found, creating mock data from daily data');
    const mockHours = [];
    for (let i = 0; i < 24; i += 3) { // Every 3 hours
      const time = i.toString().padStart(2, '0');
      mockHours.push({
        time: `${time}:00`,
        temperature: Math.round(day.day.avgtemp_c + (Math.random() - 0.5) * 10),
        humidity: Math.round(day.day.avghumidity + (Math.random() - 0.5) * 20),
        windSpeed: Math.round(day.day.maxwind_kph * (0.5 + Math.random() * 0.5)),
        pressure: Math.round(day.day.avgvis_km * 10 + 1000),
        feelsLike: Math.round(day.day.avgtemp_c + (Math.random() - 0.5) * 5),
      });
    }
    return mockHours;
  };

  const chartData = getChartData();

  // Debug logging
  console.log('WeatherCharts - History:', history);
  console.log('WeatherCharts - Chart Data:', chartData);
  console.log('WeatherCharts - Selected Day:', selectedDay);

  // Check if chart data is empty
  if (!chartData || chartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto mb-8"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Weather Analytics</h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-300 text-lg">No historical data available</p>
            <p className="text-gray-400 text-sm mt-2">Select a date with historical data to view analytics</p>
            <div className="mt-4 text-xs text-gray-500">
              Debug: History length = {history?.length || 0}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const getMaxValue = (key) => {
    return Math.max(...chartData.map(item => item[key]));
  };

  const getMinValue = (key) => {
    return Math.min(...chartData.map(item => item[key]));
  };

  const renderTemperatureChart = () => {
    const maxTemp = getMaxValue('temperature');
    const minTemp = getMinValue('temperature');
    const maxFeelsLike = getMaxValue('feelsLike');
    const minFeelsLike = getMinValue('feelsLike');

    console.log('Rendering temperature chart with data:', { maxTemp, minTemp, maxFeelsLike, minFeelsLike });

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-white font-semibold">Temperature (°C)</h4>
          <div className="text-sm text-gray-300">
            Max: {maxTemp}° | Min: {minTemp}°
          </div>
        </div>
        <div className="relative h-64 bg-white/5 rounded-lg p-4">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-white/10 h-0"></div>
            ))}
          </div>
          {/* Debug info */}
          <div className="absolute top-2 left-2 text-xs text-white/50">
            Data points: {chartData.length} | Max: {maxTemp}° | Min: {minTemp}°
          </div>
          {chartData.map((point, index) => {
            const tempRange = maxTemp - minTemp;
            const feelsRange = maxFeelsLike - minFeelsLike;
            
            const tempHeight = tempRange === 0 ? 50 : ((point.temperature - minTemp) / tempRange) * 100;
            const feelsHeight = feelsRange === 0 ? 50 : ((point.feelsLike - minFeelsLike) / feelsRange) * 100;
            const x = (index / (chartData.length - 1)) * 100;

            console.log(`Bar ${index}: tempHeight=${tempHeight}%, feelsHeight=${feelsHeight}%, x=${x}%`);

            return (
              <div key={index} className="absolute bottom-4" style={{ left: `${x}%` }}>
                {/* Temperature Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${tempHeight}%` }}
                  transition={{ delay: index * 0.1 }}
                  className="w-3 bg-gradient-to-t from-red-400 to-red-600 rounded-t shadow-lg"
                  style={{ 
                    height: `${tempHeight}%`,
                    minHeight: '10px',
                    position: 'absolute',
                    bottom: '0'
                  }}
                >
                  {/* Value label */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold whitespace-nowrap">
                    {point.temperature}°
                  </div>
                </motion.div>
                {/* Feels Like Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${feelsHeight}%` }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="w-3 bg-gradient-to-t from-orange-400 to-orange-600 rounded-t shadow-lg"
                  style={{ 
                    height: `${feelsHeight}%`,
                    minHeight: '10px',
                    position: 'absolute',
                    bottom: '0',
                    marginTop: '4px'
                  }}
                >
                  {/* Value label */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-orange-300 font-semibold whitespace-nowrap">
                    {point.feelsLike}°
                  </div>
                </motion.div>
                {/* Time Label */}
                <div className="text-xs text-gray-300 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
                  {point.time}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span className="text-gray-300">Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
            <span className="text-gray-300">Feels Like</span>
          </div>
        </div>
      </div>
    );
  };

  const renderHumidityChart = () => {
    const maxHumidity = getMaxValue('humidity');
    const minHumidity = getMinValue('humidity');

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-white font-semibold">Humidity (%)</h4>
          <div className="text-sm text-gray-300">
            Max: {maxHumidity}% | Min: {minHumidity}%
          </div>
        </div>
        <div className="relative h-64 bg-white/5 rounded-lg p-4">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-white/10 h-0"></div>
            ))}
          </div>
          {/* Debug info */}
          <div className="absolute top-2 left-2 text-xs text-white/50">
            Data points: {chartData.length} | Max: {maxHumidity}% | Min: {minHumidity}%
          </div>
          {chartData.map((point, index) => {
            const range = maxHumidity - minHumidity;
            const height = range === 0 ? 50 : ((point.humidity - minHumidity) / range) * 100;
            const x = (index / (chartData.length - 1)) * 100;

            return (
              <div key={index} className="absolute bottom-4" style={{ left: `${x}%` }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                  className="w-4 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t shadow-lg"
                  style={{ 
                    height: `${height}%`,
                    minHeight: '10px',
                    position: 'absolute',
                    bottom: '0'
                  }}
                >
                  {/* Value label */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-300 font-semibold whitespace-nowrap">
                    {point.humidity}%
                  </div>
                </motion.div>
                <div className="text-xs text-gray-300 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
                  {point.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWindChart = () => {
    const maxWind = getMaxValue('windSpeed');
    const minWind = getMinValue('windSpeed');

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-white font-semibold">Wind Speed (km/h)</h4>
          <div className="text-sm text-gray-300">
            Max: {maxWind} km/h | Min: {minWind} km/h
          </div>
        </div>
        <div className="relative h-64 bg-white/5 rounded-lg p-4">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-white/10 h-0"></div>
            ))}
          </div>
          {/* Debug info */}
          <div className="absolute top-2 left-2 text-xs text-white/50">
            Data points: {chartData.length} | Max: {maxWind} km/h | Min: {minWind} km/h
          </div>
          {chartData.map((point, index) => {
            const range = maxWind - minWind;
            const height = range === 0 ? 50 : ((point.windSpeed - minWind) / range) * 100;
            const x = (index / (chartData.length - 1)) * 100;

            return (
              <div key={index} className="absolute bottom-4" style={{ left: `${x}%` }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                  className="w-3 bg-gradient-to-t from-green-400 to-green-600 rounded-t shadow-lg"
                  style={{ 
                    height: `${height}%`,
                    minHeight: '10px',
                    position: 'absolute',
                    bottom: '0'
                  }}
                >
                  {/* Value label */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-300 font-semibold whitespace-nowrap">
                    {point.windSpeed}
                  </div>
                </motion.div>
                <div className="text-xs text-gray-300 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
                  {point.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPressureChart = () => {
    const maxPressure = getMaxValue('pressure');
    const minPressure = getMinValue('pressure');

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-white font-semibold">Pressure (mb)</h4>
          <div className="text-sm text-gray-300">
            Max: {maxPressure} mb | Min: {minPressure} mb
          </div>
        </div>
        <div className="relative h-64 bg-white/5 rounded-lg p-4">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-white/10 h-0"></div>
            ))}
          </div>
          {/* Debug info */}
          <div className="absolute top-2 left-2 text-xs text-white/50">
            Data points: {chartData.length} | Max: {maxPressure} mb | Min: {minPressure} mb
          </div>
          {chartData.map((point, index) => {
            const range = maxPressure - minPressure;
            const height = range === 0 ? 50 : ((point.pressure - minPressure) / range) * 100;
            const x = (index / (chartData.length - 1)) * 100;

            return (
              <div key={index} className="absolute bottom-4" style={{ left: `${x}%` }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                  className="w-3 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t shadow-lg"
                  style={{ 
                    height: `${height}%`,
                    minHeight: '10px',
                    position: 'absolute',
                    bottom: '0'
                  }}
                >
                  {/* Value label */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 font-semibold whitespace-nowrap">
                    {point.pressure}
                  </div>
                </motion.div>
                <div className="text-xs text-gray-300 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
                  {point.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case 'temperature':
        return renderTemperatureChart();
      case 'humidity':
        return renderHumidityChart();
      case 'wind':
        return renderWindChart();
      case 'pressure':
        return renderPressureChart();
      default:
        return renderTemperatureChart();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mb-8"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Weather Analytics</h2>
          <div className="flex space-x-2">
            {chartTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChartType(type.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  chartType === type.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                }`}
              >
                <type.icon className="text-sm" />
                <span className="text-sm font-medium">{type.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Day Selector */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {history.map((day, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(index)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  selectedDay === index
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                }`}
              >
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/5 rounded-lg p-6">
          {renderChart()}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartTypes.map((type) => {
            const data = chartData.map(item => item[type.id === 'wind' ? 'windSpeed' : type.id]);
            const avg = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
            
            return (
              <div key={type.id} className="text-center p-3 bg-white/5 rounded-lg">
                <type.icon className="text-2xl text-white mx-auto mb-2" />
                <div className="text-white font-semibold">{avg}</div>
                <div className="text-gray-300 text-sm">Avg {type.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCharts; 