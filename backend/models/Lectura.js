const mongoose = require('mongoose');

const lecturaSchema = new mongoose.Schema({
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  unidad: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  calidad: {
    type: String,
    enum: ['excelente', 'buena', 'regular', 'mala'],
    default: 'buena'
  },
  metadata: {
    temperaturaAmbiente: Number,
    humedad: Number,
    presionAtmosferica: Number
  }
}, {
  timestamps: true
});

// Índices para optimizar consultas
lecturaSchema.index({ sensor: 1, timestamp: -1 });
lecturaSchema.index({ timestamp: -1 });
lecturaSchema.index({ calidad: 1 });

// TTL para eliminar lecturas antiguas (opcional)
// lecturaSchema.index({ timestamp: 1 }, { expireAfterSeconds: 31536000 }); // 1 año

module.exports = mongoose.model('Lectura', lecturaSchema);
