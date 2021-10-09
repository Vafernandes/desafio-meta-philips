import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css'

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

