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


router.get('/redir/:id', (req, res) => {
    const id = req.params.id;
    const frontendBase = process.env.FRONTEND_URL || 'http://localhost:3000';
    // redirige con 302 por defecto
    return res.redirect(`${frontendBase}/usuarios/${encodeURIComponent(id)}`);
});


router.get('/:id', (req, res) => {
   const id = req.params.id;
   const query = 'SELECT * FROM usuarios WHERE id = ? LIMIT 1';

   db.query(query, [id], (err, results) => {
       if (err) {
           console.error('Error al obtener usuario:', err);
           return res.status(500).json({
               error: 'Error al obtener usuario',
               details: err.message
           });
       }
       if (!results || results.length === 0) {
           return res.status(404).json({ error: 'Usuario no encontrado' });
       }
       res.json(results[0]);
   });
}); 


router.post('/', (req, res) => {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Faltan campos: nombre y email son requeridos' });
    }
    const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
    db.query(query, [nombre, email], (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            return res.status(500).json({ error: 'Error al crear usuario', details: err.message });
        }
        // devolver el usuario creado (puedes hacer otra consulta si necesitas todos los campos)
        res.status(201).json({ id: result.insertId, nombre, email });
    });
});


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    if (!nombre && !email) {
        return res.status(400).json({ error: 'Al menos un campo para actualizar (nombre o email)' });
    }
    const fields = [];
    const values = [];
    if (nombre) { fields.push('nombre = ?'); values.push(nombre); }
    if (email) { fields.push('email = ?'); values.push(email); }
    values.push(id);
    const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`;
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ error: 'Error al actualizar usuario', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado' });
    });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar usuario', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    });
});

module.exports = router;