import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
 // Import your Redux store
import App from './App.jsx';
import './index.css';
import store from './slices/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
