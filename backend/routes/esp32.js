const express = require('express');
const Sensor = require('../models/Sensor');
const Lectura = require('../models/Lectura');
const Alerta = require('../models/Alerta');

const router = express.Router();

// ⚠️ IMPORTANTE: Esta ruta NO requiere autenticación para que el ESP32 pueda enviar datos
// Usa API_KEY para validar que la petición viene del ESP32

// Middleware simple de validación por API Key
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  const validApiKey = process.env.ESP32_API_KEY || 'ariete-esp32-2025'; // Cambia esto en producción
  
  if (apiKey === validApiKey) {
    next();
  } else {
    res.status(401).json({ 
      message: 'API Key inválida',
      error: 'Unauthorized' 
    });
  }
};

// Endpoint para que el ESP32 envíe múltiples lecturas
router.post('/lecturas', validateApiKey, async (req, res) => {
  try {
    const { lecturas } = req.body;
    
    if (!lecturas || !Array.isArray(lecturas)) {
      return res.status(400).json({ 
        message: 'Formato inválido. Se esperaba un array de lecturas',
        ejemplo: {
          lecturas: [
            { sensorId: '...', valor: 25.5 },
            { sensorId: '...', valor: 1.2 }
          ]
        }
      });
    }

    const resultados = [];
    
    for (const lectura of lecturas) {
      const { sensorId, valor, unidad, metadata } = lectura;
      
      // Verificar que el sensor existe
      const sensor = await Sensor.findById(sensorId);
      if (!sensor) {
        resultados.push({
          sensorId,
          error: 'Sensor no encontrado',
          status: 'failed'
        });
        continue;
      }

      // Crear nueva lectura
      const nuevaLectura = new Lectura({
        sensor: sensorId,
        valor,
        unidad: unidad || sensor.unidad,
        metadata: {
          ...metadata,
          fuente: 'ESP32'
        }
      });

      await nuevaLectura.save();

      // Actualizar última lectura del sensor
      sensor.ultimaLectura = {
        valor,
        timestamp: nuevaLectura.timestamp
      };
      await sensor.save();

      // Verificar si se debe generar una alerta
      await verificarAlertas(sensor, valor);

      resultados.push({
        sensorId,
        lecturaId: nuevaLectura._id,
        status: 'success'
      });
    }

    res.status(201).json({
      message: 'Lecturas procesadas',
      resultados,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error procesando lecturas del ESP32:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
});

// Endpoint simplificado para una sola lectura
router.post('/lectura', validateApiKey, async (req, res) => {
  try {
    const { sensorId, valor, unidad, metadata } = req.body;

    if (!sensorId || valor === undefined) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos: sensorId, valor'
      });
    }

    // Verificar que el sensor existe
    const sensor = await Sensor.findById(sensorId);
    if (!sensor) {
      return res.status(404).json({ message: 'Sensor no encontrado' });
    }

    // Crear nueva lectura
    const lectura = new Lectura({
      sensor: sensorId,
      valor,
      unidad: unidad || sensor.unidad,
      metadata: {
        ...metadata,
        fuente: 'ESP32'
      }
    });

    await lectura.save();

    // Actualizar última lectura del sensor
    sensor.ultimaLectura = {
      valor,
      timestamp: lectura.timestamp
    };
    await sensor.save();

    // Verificar alertas
    await verificarAlertas(sensor, valor);

    res.status(201).json({
      message: 'Lectura registrada exitosamente',
      lectura,
      sensor: {
        id: sensor._id,
        nombre: sensor.nombre,
        tipo: sensor.tipo
      }
    });

  } catch (error) {
    console.error('Error procesando lectura del ESP32:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
});

// Endpoint para obtener la lista de sensores (para configurar el ESP32)
router.get('/sensores', validateApiKey, async (req, res) => {
  try {
    const sensores = await Sensor.find({ estado: 'activo' })
      .select('_id nombre tipo unidad ubicacion configuracion ultimaLectura');
    
    res.json({
      sensores: sensores.map(s => ({
        id: s._id,
        nombre: s.nombre,
        tipo: s.tipo,
        unidad: s.unidad,
        ubicacion: s.ubicacion,
        ultimaLectura: s.ultimaLectura
      }))
    });
  } catch (error) {
    console.error('Error obteniendo sensores:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint de prueba/health check para ESP32
router.get('/ping', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'ESP32 API funcionando',
    timestamp: new Date(),
    server: 'Ariete Hidráulico v1.0'
  });
});

// Función auxiliar para verificar alertas
const verificarAlertas = async (sensor, valor) => {
  const { configuracion } = sensor;
  
  if (!configuracion) return;
  
  if (valor < configuracion.valorMinimo || valor > configuracion.valorMaximo) {
    const tipo = valor < configuracion.valorMinimo ? 'warning' : 'error';
    const prioridad = valor < configuracion.valorMinimo ? 'media' : 'alta';
    
    const alerta = new Alerta({
      tipo,
      titulo: `Valor fuera de rango - ${sensor.nombre}`,
      mensaje: `El valor ${valor} ${sensor.unidad} está fuera del rango normal (${configuracion.valorMinimo} - ${configuracion.valorMaximo})`,
      sensor: sensor._id,
      prioridad,
      datos: {
        valor,
        umbral: valor < configuracion.valorMinimo ? configuracion.valorMinimo : configuracion.valorMaximo,
        ubicacion: sensor.ubicacion,
        fuente: 'ESP32'
      }
    });

    await alerta.save();
  }
};

module.exports = router;


