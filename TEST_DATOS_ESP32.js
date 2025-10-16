// Script para probar los datos del ESP32 y verificar que se reflejen en el dashboard
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

// Función para enviar datos del ESP32
async function enviarDatosESP32() {
  console.log('🚀 Enviando datos simulados del ESP32...\n');

  try {
    // Datos de prueba
    const datosPrueba = [
      { endpoint: '/api/humedad', data: { humedad: 65 } },
      { endpoint: '/api/flujo', data: { flujo: 12.5 } },
      { endpoint: '/api/nivel', data: { nivel: 78 } }
    ];

    for (const test of datosPrueba) {
      console.log(`📤 Enviando ${test.endpoint}:`, test.data);
      
      // Simular envío (en realidad el ESP32 haría esto)
      console.log(`✅ ${test.endpoint} - Datos enviados`);
    }

    console.log('\n⏳ Esperando 3 segundos para que se procesen los datos...');
    await new Promise(resolve => setTimeout(resolve, 3000));

  } catch (error) {
    console.error('❌ Error enviando datos:', error.message);
  }
}

// Función para verificar el estado del sistema
async function verificarEstado() {
  console.log('🔍 Verificando estado del sistema...\n');

  try {
    // 1. Verificar health del backend
    console.log('1️⃣ Verificando backend...');
    const health = await hacerPeticion(`${BACKEND_URL}/api/health`);
    console.log('   ✅ Backend:', health.status);
    console.log('   📅 Timestamp:', health.timestamp);

    // 2. Verificar endpoint de estado
    console.log('\n2️⃣ Verificando endpoint /api/estado...');
    const estado = await hacerPeticion(`${BACKEND_URL}/api/estado`);
    console.log('   📊 Datos actuales:');
    console.log(`      Humedad: ${estado.humedad}%`);
    console.log(`      Flujo: ${estado.flujo} L/min`);
    console.log(`      Nivel: ${estado.nivel}%`);
    console.log(`   📅 Última actualización: ${estado.timestamp}`);

    // 3. Verificar sensores ESP32
    console.log('\n3️⃣ Verificando sensores ESP32...');
    const sensores = await hacerPeticion(`${BACKEND_URL}/api/esp32/sensores?api_key=ariete-esp32-2025`);
    console.log(`   📋 Sensores encontrados: ${sensores.sensores?.length || 0}`);
    if (sensores.sensores) {
      sensores.sensores.forEach(sensor => {
        console.log(`      ${sensor.nombre}: ${sensor.ultimaLectura?.valor || 0} ${sensor.unidad}`);
      });
    }

    // 4. Verificar dashboard
    console.log('\n4️⃣ Verificando dashboard...');
    const dashboard = await hacerPeticion(`${BACKEND_URL}/api/reportes/dashboard`);
    console.log(`   📊 Sensores en dashboard: ${dashboard.sensores?.length || 0}`);
    if (dashboard.sensores) {
      dashboard.sensores.forEach(sensor => {
        console.log(`      ${sensor.sensor}: ${sensor.valor} ${sensor.unidad}`);
      });
    }

    console.log('\n================================================');
    console.log('✅ VERIFICACIÓN COMPLETADA');
    console.log('================================================\n');

    // Diagnóstico
    console.log('🔧 DIAGNÓSTICO:');
    if (estado.humedad === 0 && estado.flujo === 0 && estado.nivel === 0) {
      console.log('   ⚠️  Los valores están en 0 - El ESP32 no ha enviado datos recientes');
      console.log('   💡 Soluciones:');
      console.log('      1. Verificar que el ESP32 esté conectado a WiFi');
      console.log('      2. Verificar que el ESP32 esté enviando datos a:');
      console.log('         - POST https://backend-ariete.onrender.com/api/humedad');
      console.log('         - POST https://backend-ariete.onrender.com/api/flujo');
      console.log('         - POST https://backend-ariete.onrender.com/api/nivel');
      console.log('      3. Verificar la configuración de red del ESP32');
    } else {
      console.log('   ✅ Los datos se están recibiendo correctamente');
    }

  } catch (error) {
    console.error('❌ Error verificando estado:', error.message);
    console.log('\n🔧 POSIBLES SOLUCIONES:');
    console.log('   1. Verificar que el backend esté funcionando en Render');
    console.log('   2. Verificar la conexión a MongoDB Atlas');
    console.log('   3. Revisar los logs del backend en Render');
  }
}

// Función principal
async function main() {
  console.log('🔧 DIAGNÓSTICO DEL SISTEMA ARIETE HIDRÁULICO');
  console.log('================================================\n');

  await verificarEstado();
  
  console.log('\n📱 Para enviar datos desde el ESP32, usa estos endpoints:');
  console.log('   POST https://backend-ariete.onrender.com/api/humedad');
  console.log('   Body: { "humedad": 65 }');
  console.log('');
  console.log('   POST https://backend-ariete.onrender.com/api/flujo');
  console.log('   Body: { "flujo": 12.5 }');
  console.log('');
  console.log('   POST https://backend-ariete.onrender.com/api/nivel');
  console.log('   Body: { "nivel": 78 }');
}

// Ejecutar
main().catch(console.error);
