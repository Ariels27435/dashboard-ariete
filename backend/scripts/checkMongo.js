const mongoose = require('mongoose');

const checkMongoConnection = async () => {
  try {
    console.log('🔍 Verificando conexión a MongoDB...');
    
    await mongoose.connect('mongodb://localhost:27017/ariete_db');
    console.log('✅ MongoDB está ejecutándose y accesible');
    
    // Verificar que podemos hacer operaciones básicas
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📊 Base de datos 'ariete_db' encontrada con ${collections.length} colecciones`);
    
    await mongoose.connection.close();
    console.log('✅ Conexión cerrada correctamente');
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.log('\n💡 Soluciones posibles:');
    console.log('   1. Inicia MongoDB: mongod');
    console.log('   2. O usa MongoDB Compass y asegúrate de que esté ejecutándose');
    console.log('   3. Verifica que el puerto 27017 esté disponible');
    process.exit(1);
  }
};

checkMongoConnection();
