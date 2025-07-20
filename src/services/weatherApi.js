import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "0e55861eadec48788c993455252302";
const BASE_URL = 'https://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
});

export const getCurrentWeather = async (location) => {
  try {
    const response = await weatherApi.get('/current.json', {
      params: { q: location }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch current weather: ${error.message}`);
  }
};

export const getForecast = async (location, days) => {
  try {
    const response = await weatherApi.get('/forecast.json', {
      params: { q: location, days }
    });
    return response.data.forecast;
  } catch (error) {
    throw new Error(`Failed to fetch forecast: ${error.message}`);
  }
};

export const getHistoricalWeather = async (location, date) => {
  try {
    const response = await weatherApi.get('/history.json', {
      params: { q: location, dt: date }
    });
    return response.data.forecast.forecastday;
  } catch (error) {
    throw new Error(`Failed to fetch historical weather: ${error.message}`);
  }
};

export const getAllWeatherData = async (location, days, date) => {
  try {
    const [current, forecast, history] = await Promise.all([
      getCurrentWeather(location),
      getForecast(location, days),
      getHistoricalWeather(location, date)
    ]);
    
    return { current, forecast, history };
  } catch (error) {
    throw error;
  }
}; 