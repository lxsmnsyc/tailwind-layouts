import React from 'react';
import ReactDOM from 'react-dom';
import { setup } from 'twind';

import App from './App';

import 'twind/shim';
import 'tailwindcss/tailwind.css';

setup({
  darkMode: 'class',
});

window.React = React;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
