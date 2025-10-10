const express = require('express');
const Configuracion = require('../models/Configuracion');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// Obtener configuración
router.get('/', async (req, res) => {
  try {
    let configuracion = await Configuracion.findOne();
    
    // Si no existe configuración, crear una por defecto
    if (!configuracion) {
      configuracion = new Configuracion();
      await configuracion.save();
    }

    res.json(configuracion);
  } catch (error) {
    console.error('Error obteniendo configuración:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar configuración (solo admin)
router.put('/', adminOnly, async (req, res) => {
  try {
    const { nombreSistema, limites, alertas, sistema, mantenimiento } = req.body;
    
    let configuracion = await Configuracion.findOne();
    
    if (!configuracion) {
      configuracion = new Configuracion();
    }

    // Actualizar campos
    if (nombreSistema) configuracion.nombreSistema = nombreSistema;
    if (limites) configuracion.limites = { ...configuracion.limites, ...limites };
    if (alertas) configuracion.alertas = { ...configuracion.alertas, ...alertas };
    if (sistema) configuracion.sistema = { ...configuracion.sistema, ...sistema };
    if (mantenimiento) configuracion.mantenimiento = { ...configuracion.mantenimiento, ...mantenimiento };

    await configuracion.save();
    res.json(configuracion);
  } catch (error) {
    console.error('Error actualizando configuración:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Restaurar configuración por defecto (solo admin)
router.post('/reset', adminOnly, async (req, res) => {
  try {
    await Configuracion.deleteMany();
    const configuracion = new Configuracion();
    await configuracion.save();
    
    res.json({ 
      message: 'Configuración restaurada a valores por defecto',
      configuracion 
    });
  } catch (error) {
    console.error('Error restaurando configuración:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
