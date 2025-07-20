import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Current from './pages/Current';

export default function App() {
  return (
    <ThemeProvider>
      <Current />
    </ThemeProvider>
  );
}
