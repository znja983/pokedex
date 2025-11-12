// ...existing code...
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// importa y llama al cargador del menú
import { cargarMenu } from './main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// asegurar que el menú se inicialice después del render
cargarMenu();

reportWebVitals();
// ...existing code...