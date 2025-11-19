import React from 'react';
import UserList from './components/UserList';
import PaginaAuth from "./componentes/PaginaAuth";

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
