# 🌤️ Weather App

A beautiful, responsive weather application built with React, Vite, and Tailwind CSS. Get real-time weather information, forecasts, and historical data for any location around the world.

## ✨ Features

- **Current Weather**: Real-time temperature, humidity, wind speed, and more
- **Weather Forecast**: Up to 7-day weather predictions with detailed information
- **Historical Data**: View past weather conditions with hourly breakdowns
- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Beautiful UI**: Modern design with glass morphism effects and animations
- **Search Functionality**: Search for any city or location worldwide
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Smooth loading animations and transitions

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API requests
- **React Icons** - Beautiful icon library
- **WeatherAPI.com** - Weather data provider

## 📱 Responsive Design

The app is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Design Features

- **Glass Morphism**: Modern glass-like effects with backdrop blur
- **Gradient Backgrounds**: Beautiful color gradients throughout the app
- **Animated Elements**: Smooth animations using Framer Motion
- **Interactive Cards**: Hover effects and micro-interactions
- **Custom Scrollbar**: Styled scrollbar for better UX
- **Loading Animations**: Engaging loading states

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchForm.jsx   # Search form with validation
│   ├── CurrentWeather.jsx # Current weather display
│   ├── ForecastCard.jsx # Weather forecast cards
│   ├── HistoryTable.jsx # Historical weather data
│   ├── LoadingSpinner.jsx # Loading animation
│   └── ErrorMessage.jsx # Error display component
├── hooks/              # Custom React hooks
│   └── useWeather.js   # Weather data management
├── services/           # API services
│   └── weatherApi.js   # Weather API integration
├── pages/              # Page components
│   └── Current.jsx     # Main weather page
└── assets/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
Create a `.env` file in the root directory and add your WeatherAPI key:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🔧 Configuration

### Environment Variables

- `VITE_WEATHER_API_KEY` - Your WeatherAPI.com API key

### API Configuration

The app uses WeatherAPI.com for weather data. You can get a free API key by signing up at [WeatherAPI.com](https://www.weatherapi.com/).

## 🎯 Key Features Explained

### 1. Responsive Grid System
- Uses CSS Grid and Flexbox for responsive layouts
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile-first approach with progressive enhancement

### 2. Component Architecture
- Modular component structure for maintainability
- Custom hooks for state management
- Service layer for API calls
- Separation of concerns

### 3. Performance Optimizations
- Lazy loading of components
- Optimized re-renders with React.memo
- Efficient API calls with Promise.all
- Image optimization

### 4. User Experience
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation and interactions
- Accessibility considerations

## 🌟 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Weather alerts and notifications
- [ ] Favorite locations
- [ ] Weather maps integration
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Weather widgets
- [ ] Social sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for providing weather data
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

Made with ❤️ by [Your Name]
