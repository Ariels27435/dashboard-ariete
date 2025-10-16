const mongoose = require('mongoose');
const Sensor = require('../models/Sensor');
require('dotenv').config();

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ariete_db');
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// Verificar y crear sensores del Ariete si no existen
const verificarSensoresAriete = async () => {
  try {
    console.log('\n🔍 Verificando sensores del Ariete Hidráulico...\n');

    // Verificar sensores existentes
    const sensorHumedad = await Sensor.findOne({ nombre: 'Sensor Humedad Ariete' });
    const sensorFlujo = await Sensor.findOne({ nombre: 'Sensor Flujo Ariete' });
    const sensorNivel = await Sensor.findOne({ nombre: 'Sensor Nivel Ariete' });

    console.log('📊 Estado actual de los sensores:');
    console.log(`   Humedad: ${sensorHumedad ? '✅ Existe' : '❌ No existe'} ${sensorHumedad ? `(ID: ${sensorHumedad._id})` : ''}`);
    console.log(`   Flujo: ${sensorFlujo ? '✅ Existe' : '❌ No existe'} ${sensorFlujo ? `(ID: ${sensorFlujo._id})` : ''}`);
    console.log(`   Nivel: ${sensorNivel ? '✅ Existe' : '❌ No existe'} ${sensorNivel ? `(ID: ${sensorNivel._id})` : ''}`);

    // Crear sensores que no existen
    if (!sensorHumedad) {
      console.log('\n🔧 Creando Sensor de Humedad...');
      const nuevoSensorHumedad = new Sensor({
        nombre: 'Sensor Humedad Ariete',
        tipo: 'humedad',
        ubicacion: 'Sistema Ariete Hidráulico',
        unidad: '%',
        estado: 'activo',
        configuracion: {
          valorMinimo: 0,
          valorMaximo: 100,
          umbralAlerta: 80,
          intervaloLectura: 5
        },
        ultimaLectura: {
          valor: 0,
          timestamp: new Date()
        }
      });
      await nuevoSensorHumedad.save();
      console.log(`✅ Sensor Humedad creado con ID: ${nuevoSensorHumedad._id}`);
    }

    if (!sensorFlujo) {
      console.log('\n🔧 Creando Sensor de Flujo...');
      const nuevoSensorFlujo = new Sensor({
        nombre: 'Sensor Flujo Ariete',
        tipo: 'caudal',
        ubicacion: 'Sistema Ariete Hidráulico',
        unidad: 'L/min',
        estado: 'activo',
        configuracion: {
          valorMinimo: 0,
          valorMaximo: 100,
          umbralAlerta: 90,
          intervaloLectura: 5
        },
        ultimaLectura: {
          valor: 0,
          timestamp: new Date()
        }
      });
      await nuevoSensorFlujo.save();
      console.log(`✅ Sensor Flujo creado con ID: ${nuevoSensorFlujo._id}`);
    }

    if (!sensorNivel) {
      console.log('\n🔧 Creando Sensor de Nivel...');
      const nuevoSensorNivel = new Sensor({
        nombre: 'Sensor Nivel Ariete',
        tipo: 'nivel',
        ubicacion: 'Sistema Ariete Hidráulico',
        unidad: '%',
        estado: 'activo',
        configuracion: {
          valorMinimo: 0,
          valorMaximo: 100,
          umbralAlerta: 90,
          intervaloLectura: 5
        },
        ultimaLectura: {
          valor: 0,
          timestamp: new Date()
        }
      });
      await nuevoSensorNivel.save();
      console.log(`✅ Sensor Nivel creado con ID: ${nuevoSensorNivel._id}`);
    }

    // Mostrar estado final
    console.log('\n================================================');
    console.log('✅ VERIFICACIÓN COMPLETADA');
    console.log('================================================\n');

    // Obtener IDs finales
    const sensoresFinales = await Sensor.find({
      nombre: { 
        $in: ['Sensor Humedad Ariete', 'Sensor Flujo Ariete', 'Sensor Nivel Ariete'] 
      }
    });

    console.log('📋 IDs de sensores para el ESP32:\n');
    sensoresFinales.forEach(sensor => {
      console.log(`${sensor.nombre}: ${sensor._id}`);
    });

    console.log('\n🔗 URLs de prueba:');
    console.log('   Backend: https://backend-ariete.onrender.com/api/health');
    console.log('   Estado: https://backend-ariete.onrender.com/api/estado');
    console.log('   Sensores ESP32: https://backend-ariete.onrender.com/api/esp32/sensores?api_key=ariete-esp32-2025');

  } catch (error) {
    console.error('❌ Error verificando sensores:', error);
  }
};

// Ejecutar
const main = async () => {
  await connectDB();
  await verificarSensoresAriete();
  process.exit(0);
};

main();
