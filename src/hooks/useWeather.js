import { useState, useEffect, useCallback } from 'react';
import { getAllWeatherData } from '../services/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async (location, days, date) => {
    if (!location) return;
    
    setLoading(true);
    setError(null);

    try {
      const data = await getAllWeatherData(location, days, date);
      setWeather(data.current);
      setForecast(data.forecast);
      setHistory(data.history);
    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weather,
    forecast,
    history,
    loading,
    error,
    fetchWeatherData,
    clearError
  };
}; 