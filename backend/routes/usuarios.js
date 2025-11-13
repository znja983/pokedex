const express = require('express');
const router = express.Router();
const db = require('../config/database'); // pool.promise()

// GET /api/usuarios  -> lista todos
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM usuarios ORDER BY id DESC';
    const [rows] = await db.query(query);
    return res.json(rows);
  } catch (err) {
    console.error('GET /api/usuarios error:', err);
    return res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Redirección hacia frontend (opcional)
router.get('/redir/:id', (req, res) => {
  const id = req.params.id;
  const frontendBase = process.env.FRONTEND_URL || 'http://localhost:3000';
  return res.redirect(`${frontendBase}/usuarios/${encodeURIComponent(id)}`);
});

// GET /api/usuarios/:id  -> obtener uno
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const query = 'SELECT * FROM usuarios WHERE id = ? LIMIT 1';
    const [rows] = await db.query(query, [id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error(`GET /api/usuarios/${id} error:`, err);
    return res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// POST /api/usuarios  -> crear
router.post('/', async (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  try {
    const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
    const [result] = await db.query(query, [nombre, email]);
    return res.status(201).json({ id: result.insertId, nombre, email });
  } catch (err) {
    console.error('POST /api/usuarios error:', err);
    return res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// PUT /api/usuarios/:id  -> actualizar parcialmente
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, email } = req.body;

  const fields = [];
  const values = [];

  if (nombre) {
    fields.push('nombre = ?');
    values.push(nombre);
  }
  if (email) {
    fields.push('email = ?');
    values.push(email);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'Nada que actualizar' });
  }

  values.push(id); // para WHERE

  try {
    const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await db.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    console.error(`PUT /api/usuarios/${id} error:`, err);
    return res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// DELETE /api/usuarios/:id  -> borrar
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error(`DELETE /api/usuarios/${id} error:`, err);
    return res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;