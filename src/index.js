import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App';
import './App.css'; // Ensure this matches your CSS filename

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);