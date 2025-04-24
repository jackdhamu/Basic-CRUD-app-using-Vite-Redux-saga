// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated React 18 import
import './index.css'; // Import your CSS if you have any global styles.
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root for the React application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);