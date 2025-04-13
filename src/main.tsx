
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react'; // Add this import

// Wrap the App component with React.StrictMode
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
