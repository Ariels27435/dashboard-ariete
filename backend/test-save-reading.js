const mongoose = require('mongoose');
const Sensor = require('./models/Sensor');
const Lectura = require('./models/Lectura');

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ariete_db')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

async function testSaveReading() {
  try {
    console.log('🧪 Iniciando test de guardar lectura...');
    
    // Buscar sensor de humedad
    const sensor = await Sensor.findOne({ nombre: 'Sensor Humedad Ariete' });
    if (!sensor) {
      console.error('❌ Sensor Humedad no encontrado');
      return;
    }
    
    console.log('✅ Sensor encontrado:', sensor._id);
    
    // Crear lectura
    const lectura = new Lectura({
      sensor: sensor._id,
      valor: 41,
      unidad: '%',
      metadata: {
        fuente: 'ESP32-Ariete',
        sistemaLegacy: true
      }
    });
    
    console.log('📝 Guardando lectura...');
    await lectura.save();
    console.log('✅ Lectura guardada:', lectura._id);
    
    // Actualizar sensor
    sensor.ultimaLectura = {
      valor: 41,
      timestamp: new Date()
    };
    await sensor.save();
    console.log('✅ Sensor actualizado');
    
    // Verificar
    const sensorActualizado = await Sensor.findById(sensor._id);
    console.log('📊 Sensor actualizado:', sensorActualizado.ultimaLectura);
    
  } catch (error) {
    console.error('❌ Error en test:', error);
  } finally {
    mongoose.connection.close();
  }
}

testSaveReading();



