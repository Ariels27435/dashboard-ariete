const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  nombreSistema: {
    type: String,
    default: 'Ariete Hidráulico'
  },
  limites: {
    temperatura: {
      minima: { type: Number, default: 15 },
      maxima: { type: Number, default: 30 }
    },
    presion: {
      minima: { type: Number, default: 1.5 },
      maxima: { type: Number, default: 3.0 }
    },
    caudal: {
      minimo: { type: Number, default: 5 },
      maximo: { type: Number, default: 20 }
    },
    nivel: {
      minimo: { type: Number, default: 20 },
      maximo: { type: Number, default: 95 }
    }
  },
  alertas: {
    email: {
      type: String,
      default: 'admin@ariete.com'
    },
    habilitadas: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    }
  },
  sistema: {
    retencionDatos: { type: Number, default: 30 }, // días
    respaldoAutomatico: { type: Boolean, default: true },
    intervaloLectura: { type: Number, default: 60 }, // segundos
    version: { type: String, default: '1.0.0' }
  },
  mantenimiento: {
    proximo: Date,
    frecuencia: { type: Number, default: 30 }, // días
    responsable: String,
    notas: String
  }
}, {
  timestamps: true
});

// Solo debe haber una configuración en el sistema
configuracionSchema.index({}, { unique: true });

module.exports = mongoose.model('Configuracion', configuracionSchema);
