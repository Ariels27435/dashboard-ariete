const express = require('express');
const Sensor = require('../models/Sensor');
const Lectura = require('../models/Lectura');
const Alerta = require('../models/Alerta');

const router = express.Router();

// ⚠️ RUTAS COMPATIBLES CON EL CÓDIGO ORIGINAL DEL ESP32
// No requieren autenticación para facilitar la integración

// Variables globales para almacenar los IDs de los sensores
let sensorHumedadId = null;
let sensorFlujoId = null;
let sensorNivelId = null;

// Inicializar IDs de sensores
const inicializarSensores = async () => {
  try {
    // Buscar o crear sensor de humedad
    let sensorHumedad = await Sensor.findOne({ nombre: 'Sensor Humedad Ariete' });
    if (!sensorHumedad) {
      sensorHumedad = new Sensor({
        nombre: 'Sensor Humedad Ariete',
        tipo: 'humedad', // Ahora 'humedad' es un tipo válido
        ubicacion: 'Sistema Ariete Hidráulico',
        unidad: '%',
        estado: 'activo',
        configuracion: {
          valorMinimo: 0,
          valorMaximo: 100,
          umbralAlerta: 80,
          intervaloLectura: 5
        }
      });
      await sensorHumedad.save();
      console.log('✅ Sensor Humedad creado automáticamente');
    }
    sensorHumedadId = sensorHumedad._id;

    // Buscar o crear sensor de flujo
    let sensorFlujo = await Sensor.findOne({ nombre: 'Sensor Flujo Ariete' });
    if (!sensorFlujo) {
      sensorFlujo = new Sensor({
        nombre: 'Sensor Flujo Ariete',
        tipo: 'caudal',
        ubicacion: 'Sistema Ariete Hidráulico',
        unidad: 'L/min',
        estado: 'activo',
        configuracion: {
          valorMinimo: 0,
          valorMaximo: 100,
          umbralAlerta: 90,
          intervaloLectura: 5
        }
      });
      await sensorFlujo.save();
      console.log('✅ Sensor Flujo creado automáticamente');
    }
    sensorFlujoId = sensorFlujo._id;

    // Buscar o crear sensor de nivel
    let sensorNivel = await Sensor.findOne({ nombre: 'Sensor Nivel Ariete' });
    if (!sensorNivel) {
      sensorNivel = new Sensor({
        nombre: 'Sensor Nivel Ariete',
        tipo: 'nivel',
        ubicacion: 'Sistema Ariete Hidráulico',
        unidad: '%',
        estado: 'activo',
        configuracion: {
          valorMinimo: 0,
          valorMaximo: 100,
          umbralAlerta: 90,
          intervaloLectura: 5
        }
      });
      await sensorNivel.save();
      console.log('✅ Sensor Nivel creado automáticamente');
    }
    sensorNivelId = sensorNivel._id;

    console.log('📋 Sensores Ariete inicializados correctamente');
  } catch (error) {
    console.error('❌ Error inicializando sensores:', error);
  }
};

// Función auxiliar para guardar lectura
const guardarLectura = async (sensorId, valor, unidad) => {
  try {
    const sensor = await Sensor.findById(sensorId);
    if (!sensor) {
      console.error('Sensor no encontrado:', sensorId);
      return false;
    }

    // Crear lectura
    const lectura = new Lectura({
      sensor: sensorId,
      valor,
      unidad,
      metadata: {
        fuente: 'ESP32-Ariete',
        sistemaLegacy: true
      }
    });
    await lectura.save();

    // Actualizar sensor
    sensor.ultimaLectura = {
      valor,
      timestamp: new Date()
    };
    await sensor.save();

    // Verificar alertas
    await verificarAlertas(sensor, valor);

    return true;
  } catch (error) {
    console.error('Error guardando lectura:', error);
    return false;
  }
};

// Verificar alertas
const verificarAlertas = async (sensor, valor) => {
  try {
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
          fuente: 'ESP32-Ariete'
        }
      });

      await alerta.save();
    }
  } catch (error) {
    console.error('Error verificando alertas:', error);
  }
};

// ============ RUTAS COMPATIBLES CON CÓDIGO ORIGINAL ============

// POST /api/humedad
router.post('/humedad', async (req, res) => {
  try {
    const { humedad } = req.body;

    if (humedad === undefined) {
      return res.status(400).json({ message: 'Falta el campo humedad' });
    }

    // Inicializar sensores si no están listos
    if (!sensorHumedadId) {
      await inicializarSensores();
    }

    // Guardar lectura
    const guardado = await guardarLectura(sensorHumedadId, humedad, '%');

    if (guardado) {
      console.log(`🌫️  Humedad recibida: ${humedad}%`);
      res.status(200).json({ 
        message: 'Humedad recibida correctamente',
        valor: humedad,
        unidad: '%'
      });
    } else {
      res.status(500).json({ message: 'Error guardando lectura' });
    }
  } catch (error) {
    console.error('Error en /api/humedad:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /api/flujo
router.post('/flujo', async (req, res) => {
  try {
    const { flujo } = req.body;

    if (flujo === undefined) {
      return res.status(400).json({ message: 'Falta el campo flujo' });
    }

    // Inicializar sensores si no están listos
    if (!sensorFlujoId) {
      await inicializarSensores();
    }

    // Guardar lectura
    const guardado = await guardarLectura(sensorFlujoId, flujo, 'L/min');

    if (guardado) {
      console.log(`💧 Flujo recibido: ${flujo} L/min`);
      res.status(200).json({ 
        message: 'Flujo recibido correctamente',
        valor: flujo,
        unidad: 'L/min'
      });
    } else {
      res.status(500).json({ message: 'Error guardando lectura' });
    }
  } catch (error) {
    console.error('Error en /api/flujo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /api/nivel
router.post('/nivel', async (req, res) => {
  try {
    const { nivel } = req.body;

    if (nivel === undefined) {
      return res.status(400).json({ message: 'Falta el campo nivel' });
    }

    // Inicializar sensores si no están listos
    if (!sensorNivelId) {
      await inicializarSensores();
    }

    // Guardar lectura
    const guardado = await guardarLectura(sensorNivelId, nivel, '%');

    if (guardado) {
      console.log(`🛢️  Nivel recibido: ${nivel}%`);
      res.status(200).json({ 
        message: 'Nivel recibido correctamente',
        valor: nivel,
        unidad: '%'
      });
    } else {
      res.status(500).json({ message: 'Error guardando lectura' });
    }
  } catch (error) {
    console.error('Error en /api/nivel:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Inicializar sensores al cargar el módulo
inicializarSensores();

module.exports = router;

