import React, { useState } from "react";
import FormularioLogin from "./FormularioLogin";
import FormularioRegistro from "./FormularioRegistro";

function PaginaAuth() {
  const [vista, setVista] = useState("login");

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Sistema de Usuarios</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setVista("login")}>Iniciar Sesión</button>
        <button onClick={() => setVista("registro")} style={{ marginLeft: "10px" }}>
          Registrarse
        </button>
      </div>

      {vista === "login" ? <FormularioLogin /> : <FormularioRegistro />}
    </div>
  );
}

export default PaginaAuth;
