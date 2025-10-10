const express = require('express');
const Lectura = require('../models/Lectura');
const Sensor = require('../models/Sensor');
const Alerta = require('../models/Alerta');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// Obtener datos del dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const sensores = await Sensor.find({ estado: 'activo' });
    const alertasActivas = await Alerta.countDocuments({ estado: 'activa' });
    const alertasHoy = await Alerta.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    // Obtener últimas lecturas de cada sensor
    const lecturasRecientes = await Promise.all(
      sensores.map(async (sensor) => {
        const ultimaLectura = await Lectura.findOne({ sensor: sensor._id })
          .sort({ timestamp: -1 });
        return {
          sensor: sensor.nombre,
          tipo: sensor.tipo,
          valor: ultimaLectura?.valor || 0,
          unidad: sensor.unidad,
          timestamp: ultimaLectura?.timestamp || null
        };
      })
    );

    res.json({
      sensores: lecturasRecientes,
      alertas: {
        activas: alertasActivas,
        hoy: alertasHoy
      },
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error obteniendo datos del dashboard:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener datos de sensores para reportes
router.get('/sensores', async (req, res) => {
  try {
    const { desde, hasta, tipo, sensorId } = req.query;
    
    const filtros = {};
    if (desde || hasta) {
      filtros.timestamp = {};
      if (desde) filtros.timestamp.$gte = new Date(desde);
      if (hasta) filtros.timestamp.$lte = new Date(hasta);
    }
    if (sensorId) filtros.sensor = sensorId;

    const lecturas = await Lectura.find(filtros)
      .populate('sensor', 'nombre tipo ubicacion')
      .sort({ timestamp: -1 })
      .limit(1000);

    // Agrupar por tipo de sensor si se especifica
    if (tipo) {
      const sensoresDelTipo = await Sensor.find({ tipo });
      const sensorIds = sensoresDelTipo.map(s => s._id);
      const lecturasFiltradas = lecturas.filter(l => sensorIds.includes(l.sensor._id));
      return res.json(lecturasFiltradas);
    }

    res.json(lecturas);
  } catch (error) {
    console.error('Error obteniendo datos de sensores:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener reporte de consumo
router.get('/consumo', async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    
    const filtros = { sensor: { $in: await Sensor.find({ tipo: 'caudal' }).distinct('_id') } };
    if (desde || hasta) {
      filtros.timestamp = {};
      if (desde) filtros.timestamp.$gte = new Date(desde);
      if (hasta) filtros.timestamp.$lte = new Date(hasta);
    }

    const lecturas = await Lectura.find(filtros)
      .populate('sensor', 'nombre ubicacion')
      .sort({ timestamp: 1 });

    // Calcular consumo total
    const consumoTotal = lecturas.reduce((total, lectura) => total + lectura.valor, 0);
    
    // Agrupar por hora para gráfica
    const consumoPorHora = lecturas.reduce((acc, lectura) => {
      const hora = new Date(lectura.timestamp).getHours();
      if (!acc[hora]) acc[hora] = 0;
      acc[hora] += lectura.valor;
      return acc;
    }, {});

    res.json({
      consumoTotal,
      consumoPorHora,
      lecturas: lecturas.slice(-24) // Últimas 24 lecturas
    });
  } catch (error) {
    console.error('Error obteniendo reporte de consumo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Exportar reporte
router.get('/export/:tipo', async (req, res) => {
  try {
    const { tipo } = req.params;
    const { desde, hasta } = req.query;

    // Aquí se implementaría la lógica de exportación
    // Por ahora devolvemos un mensaje
    res.json({ 
      message: `Exportación de ${tipo} no implementada aún`,
      desde,
      hasta
    });
  } catch (error) {
    console.error('Error exportando reporte:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
