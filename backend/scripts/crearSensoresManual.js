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

// Crear sensores manualmente
const crearSensoresManual = async () => {
  try {
    console.log('\n📝 Creando sensores manualmente...\n');

    // Eliminar sensores existentes
    await Sensor.deleteMany({
      nombre: { 
        $in: ['Sensor Humedad Ariete', 'Sensor Flujo Ariete', 'Sensor Nivel Ariete'] 
      }
    });
    console.log('🗑️  Sensores anteriores eliminados');

    // Crear sensor de humedad
    const sensorHumedad = new Sensor({
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
        valor: 40, // Valor inicial del ESP32
        timestamp: new Date()
      }
    });
    await sensorHumedad.save();
    console.log('✅ Sensor Humedad creado');
    console.log(`   ID: ${sensorHumedad._id}`);

    // Crear sensor de flujo
    const sensorFlujo = new Sensor({
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
        valor: 0.00, // Valor inicial del ESP32
        timestamp: new Date()
      }
    });
    await sensorFlujo.save();
    console.log('✅ Sensor Flujo creado');
    console.log(`   ID: ${sensorFlujo._id}`);

    // Crear sensor de nivel
    const sensorNivel = new Sensor({
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
        valor: 0, // Valor inicial del ESP32
        timestamp: new Date()
      }
    });
    await sensorNivel.save();
    console.log('✅ Sensor Nivel creado');
    console.log(`   ID: ${sensorNivel._id}`);

    console.log('\n================================================');
    console.log('✅ SENSORES CREADOS EXITOSAMENTE');
    console.log('================================================\n');

    console.log('📋 IDs para el ESP32:');
    console.log(`String sensorHumedadId = "${sensorHumedad._id}";`);
    console.log(`String sensorFlujoId = "${sensorFlujo._id}";`);
    console.log(`String sensorNivelId = "${sensorNivel._id}";`);
    console.log('\n');

    // Verificar que se crearon
    const totalSensores = await Sensor.countDocuments();
    console.log(`📊 Total de sensores en la base de datos: ${totalSensores}`);

  } catch (error) {
    console.error('❌ Error creando sensores:', error);
  }
};

// Ejecutar
const main = async () => {
  await connectDB();
  await crearSensoresManual();
  process.exit(0);
};

main();

