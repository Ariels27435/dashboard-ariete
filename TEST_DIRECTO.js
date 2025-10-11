const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sensor = require('./backend/models/Sensor');
const Lectura = require('./backend/models/Lectura');

dotenv.config();

const testDirecto = async () => {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ariete_db');
    console.log('✅ Conectado a MongoDB');

    // Buscar sensor de humedad
    const sensor = await Sensor.findOne({ nombre: 'Sensor Humedad Ariete' });
    console.log('🔍 Sensor encontrado:', sensor ? sensor.nombre : 'NO ENCONTRADO');

    if (sensor) {
      // Crear lectura
      const lectura = new Lectura({
        sensor: sensor._id,
        valor: 42,
        unidad: '%',
        metadata: {
          fuente: 'TEST-DIRECTO'
        }
      });

      console.log('📝 Creando lectura...');
      await lectura.save();
      console.log('✅ Lectura guardada:', lectura._id);

      // Actualizar sensor
      sensor.ultimaLectura = {
        valor: 42,
        timestamp: new Date()
      };
      await sensor.save();
      console.log('✅ Sensor actualizado');

      // Verificar
      const sensorActualizado = await Sensor.findById(sensor._id);
      console.log('🔍 Sensor actualizado:', sensorActualizado.ultimaLectura);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
};

testDirecto();

