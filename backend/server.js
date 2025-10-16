const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Sensor = require('./models/Sensor');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS para producción
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origen (como aplicaciones móviles o Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',')
      : ['http://localhost:5173', 'http://localhost:5177', 'http://localhost:3000'];
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ariete_db');
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.log('💡 Asegúrate de que MongoDB esté ejecutándose');
    process.exit(1);
  }
};

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sensores', require('./routes/sensores'));
app.use('/api/alertas', require('./routes/alertas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/reportes', require('./routes/reportes'));
app.use('/api/configuracion', require('./routes/configuracion'));

// Ruta especial para ESP32 (sin autenticación JWT, usa API Key)
app.use('/api/esp32', require('./routes/esp32'));

// Rutas compatibles con código ESP32 original (sin autenticación para compatibilidad)
app.use('/api', require('./routes/ariete-directo'));

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta para obtener estado actual de los sensores del ariete (compatible con dashboard)
app.get('/api/estado', async (req, res) => {
  try {
    // Buscar los sensores del ariete por nombre
    const sensorHumedad = await Sensor.findOne({ nombre: 'Sensor Humedad Ariete' });
    const sensorFlujo = await Sensor.findOne({ nombre: 'Sensor Flujo Ariete' });
    const sensorNivel = await Sensor.findOne({ nombre: 'Sensor Nivel Ariete' });

    res.json({
      humedad: sensorHumedad?.ultimaLectura?.valor || 0,
      flujo: sensorFlujo?.ultimaLectura?.valor || 0,
      nivel: sensorNivel?.ultimaLectura?.valor || 0,
      timestamp: new Date(),
      sensores: {
        humedad: { timestamp: sensorHumedad?.ultimaLectura?.timestamp || null },
        flujo: { timestamp: sensorFlujo?.ultimaLectura?.timestamp || null },
        nivel: { timestamp: sensorNivel?.ultimaLectura?.timestamp || null }
      }
    });
  } catch (error) {
    console.error('Error obteniendo estado:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      humedad: 0,
      flujo: 0,
      nivel: 0,
      timestamp: new Date()
    });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Dashboard disponible en: http://localhost:${PORT}`);
});

