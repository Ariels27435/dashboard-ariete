const Sensor = require('../models/Sensor');
const Lectura = require('../models/Lectura');
const Alerta = require('../models/Alerta');

const getAllSensores = async (req, res) => {
  try {
    const sensores = await Sensor.find().sort({ nombre: 1 });
    res.json(sensores);
  } catch (error) {
    console.error('Error obteniendo sensores:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: 'Sensor no encontrado' });
    }
    res.json(sensor);
  } catch (error) {
    console.error('Error obteniendo sensor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getLecturas = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { limit = 100, offset = 0, desde, hasta } = req.query;

    // Construir filtros de fecha
    const filtros = { sensor: sensorId };
    if (desde || hasta) {
      filtros.timestamp = {};
      if (desde) filtros.timestamp.$gte = new Date(desde);
      if (hasta) filtros.timestamp.$lte = new Date(hasta);
    }

    const lecturas = await Lectura.find(filtros)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .populate('sensor', 'nombre tipo ubicacion');

    res.json(lecturas);
  } catch (error) {
    console.error('Error obteniendo lecturas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const createLectura = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { valor, unidad, metadata } = req.body;

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
      metadata
    });

    await lectura.save();

    // Actualizar última lectura del sensor
    sensor.ultimaLectura = {
      valor,
      timestamp: lectura.timestamp
    };
    await sensor.save();

    // Verificar si se debe generar una alerta
    await verificarAlertas(sensor, valor);

    res.status(201).json(lectura);
  } catch (error) {
    console.error('Error creando lectura:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateSensorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const sensor = await Sensor.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!sensor) {
      return res.status(404).json({ message: 'Sensor no encontrado' });
    }

    res.json(sensor);
  } catch (error) {
    console.error('Error actualizando estado del sensor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función auxiliar para verificar alertas
const verificarAlertas = async (sensor, valor) => {
  const { configuracion } = sensor;
  
  if (valor < configuracion.valorMinimo || valor > configuracion.valorMaximo) {
    const tipo = valor < configuracion.valorMinimo ? 'warning' : 'error';
    const prioridad = valor < configuracion.valorMinimo ? 'media' : 'alta';
    
    const alerta = new Alerta({
      tipo,
      titulo: `Valor fuera de rango - ${sensor.nombre}`,
      mensaje: `El valor ${valor} está fuera del rango normal (${configuracion.valorMinimo} - ${configuracion.valorMaximo})`,
      sensor: sensor._id,
      prioridad,
      datos: {
        valor,
        umbral: valor < configuracion.valorMinimo ? configuracion.valorMinimo : configuracion.valorMaximo,
        ubicacion: sensor.ubicacion
      }
    });

    await alerta.save();
  }
};

module.exports = {
  getAllSensores,
  getSensorById,
  getLecturas,
  createLectura,
  updateSensorStatus
};
