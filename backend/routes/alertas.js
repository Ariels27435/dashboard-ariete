const express = require('express');
const Alerta = require('../models/Alerta');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// Obtener todas las alertas
router.get('/', async (req, res) => {
  try {
    const { estado, tipo, prioridad, limit = 50, offset = 0 } = req.query;
    
    const filtros = {};
    if (estado) filtros.estado = estado;
    if (tipo) filtros.tipo = tipo;
    if (prioridad) filtros.prioridad = prioridad;

    const alertas = await Alerta.find(filtros)
      .populate('sensor', 'nombre ubicacion')
      .populate('resueltaPor', 'nombre email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    res.json(alertas);
  } catch (error) {
    console.error('Error obteniendo alertas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener alerta por ID
router.get('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findById(req.params.id)
      .populate('sensor', 'nombre ubicacion')
      .populate('resueltaPor', 'nombre email');

    if (!alerta) {
      return res.status(404).json({ message: 'Alerta no encontrada' });
    }

    res.json(alerta);
  } catch (error) {
    console.error('Error obteniendo alerta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Marcar alerta como resuelta
router.patch('/:id/resolve', async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndUpdate(
      req.params.id,
      { 
        estado: 'resuelta',
        resueltaPor: req.usuario._id,
        resueltaEn: new Date()
      },
      { new: true }
    );

    if (!alerta) {
      return res.status(404).json({ message: 'Alerta no encontrada' });
    }

    res.json(alerta);
  } catch (error) {
    console.error('Error resolviendo alerta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear nueva alerta
router.post('/', async (req, res) => {
  try {
    const { tipo, titulo, mensaje, sensor, prioridad, datos } = req.body;

    const alerta = new Alerta({
      tipo,
      titulo,
      mensaje,
      sensor,
      prioridad: prioridad || 'media',
      datos
    });

    await alerta.save();
    await alerta.populate('sensor', 'nombre ubicacion');

    res.status(201).json(alerta);
  } catch (error) {
    console.error('Error creando alerta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
