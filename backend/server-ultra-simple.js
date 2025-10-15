const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS ULTRA SIMPLE - PERMITE TODO
app.use(cors());
app.use(express.json());

// Datos en memoria
let datos = {
  humedad: 0,
  flujo: 0,
  nivel: 0
};

// Rutas ESP32
app.post('/api/humedad', (req, res) => {
  datos.humedad = req.body.valor || 0;
  console.log(`Humedad: ${datos.humedad}%`);
  res.json({ success: true });
});

app.post('/api/flujo', (req, res) => {
  datos.flujo = req.body.valor || 0;
  console.log(`Flujo: ${datos.flujo} L/min`);
  res.json({ success: true });
});

app.post('/api/nivel', (req, res) => {
  datos.nivel = req.body.valor || 0;
  console.log(`Nivel: ${datos.nivel}%`);
  res.json({ success: true });
});

// Ruta para obtener datos
app.get('/api/estado', (req, res) => {
  res.json({
    humedad: datos.humedad,
    flujo: datos.flujo,
    nivel: datos.nivel,
    timestamp: new Date()
  });
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Funcionando' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor en puerto ${PORT}`);
});

