// ...existing code...
import React from 'react';
import './style.css';
import ListaUsuarios from './componente/ListaUsuarios';

function App() {
  return (
    <div>
      {/* contenedor donde main.js inserta el menú */}
      <div id="menu"></div> 

      {/* contenedor principal donde mostrarás las vistas */}
      <main id="app"></main>
    </div>
  );
}

export default App;
// ...existing code...