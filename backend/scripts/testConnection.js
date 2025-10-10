const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🔍 Probando conexión a MongoDB...');
    console.log('📍 URL: mongodb://localhost:27017/ariete_db');
    
    await mongoose.connect('mongodb://localhost:27017/ariete_db', {
      serverSelectionTimeoutMS: 5000, // 5 segundos
      connectTimeoutMS: 10000, // 10 segundos
    });
    
    console.log('✅ ¡Conexión exitosa a MongoDB!');
    console.log('📊 Base de datos: ariete_db');
    console.log('🔗 Host: localhost:27017');
    
    // Probar una operación simple
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Colecciones encontradas: ${collections.length}`);
    
    await mongoose.connection.close();
    console.log('✅ Conexión cerrada correctamente');
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('\n💡 Soluciones:');
    console.log('1. Asegúrate de que MongoDB esté ejecutándose');
    console.log('2. En MongoDB Compass, conecta a: mongodb://localhost:27017');
    console.log('3. Crea la base de datos "ariete_db"');
    console.log('4. Verifica que el puerto 27017 no esté bloqueado');
    process.exit(1);
  }
};

testConnection();
