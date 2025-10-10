const express = require('express');
const { 
  getAllSensores, 
  getSensorById, 
  getLecturas, 
  createLectura, 
  updateSensorStatus 
} = require('../controllers/sensorController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas de sensores
router.get('/', getAllSensores);
router.get('/:id', getSensorById);
router.patch('/:id/status', updateSensorStatus);

// Rutas de lecturas
router.get('/:sensorId/lecturas', getLecturas);
router.post('/:sensorId/lecturas', createLectura);

module.exports = router;
