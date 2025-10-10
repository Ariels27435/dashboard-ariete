const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['error', 'warning', 'info'],
    required: true
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  mensaje: {
    type: String,
    required: true,
    trim: true
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: false
  },
  prioridad: {
    type: String,
    enum: ['alta', 'media', 'baja'],
    default: 'media'
  },
  estado: {
    type: String,
    enum: ['activa', 'resuelta', 'cerrada'],
    default: 'activa'
  },
  datos: {
    valor: Number,
    umbral: Number,
    ubicacion: String
  },
  resueltaPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  resueltaEn: Date,
  notificaciones: [{
    tipo: {
      type: String,
      enum: ['email', 'sms', 'push']
    },
    enviada: { type: Boolean, default: false },
    enviadaEn: Date,
    error: String
  }]
}, {
  timestamps: true
});

// Índices para optimizar consultas
alertaSchema.index({ estado: 1 });
alertaSchema.index({ tipo: 1 });
alertaSchema.index({ prioridad: 1 });
alertaSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Alerta', alertaSchema);
