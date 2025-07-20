import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('weather-theme-dark');
    return saved ? JSON.parse(saved) : true;
  });

  const [seasonalTheme, setSeasonalTheme] = useState('auto');
  const [weatherTheme, setWeatherTheme] = useState('auto');

  // Get current season
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  // Get weather-based theme
  const getWeatherTheme = (weatherCondition) => {
    const condition = weatherCondition?.toLowerCase() || '';
    
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    if (condition.includes('snow') || condition.includes('sleet')) return 'snowy';
    if (condition.includes('storm') || condition.includes('thunder')) return 'stormy';
    if (condition.includes('cloud') || condition.includes('overcast')) return 'cloudy';
    if (condition.includes('clear') || condition.includes('sunny')) return 'sunny';
    if (condition.includes('fog') || condition.includes('mist')) return 'foggy';
    
    return 'default';
  };

  // Theme configurations
  const themes = {
    light: {
      primary: 'from-blue-400 to-blue-600',
      secondary: 'from-purple-400 to-purple-600',
      background: 'from-blue-50 to-blue-100',
      card: 'bg-white/80',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      shadow: 'shadow-lg',
    },
    dark: {
      primary: 'from-blue-900 to-purple-900',
      secondary: 'from-indigo-900 to-purple-900',
      background: 'from-gray-900 to-black',
      card: 'bg-gray-800/80',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      shadow: 'shadow-2xl',
    },
    seasonal: {
      spring: {
        primary: 'from-green-400 to-pink-400',
        secondary: 'from-yellow-400 to-green-400',
        background: 'from-green-50 to-pink-50',
        card: 'bg-white/80',
        text: 'text-green-800',
        textSecondary: 'text-green-600',
        border: 'border-green-200',
        shadow: 'shadow-lg',
      },
      summer: {
        primary: 'from-yellow-400 to-orange-500',
        secondary: 'from-red-400 to-yellow-400',
        background: 'from-yellow-50 to-orange-50',
        card: 'bg-white/80',
        text: 'text-orange-800',
        textSecondary: 'text-orange-600',
        border: 'border-orange-200',
        shadow: 'shadow-lg',
      },
      autumn: {
        primary: 'from-orange-500 to-red-600',
        secondary: 'from-yellow-500 to-orange-500',
        background: 'from-orange-50 to-red-50',
        card: 'bg-white/80',
        text: 'text-red-800',
        textSecondary: 'text-red-600',
        border: 'border-red-200',
        shadow: 'shadow-lg',
      },
      winter: {
        primary: 'from-blue-400 to-indigo-600',
        secondary: 'from-cyan-400 to-blue-400',
        background: 'from-blue-50 to-cyan-50',
        card: 'bg-white/80',
        text: 'text-blue-800',
        textSecondary: 'text-blue-600',
        border: 'border-blue-200',
        shadow: 'shadow-lg',
      },
    },
    weather: {
      rainy: {
        primary: 'from-gray-600 to-blue-800',
        secondary: 'from-blue-600 to-gray-700',
        background: 'from-gray-100 to-blue-100',
        card: 'bg-white/90',
        text: 'text-gray-800',
        textSecondary: 'text-gray-600',
        border: 'border-blue-300',
        shadow: 'shadow-lg',
      },
      snowy: {
        primary: 'from-blue-300 to-cyan-500',
        secondary: 'from-cyan-400 to-blue-300',
        background: 'from-cyan-50 to-blue-50',
        card: 'bg-white/95',
        text: 'text-blue-800',
        textSecondary: 'text-blue-600',
        border: 'border-cyan-300',
        shadow: 'shadow-lg',
      },
      stormy: {
        primary: 'from-gray-800 to-purple-900',
        secondary: 'from-purple-800 to-gray-900',
        background: 'from-gray-200 to-purple-100',
        card: 'bg-white/80',
        text: 'text-gray-800',
        textSecondary: 'text-gray-600',
        border: 'border-purple-300',
        shadow: 'shadow-xl',
      },
      cloudy: {
        primary: 'from-gray-500 to-blue-600',
        secondary: 'from-blue-500 to-gray-600',
        background: 'from-gray-100 to-blue-50',
        card: 'bg-white/85',
        text: 'text-gray-700',
        textSecondary: 'text-gray-500',
        border: 'border-gray-300',
        shadow: 'shadow-lg',
      },
      sunny: {
        primary: 'from-yellow-400 to-orange-500',
        secondary: 'from-orange-400 to-yellow-500',
        background: 'from-yellow-50 to-orange-50',
        card: 'bg-white/90',
        text: 'text-orange-800',
        textSecondary: 'text-orange-600',
        border: 'border-orange-300',
        shadow: 'shadow-lg',
      },
      foggy: {
        primary: 'from-gray-400 to-gray-600',
        secondary: 'from-gray-500 to-gray-700',
        background: 'from-gray-100 to-gray-200',
        card: 'bg-white/70',
        text: 'text-gray-700',
        textSecondary: 'text-gray-500',
        border: 'border-gray-400',
        shadow: 'shadow-md',
      },
      default: {
        primary: 'from-blue-400 to-purple-600',
        secondary: 'from-purple-400 to-blue-600',
        background: 'from-blue-50 to-purple-50',
        card: 'bg-white/80',
        text: 'text-gray-800',
        textSecondary: 'text-gray-600',
        border: 'border-gray-200',
        shadow: 'shadow-lg',
      },
    },
  };

  // Get current theme based on settings
  const getCurrentTheme = (weatherCondition = null) => {
    let baseTheme = isDark ? themes.dark : themes.light;
    
    // Apply seasonal theme if auto
    if (seasonalTheme === 'auto') {
      const season = getCurrentSeason();
      baseTheme = { ...baseTheme, ...themes.seasonal[season] };
    } else if (seasonalTheme !== 'none') {
      baseTheme = { ...baseTheme, ...themes.seasonal[seasonalTheme] };
    }
    
    // Apply weather theme if auto
    if (weatherTheme === 'auto' && weatherCondition) {
      const weatherType = getWeatherTheme(weatherCondition);
      baseTheme = { ...baseTheme, ...themes.weather[weatherType] };
    } else if (weatherTheme !== 'none') {
      baseTheme = { ...baseTheme, ...themes.weather[weatherTheme] };
    }
    
    return baseTheme;
  };

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('weather-theme-dark', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const setSeasonalThemeMode = (theme) => setSeasonalTheme(theme);
  const setWeatherThemeMode = (theme) => setWeatherTheme(theme);

  const value = {
    isDark,
    seasonalTheme,
    weatherTheme,
    toggleTheme,
    setSeasonalThemeMode,
    setWeatherThemeMode,
    getCurrentTheme,
    getCurrentSeason,
    getWeatherTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 