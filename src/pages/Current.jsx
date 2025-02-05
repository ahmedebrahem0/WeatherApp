import axios from "axios";
import React, { useEffect, useState } from "react";

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

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const [currentRes, forecastRes, historyRes] = await Promise.all([
        axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${town}`
        ),
        axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${town}&days=${days}`
        ),
        axios.get(
          `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${town}&dt=${search}`
        ),
      ]);

      setWeather(currentRes.data);
      setForecast(forecastRes.data.forecast);
      setHistory(historyRes.data.forecast.forecastday);
    } catch (err) {
      console.error("Error fetching weather data", err);
      setError("Failed to fetch weather data, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [town, days, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center text-white p-4">
      <div className="bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6 w-full max-w-full sm:max-w-4xl">
        <div className="bg-gray-200 w-full p-3 rounded-2xl flex flex-col sm:flex-row justify-evenly items-center">
          <input
            type="text"
            className="bg-white text-amber-700 p-2 rounded-md mb-2 sm:mb-0 sm:w-1/3"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          <input
            type="text"
            className="bg-white text-amber-700 p-2 rounded-md mb-2 sm:mb-0 sm:w-1/3"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <input
            type="text"
            className="bg-white text-amber-700 p-2 rounded-md sm:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>

      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        weather && (
          <div className="bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-full sm:max-w-4xl">
            <h1 className="text-3xl font-bold text-amber-300 mb-4">
              {weather.location.name}, {weather.location.country}
            </h1>
            <p className="text-lg">
              Temperature :
              <span className="text-amber-300 ml-1">
                {weather.current.temp_c}°C
              </span>
            </p>
            <p className="text-lg">
              Weather :
              <span className="text-amber-300 ml-1">
                {weather.current.condition.text}
              </span>
            </p>
            <img
              src={weather.current.condition.icon}
              alt="Weather Icon"
              className="w-16 h-16  shadow"
            />
          </div>
        )
      )}
      {/* .forecastday */}
      {days == 0 ? null : (
        <div className="w-full max-w-full sm:max-w-4xl mt-4">
          <h2 className="text-2xl font-bold text-amber-300 mb-4">
            {console.log(days)}
            Upcoming Forecast
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {forecast.forecastday?.map((day, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col items-center text-center text-white"
              >
                <h3 className="text-xl font-bold text-amber-300 mb-2">
                  {day.date}
                </h3>
                <img
                  src={day.day.condition.icon}
                  alt="Weather Icon"
                  className="w-16 h-16 mb-2"
                />
                <p className="text-lg">{day.day.condition.text}</p>
                <p className="text-blue-300 text-lg font-semibold">
                  🌡️ Max: {day.day.maxtemp_c}°C
                </p>
                <p className="text-blue-300 text-lg font-semibold">
                  ❄️ Min: {day.day.mintemp_c}°C
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {history && (
        <div className="w-full max-w-full sm:max-w-4xl mt-4">
          <h2 className="text-2xl font-bold text-amber-300 mb-4">
            Historical Weather
          </h2>
          {history.map((day, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-xl font-bold">{day.date}</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white">
                    <th className="py-2">Hour</th>
                    <th className="py-2">Condition</th>
                    <th className="py-2">Temperature</th>
                    <th className="py-2">Feels Like</th>
                    <th className="py-2">Humidity</th>
                    <th className="py-2">Wind Speed</th>
                  </tr>
                </thead>
                <tbody>
                  {day.hour.map((hourData, hourIndex) => (
                    <tr key={hourIndex} className="border-b border-white">
                      <td className="py-2">
                        {new Date(hourData.time_epoch * 1000).getHours()}:00
                      </td>
                      <td className="py-2 flex items-center">
                        <img
                          src={hourData.condition.icon}
                          alt=""
                          className="w-8 h-8"
                        />
                        <span className="ml-2">{hourData.condition.text}</span>
                      </td>
                      <td className="py-2">{hourData.temp_c}°C</td>
                      <td className="py-2">{hourData.feelslike_c}°C</td>
                      <td className="py-2">{hourData.humidity}%</td>
                      <td className="py-2">{hourData.wind_kph} km/h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
