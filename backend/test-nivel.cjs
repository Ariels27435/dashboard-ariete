const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sensor = require('./models/Sensor');
const Lectura = require('./models/Lectura');

dotenv.config();

const testNivel = async () => {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ariete_db');
    console.log('✅ Conectado a MongoDB');

    // Buscar sensor de nivel
    const sensor = await Sensor.findOne({ nombre: 'Sensor Nivel Ariete' });
    console.log('🔍 Sensor encontrado:', sensor ? sensor.nombre : 'NO ENCONTRADO');

    if (sensor) {
      console.log('📊 Sensor actual:', JSON.stringify(sensor, null, 2));

      // Crear lectura
      const lectura = new Lectura({
        sensor: sensor._id,
        valor: 100,
        unidad: '%',
        metadata: {
          fuente: 'TEST-NIVEL'
        }
      });

      console.log('📝 Creando lectura...');
      await lectura.save();
      console.log('✅ Lectura guardada:', lectura._id);

      // Actualizar sensor
      sensor.ultimaLectura = {
        valor: 100,
        timestamp: new Date()
      };
      await sensor.save();
      console.log('✅ Sensor actualizado');

      // Verificar
      const sensorActualizado = await Sensor.findById(sensor._id);
      console.log('🔍 Sensor actualizado:', JSON.stringify(sensorActualizado.ultimaLectura, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
};

testNivel();

