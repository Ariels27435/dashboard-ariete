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

// Rutas ESP32 (compatible con formato del ESP32)
app.post('/api/humedad', (req, res) => {
  const { humedad, valor } = req.body;
  const valorHumedad = humedad !== undefined ? humedad : valor;
  datos.humedad = valorHumedad || 0;
  console.log(`🌫️ Humedad: ${datos.humedad}%`);
  res.json({ 
    message: 'Humedad recibida correctamente',
    valor: datos.humedad,
    unidad: '%'
  });
});

app.post('/api/flujo', (req, res) => {
  const { flujo, valor } = req.body;
  const valorFlujo = flujo !== undefined ? flujo : valor;
  datos.flujo = valorFlujo || 0;
  console.log(`💧 Flujo: ${datos.flujo} L/min`);
  res.json({ 
    message: 'Flujo recibido correctamente',
    valor: datos.flujo,
    unidad: 'L/min'
  });
});

app.post('/api/nivel', (req, res) => {
  const { nivel, valor } = req.body;
  const valorNivel = nivel !== undefined ? nivel : valor;
  datos.nivel = valorNivel || 0;
  console.log(`🛢️ Nivel: ${datos.nivel}%`);
  res.json({ 
    message: 'Nivel recibido correctamente',
    valor: datos.nivel,
    unidad: '%'
  });
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
  console.log(`🚀 Servidor ULTRA-SIMPLE ejecutándose en puerto ${PORT}`);
  console.log(`🔥 Sistema ULTRA-SIMPLE activo - Sin MongoDB, datos en memoria`);
  console.log(`📊 Dashboard disponible en: http://localhost:${PORT}`);
  console.log(`✅ CORS configurado para permitir todos los orígenes`);
});


