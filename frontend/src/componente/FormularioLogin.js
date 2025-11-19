import React, { useState } from "react";
import axios from "axios";

function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/login", {
        email,
        contrasena,
      });

      setMensaje("Bienvenido " + res.data.usuario);
      window.location.href = "/usuarios";
    } catch (err) {
      setMensaje("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={enviarLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />

      <button type="submit">Entrar</button>

      <p>{mensaje}</p>
    </form>
  );
}

export default FormularioLogin;