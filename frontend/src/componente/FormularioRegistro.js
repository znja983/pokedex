import React, { useState } from "react";
import axios from "axios";

function FormularioRegistro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarRegistro = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/register", {
        nombre,
        email,
        telefono,
        contrasena,
      });

      setMensaje("Usuario registrado correctamente");
    } catch (err) {
      setMensaje("Error al registrar usuario");
    }
  };

  return (
    <form onSubmit={enviarRegistro} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />

      <button type="submit">Registrar</button>

      <p>{mensaje}</p>
    </form>
  );
}

export default FormularioRegistro;
