import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2e7d32' },
    success: { main: '#2e7d32' },
    background: { default: '#f6fff6' },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minHeight: 48, fontSize: '1rem', fontWeight: 700 },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
