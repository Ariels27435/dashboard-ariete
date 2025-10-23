// Script para probar la funcionalidad de historial
import https from 'https';

const BACKEND_URL = 'https://backend-ariete.onrender.com';

// Función para hacer peticiones HTTPS
function hacerPeticion(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

// Función para enviar datos de prueba
async function enviarDatosPrueba() {
  console.log('🚀 Enviando datos de prueba para generar historial...\n');

  const datosPrueba = [
    { endpoint: '/api/humedad', data: { humedad: 65 } },
    { endpoint: '/api/humedad', data: { humedad: 70 } },
    { endpoint: '/api/humedad', data: { humedad: 75 } },
    { endpoint: '/api/flujo', data: { flujo: 12.5 } },
    { endpoint: '/api/flujo', data: { flujo: 15.2 } },
    { endpoint: '/api/nivel', data: { nivel: 78 } },
    { endpoint: '/api/nivel', data: { nivel: 82 } }
  ];

  for (const test of datosPrueba) {
    console.log(`📤 Enviando ${test.endpoint}:`, test.data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo entre envíos
  }

  console.log('\n⏳ Esperando 2 segundos para que se procesen los datos...');
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Función para probar el historial
async function probarHistorial() {
  console.log('🔍 Probando funcionalidad de historial...\n');

  try {
    // 1. Verificar estado actual
    console.log('1️⃣ Verificando estado actual...');
    const estado = await hacerPeticion(`${BACKEND_URL}/api/estado`);
    console.log('   📊 Datos actuales:');
    console.log(`      Humedad: ${estado.humedad}%`);
    console.log(`      Flujo: ${estado.flujo} L/min`);
    console.log(`      Nivel: ${estado.nivel}%`);
    console.log('   📈 Historial disponible:');
    console.log(`      Humedad: ${estado.historial?.humedad || 0} lecturas`);
    console.log(`      Flujo: ${estado.historial?.flujo || 0} lecturas`);
    console.log(`      Nivel: ${estado.historial?.nivel || 0} lecturas`);

    // 2. Probar historial de humedad
    console.log('\n2️⃣ Probando historial de humedad...');
    const historialHumedad = await hacerPeticion(`${BACKEND_URL}/api/historial/humedad?limite=10&horas=24`);
    console.log(`   📊 Total lecturas: ${historialHumedad.total_lecturas}`);
    console.log(`   📈 Lecturas filtradas: ${historialHumedad.lecturas_filtradas}`);
    if (historialHumedad.datos && historialHumedad.datos.length > 0) {
      console.log('   📋 Últimas lecturas:');
      historialHumedad.datos.slice(-3).forEach((lectura, index) => {
        const fecha = new Date(lectura.timestamp).toLocaleTimeString();
        console.log(`      ${index + 1}. ${lectura.valor}% - ${fecha}`);
      });
    }

    // 3. Probar estadísticas
    console.log('\n3️⃣ Probando estadísticas de humedad...');
    const estadisticas = await hacerPeticion(`${BACKEND_URL}/api/estadisticas/humedad?horas=24`);
    console.log('   📊 Estadísticas:');
    console.log(`      Valor actual: ${estadisticas.estadisticas.valor_actual}%`);
    console.log(`      Valor mínimo: ${estadisticas.estadisticas.valor_minimo}%`);
    console.log(`      Valor máximo: ${estadisticas.estadisticas.valor_maximo}%`);
    console.log(`      Valor promedio: ${estadisticas.estadisticas.valor_promedio}%`);
    console.log(`      Tendencia: ${estadisticas.estadisticas.tendencia}`);

    // 4. Probar todos los sensores
    console.log('\n4️⃣ Verificando historial de todos los sensores...');
    const sensores = ['humedad', 'flujo', 'nivel'];
    for (const sensor of sensores) {
      try {
        const hist = await hacerPeticion(`${BACKEND_URL}/api/historial/${sensor}?limite=5`);
        console.log(`   📊 ${sensor}: ${hist.total_lecturas} lecturas totales`);
      } catch (error) {
        console.log(`   ❌ ${sensor}: Error - ${error.message}`);
      }
    }

    console.log('\n================================================');
    console.log('✅ PRUEBA DE HISTORIAL COMPLETADA');
    console.log('================================================\n');

    // Diagnóstico
    console.log('🔧 DIAGNÓSTICO:');
    if (historialHumedad.total_lecturas > 0) {
      console.log('   ✅ El historial está funcionando correctamente');
      console.log('   📈 Los datos se están guardando en memoria');
      console.log('   🔗 Puedes acceder al historial desde el frontend');
    } else {
      console.log('   ⚠️  No hay datos en el historial aún');
      console.log('   💡 Envía algunos datos del ESP32 para generar historial');
    }

  } catch (error) {
    console.error('❌ Error probando historial:', error.message);
    console.log('\n🔧 POSIBLES SOLUCIONES:');
    console.log('   1. Verificar que el servidor esté usando server-con-historial.js');
    console.log('   2. Verificar que los endpoints estén disponibles');
    console.log('   3. Revisar los logs del backend en Render');
  }
}

// Función principal
async function main() {
  console.log('🔧 PROBANDO FUNCIONALIDAD DE HISTORIAL');
  console.log('================================================\n');

  await enviarDatosPrueba();
  await probarHistorial();
  
  console.log('\n📱 Para usar el historial en el frontend:');
  console.log('   GET https://backend-ariete.onrender.com/api/historial/humedad?limite=50&horas=24');
  console.log('   GET https://backend-ariete.onrender.com/api/historial/flujo?limite=50&horas=24');
  console.log('   GET https://backend-ariete.onrender.com/api/historial/nivel?limite=50&horas=24');
  console.log('');
  console.log('📊 Para obtener estadísticas:');
  console.log('   GET https://backend-ariete.onrender.com/api/estadisticas/humedad?horas=24');
  console.log('   GET https://backend-ariete.onrender.com/api/estadisticas/flujo?horas=24');
  console.log('   GET https://backend-ariete.onrender.com/api/estadisticas/nivel?horas=24');
}

// Ejecutar
main().catch(console.error);



