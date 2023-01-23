// Description: This file is the entry point of the application

// Import React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import Components
import App from './App';
import reportWebVitals from './controllers/reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
