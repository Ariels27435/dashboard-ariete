const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    enum: ['temperatura', 'presion', 'caudal', 'nivel', 'humedad'],
    required: true
  },
  ubicacion: {
    type: String,
    required: true,
    trim: true
  },
  unidad: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'mantenimiento'],
    default: 'activo'
  },
  configuracion: {
    valorMinimo: { type: Number, required: true },
    valorMaximo: { type: Number, required: true },
    umbralAlerta: { type: Number, required: true },
    intervaloLectura: { type: Number, default: 60 }, // en segundos
    habilitado: { type: Boolean, default: true }
  },
  ultimaLectura: {
    valor: Number,
    timestamp: Date
  },
  metadata: {
    fabricante: String,
    modelo: String,
    serie: String,
    instalacion: Date
  }
}, {
  timestamps: true
});

// Índices para optimizar consultas
sensorSchema.index({ tipo: 1 });
sensorSchema.index({ estado: 1 });
sensorSchema.index({ ubicacion: 1 });

module.exports = mongoose.model('Sensor', sensorSchema);
