const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS SIMPLE - PERMITE TODO
app.use(cors({
  origin: true, // Permitir todos los orígenes
  credentials: true
}));

app.use(express.json());

// Datos en memoria (como antes)
let datosSensores = {
  humedad: { valor: 0, timestamp: new Date() },
  flujo: { valor: 0, timestamp: new Date() },
  nivel: { valor: 0, timestamp: new Date() }
};

// Rutas ESP32 (compatible con código original)
app.post('/api/humedad', (req, res) => {
  const { humedad, valor } = req.body;
  const valorHumedad = humedad !== undefined ? humedad : valor;
  datosSensores.humedad = { valor: valorHumedad, timestamp: new Date() };
  console.log(`🌫️ Humedad: ${valorHumedad}%`);
  res.json({ 
    message: 'Humedad recibida correctamente',
    valor: valorHumedad,
    unidad: '%'
  });
});

app.post('/api/flujo', (req, res) => {
  const { flujo, valor } = req.body;
  const valorFlujo = flujo !== undefined ? flujo : valor;
  datosSensores.flujo = { valor: valorFlujo, timestamp: new Date() };
  console.log(`💧 Flujo: ${valorFlujo} L/min`);
  res.json({ 
    message: 'Flujo recibido correctamente',
    valor: valorFlujo,
    unidad: 'L/min'
  });
});

app.post('/api/nivel', (req, res) => {
  const { nivel, valor } = req.body;
  const valorNivel = nivel !== undefined ? nivel : valor;
  datosSensores.nivel = { valor: valorNivel, timestamp: new Date() };
  console.log(`🛢️ Nivel: ${valorNivel}%`);
  res.json({ 
    message: 'Nivel recibido correctamente',
    valor: valorNivel,
    unidad: '%'
  });
});

// Ruta para obtener datos actuales
app.get('/api/estado', (req, res) => {
  res.json({
    humedad: datosSensores.humedad.valor,
    flujo: datosSensores.flujo.valor,
    nivel: datosSensores.nivel.valor,
    timestamp: new Date(),
    sensores: {
      humedad: { timestamp: datosSensores.humedad.timestamp },
      flujo: { timestamp: datosSensores.flujo.timestamp },
      nivel: { timestamp: datosSensores.nivel.timestamp }
    }
  });
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📊 Dashboard disponible en: http://localhost:${PORT}`);
  console.log(`✅ CORS configurado para permitir todos los orígenes`);
});


