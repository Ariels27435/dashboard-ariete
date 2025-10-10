const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const Sensor = require('../models/Sensor');
const Lectura = require('../models/Lectura');
const Alerta = require('../models/Alerta');
const Configuracion = require('../models/Configuracion');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ariete_db');

const initData = async () => {
  try {
    console.log('🚀 Inicializando datos de ejemplo...');

    // Limpiar datos existentes
    await Usuario.deleteMany({});
    await Sensor.deleteMany({});
    await Lectura.deleteMany({});
    await Alerta.deleteMany({});
    await Configuracion.deleteMany({});

    // Crear usuarios
    const usuarios = await Usuario.insertMany([
      {
        nombre: 'Administrador',
        email: 'admin@ariete.com',
        password: 'admin123',
        rol: 'admin',
        estado: 'activo'
      },
      {
        nombre: 'Juan Pérez',
        email: 'juan.perez@ariete.com',
        password: 'operador123',
        rol: 'operador',
        estado: 'activo'
      },
      {
        nombre: 'María García',
        email: 'maria.garcia@ariete.com',
        password: 'supervisor123',
        rol: 'supervisor',
        estado: 'activo'
      }
    ]);

    console.log('✅ Usuarios creados');

    // Crear sensores
    const sensores = await Sensor.insertMany([
      {
        nombre: 'Temperatura Principal',
        tipo: 'temperatura',
        ubicacion: 'Tanque Principal',
        unidad: '°C',
        estado: 'activo',
        configuracion: {
          valorMinimo: 15,
          valorMaximo: 30,
          umbralAlerta: 25,
          intervaloLectura: 60,
          habilitado: true
        },
        metadata: {
          fabricante: 'Siemens',
          modelo: 'SITRANS TH300',
          serie: 'TH300-001',
          instalacion: new Date('2024-01-01')
        }
      },
      {
        nombre: 'Presión Sistema',
        tipo: 'presion',
        ubicacion: 'Línea Principal',
        unidad: 'bar',
        estado: 'activo',
        configuracion: {
          valorMinimo: 1.5,
          valorMaximo: 3.0,
          umbralAlerta: 2.5,
          intervaloLectura: 30,
          habilitado: true
        },
        metadata: {
          fabricante: 'ABB',
          modelo: '266HST',
          serie: '266HST-002',
          instalacion: new Date('2024-01-01')
        }
      },
      {
        nombre: 'Caudal Principal',
        tipo: 'caudal',
        ubicacion: 'Entrada Principal',
        unidad: 'L/min',
        estado: 'activo',
        configuracion: {
          valorMinimo: 5,
          valorMaximo: 20,
          umbralAlerta: 18,
          intervaloLectura: 60,
          habilitado: true
        },
        metadata: {
          fabricante: 'Endress+Hauser',
          modelo: 'Promag 50',
          serie: 'PM50-003',
          instalacion: new Date('2024-01-01')
        }
      },
      {
        nombre: 'Nivel Tanque 1',
        tipo: 'nivel',
        ubicacion: 'Tanque de Almacenamiento',
        unidad: '%',
        estado: 'activo',
        configuracion: {
          valorMinimo: 20,
          valorMaximo: 95,
          umbralAlerta: 25,
          intervaloLectura: 120,
          habilitado: true
        },
        metadata: {
          fabricante: 'Vega',
          modelo: 'VEGAPULS 64',
          serie: 'VP64-004',
          instalacion: new Date('2024-01-01')
        }
      }
    ]);

    console.log('✅ Sensores creados');

    // Crear lecturas de ejemplo para las últimas 24 horas
    const ahora = new Date();
    const lecturas = [];

    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(ahora.getTime() - (23 - i) * 60 * 60 * 1000);
      
      for (const sensor of sensores) {
        let valor;
        switch (sensor.tipo) {
          case 'temperatura':
            valor = 20 + Math.random() * 10 + Math.sin(i * 0.5) * 3;
            break;
          case 'presion':
            valor = 1.8 + Math.random() * 0.8 + Math.sin(i * 0.3) * 0.2;
            break;
          case 'caudal':
            valor = 8 + Math.random() * 8 + Math.sin(i * 0.4) * 4;
            break;
          case 'nivel':
            valor = 60 + Math.random() * 30 + Math.sin(i * 0.2) * 10;
            break;
        }

        lecturas.push({
          sensor: sensor._id,
          valor: Math.round(valor * 10) / 10,
          unidad: sensor.unidad,
          timestamp,
          calidad: Math.random() > 0.1 ? 'buena' : 'regular'
        });
      }
    }

    await Lectura.insertMany(lecturas);
    console.log('✅ Lecturas de ejemplo creadas');

    // Crear alertas de ejemplo
    await Alerta.insertMany([
      {
        tipo: 'warning',
        titulo: 'Presión Elevada',
        mensaje: 'La presión del sistema está por encima del umbral recomendado',
        sensor: sensores[1]._id,
        prioridad: 'media',
        estado: 'activa',
        datos: {
          valor: 2.8,
          umbral: 2.5,
          ubicacion: 'Línea Principal'
        }
      },
      {
        tipo: 'info',
        titulo: 'Mantenimiento Programado',
        mensaje: 'Revisión de válvulas programada para el próximo martes',
        prioridad: 'baja',
        estado: 'activa',
        datos: {
          ubicacion: 'Sistema General'
        }
      }
    ]);

    console.log('✅ Alertas de ejemplo creadas');

    // Crear configuración por defecto
    await Configuracion.create({
      nombreSistema: 'Ariete Hidráulico',
      limites: {
        temperatura: { minima: 15, maxima: 30 },
        presion: { minima: 1.5, maxima: 3.0 },
        caudal: { minimo: 5, maximo: 20 },
        nivel: { minimo: 20, maximo: 95 }
      },
      alertas: {
        email: 'admin@ariete.com',
        habilitadas: { email: true, sms: false, push: true }
      },
      sistema: {
        retencionDatos: 30,
        respaldoAutomatico: true,
        intervaloLectura: 60,
        version: '1.0.0'
      }
    });

    console.log('✅ Configuración creada');

    console.log('\n🎉 ¡Datos de ejemplo inicializados exitosamente!');
    console.log('\n📋 Credenciales de acceso:');
    console.log('   Admin: admin@ariete.com / admin123');
    console.log('   Operador: juan.perez@ariete.com / operador123');
    console.log('   Supervisor: maria.garcia@ariete.com / supervisor123');

  } catch (error) {
    console.error('❌ Error inicializando datos:', error);
  } finally {
    mongoose.connection.close();
  }
};

initData();
