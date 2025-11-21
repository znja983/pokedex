const express = require('express');
const router = express.Router();
const db = require('../config/database');
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({
        error: 'Error al obtener usuarios',
        details: err.message
      });
    }
    res.json(results);
  });
});

// login
router.post("/login", (req, res) => {
   console.log("Cuerpo de la solicitud:", req.body);
  const { email } = req.body;

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error en login:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = results[0];
    res.json({
      message: "✅ Login exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  });
});
// Crear usuario
router.post("/", (req, res) => {
  console.log("Cuerpo de la solicitud:", req.body);
 const { nombre, email, telefono } = req.body;
  const query = "INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)";
  db.query(query, [nombre, email, telefono], (err, result) => {
    if (err) {
      console.log("Error al crear usuario:", err);
      return res.status(500).json({ error: "Error al crear usuario" });
    }
    res.json({ message: "✅ Usuario creado correctamente", id: result.insertId });
  });
});

// Actualizar usuario
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  const query = "UPDATE usuarios SET nombre=?, email=?, telefono=? WHERE id=?";
  db.query(query, [nombre, email, telefono, id], (err) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }
    res.json({ message: " Usuario actualizado correctamente" });
  });
});

// Eliminar usuario
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM usuarios WHERE id=?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
    res.json({ message: " Usuario eliminado correctamente" });
  });
});

module.exports = router;
