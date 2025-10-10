const mongoose = require('mongoose');

const testAtlasConnection = async () => {
  try {
    console.log('🔍 Probando conexión a MongoDB Atlas...');
    
    // URL de MongoDB Atlas (reemplaza con tu propia URL)
    const atlasUrl = 'mongodb+srv://usuario:password@cluster0.mongodb.net/ariete_db?retryWrites=true&w=majority';
    
    console.log('📍 Conectando a MongoDB Atlas...');
    
    await mongoose.connect(atlasUrl, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
    });
    
    console.log('✅ ¡Conexión exitosa a MongoDB Atlas!');
    console.log('📊 Base de datos: ariete_db');
    
    // Probar una operación simple
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Colecciones encontradas: ${collections.length}`);
    
    await mongoose.connection.close();
    console.log('✅ Conexión cerrada correctamente');
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('\n💡 Para usar MongoDB Atlas:');
    console.log('1. Ve a https://www.mongodb.com/atlas');
    console.log('2. Crea una cuenta gratuita');
    console.log('3. Crea un cluster gratuito');
    console.log('4. Obtén la URL de conexión');
    console.log('5. Reemplaza la URL en este archivo');
    process.exit(1);
  }
};

testAtlasConnection();
