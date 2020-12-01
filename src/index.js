import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <React.StrictMode>
    deal-management
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
