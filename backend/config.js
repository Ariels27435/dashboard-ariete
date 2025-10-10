module.exports = {
  // Configuración del servidor
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Base de datos MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ariete_db',

  // JWT Secret (cambiar en producción)
  JWT_SECRET: process.env.JWT_SECRET || 'tu_jwt_secret_muy_seguro_aqui',

  // Configuración de CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
