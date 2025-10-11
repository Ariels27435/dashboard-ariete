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

// Crear sensores específicos para el Ariete
const crearSensoresAriete = async () => {
  try {
    console.log('\n📝 Creando sensores del Ariete Hidráulico...\n');

    // Verificar si ya existen
    const existentes = await Sensor.find({
      nombre: { 
        $in: ['Sensor Humedad Ariete', 'Sensor Flujo Ariete', 'Sensor Nivel Ariete'] 
      }
    });

    if (existentes.length > 0) {
      console.log('⚠️  Ya existen sensores del Ariete. Eliminando...');
      await Sensor.deleteMany({
        nombre: { 
          $in: ['Sensor Humedad Ariete', 'Sensor Flujo Ariete', 'Sensor Nivel Ariete'] 
        }
      });
    }

    // 1. SENSOR DE HUMEDAD (usando tipo 'nivel' porque 'humedad' no está en el enum)
    const sensorHumedad = new Sensor({
      nombre: 'Sensor Humedad Ariete',
      tipo: 'nivel', // Cambiado de 'humedad' a 'nivel' (está en el enum)
      ubicacion: 'Sistema Ariete Hidráulico',
      unidad: '%',
      estado: 'activo',
      configuracion: {
        valorMinimo: 0,
        valorMaximo: 100,
        umbralAlerta: 80, // Agregado campo requerido
        intervaloLectura: 5
      },
      ultimaLectura: {
        valor: 0,
        timestamp: new Date()
      }
    });
    await sensorHumedad.save();
    console.log('✅ Sensor Humedad creado');
    console.log(`   ID: ${sensorHumedad._id}`);
    console.log(`   Para ESP32: sensorHumedadId = "${sensorHumedad._id}";`);

    // 2. SENSOR DE FLUJO
    const sensorFlujo = new Sensor({
      nombre: 'Sensor Flujo Ariete',
      tipo: 'caudal',
      ubicacion: 'Sistema Ariete Hidráulico',
      unidad: 'L/min',
      estado: 'activo',
      configuracion: {
        valorMinimo: 0,
        valorMaximo: 100,
        umbralAlerta: 90, // Agregado campo requerido
        intervaloLectura: 5
      },
      ultimaLectura: {
        valor: 0,
        timestamp: new Date()
      }
    });
    await sensorFlujo.save();
    console.log('\n✅ Sensor Flujo creado');
    console.log(`   ID: ${sensorFlujo._id}`);
    console.log(`   Para ESP32: sensorFlujoId = "${sensorFlujo._id}";`);

    // 3. SENSOR DE NIVEL
    const sensorNivel = new Sensor({
      nombre: 'Sensor Nivel Ariete',
      tipo: 'nivel',
      ubicacion: 'Sistema Ariete Hidráulico',
      unidad: '%',
      estado: 'activo',
      configuracion: {
        valorMinimo: 0,
        valorMaximo: 100,
        umbralAlerta: 90, // Agregado campo requerido
        intervaloLectura: 5
      },
      ultimaLectura: {
        valor: 0,
        timestamp: new Date()
      }
    });
    await sensorNivel.save();
    console.log('\n✅ Sensor Nivel creado');
    console.log(`   ID: ${sensorNivel._id}`);
    console.log(`   Para ESP32: sensorNivelId = "${sensorNivel._id}";`);

    console.log('\n================================================');
    console.log('✅ SENSORES CREADOS EXITOSAMENTE');
    console.log('================================================\n');

    console.log('📋 COPIA ESTAS LÍNEAS en tu código ESP32:\n');
    console.log(`String sensorHumedadId = "${sensorHumedad._id}";`);
    console.log(`String sensorFlujoId = "${sensorFlujo._id}";`);
    console.log(`String sensorNivelId = "${sensorNivel._id}";`);
    console.log('\n================================================\n');

    console.log('🔍 Verifica los sensores en:');
    console.log(`   http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025`);
    console.log('\n');

  } catch (error) {
    console.error('❌ Error creando sensores:', error);
  }
};

// Ejecutar
const main = async () => {
  await connectDB();
  await crearSensoresAriete();
  process.exit(0);
};

main();

