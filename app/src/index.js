import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WidgetMeteo from './components/WidgetMeteo/WidgetMeteo';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <WidgetMeteo zipCode={45590} city="Saint-Cyr en val" />
  </React.StrictMode>,
  document.getElementById('widget')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
