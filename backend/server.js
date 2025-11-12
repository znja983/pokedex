// ...existing code...
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const db = require('./config/database'); // prueba de conexión abajo

const app = express();
const PORT = process.env.PORT || 5001;

// permite solo el frontend durante desarrollo (o ajusta a tu dominio)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Usuarios funcionando correctamente' });
});

// prueba rápida de conexión a la BD al arrancar para detectar errores temprano
db.query('SELECT 1', (err) => {
  if (err) {
    console.error('Error conectando a la BD al iniciar:', err.message || err);
  } else {
    console.log('Conexión a la BD OK');
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
// ...existing code...