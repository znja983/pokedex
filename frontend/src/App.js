import React from 'react';
import UserList from './componente/ListaUsuarios';
import PaginaAuth from "./componente/PaginaAuth";
import './App.css';
function App() {
  return (
    <div>
      <PaginaAuth />
      <h1>React + MySQL Example</h1>
      <UserList />
    </div>
  );
}


export default App;
