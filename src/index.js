// index.js is the entry point for your React app.
// Its only job is to render your main App component into the root div in public/index.html.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main App component

// Render the App component into the root div
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// That's all you need in index.js! All your UI and logic should be in App.js and other components.
