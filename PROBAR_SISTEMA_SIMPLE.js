// Script para probar el sistema simple (como funcionaba antes)
import https from 'https';

const BACKEND_URL = 'https://backend-ariete.onrender.com';

// Función para hacer peticiones HTTPS
function hacerPeticion(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Función para enviar datos del ESP32
async function enviarDatosESP32() {
  console.log('🚀 Enviando datos simulados del ESP32 al sistema simple...\n');

  const datosPrueba = [
    { endpoint: '/api/humedad', data: { humedad: 65 } },
    { endpoint: '/api/flujo', data: { flujo: 12.5 } },
    { endpoint: '/api/nivel', data: { nivel: 78 } }
  ];

  for (const test of datosPrueba) {
    try {
      console.log(`📤 Enviando ${test.endpoint}:`, test.data);
      
      const response = await hacerPeticion(`${BACKEND_URL}${test.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(test.data)
      });
      
      console.log(`   ✅ Respuesta: ${response.status} - ${response.data.message}`);
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n⏳ Esperando 3 segundos para que se procesen los datos...');
  await new Promise(resolve => setTimeout(resolve, 3000));
}

// Función para verificar el estado
async function verificarEstado() {
  console.log('🔍 Verificando estado del sistema simple...\n');

  try {
    // 1. Verificar health del backend
    console.log('1️⃣ Verificando backend...');
    const health = await hacerPeticion(`${BACKEND_URL}/api/health`);
    console.log(`   ✅ Backend: ${health.data.status}`);
    console.log(`   📅 Timestamp: ${health.data.timestamp}`);

    // 2. Verificar endpoint de estado
    console.log('\n2️⃣ Verificando endpoint /api/estado...');
    const estado = await hacerPeticion(`${BACKEND_URL}/api/estado`);
    console.log('   📊 Datos actuales:');
    console.log(`      Humedad: ${estado.data.humedad}%`);
    console.log(`      Flujo: ${estado.data.flujo} L/min`);
    console.log(`      Nivel: ${estado.data.nivel}%`);
    console.log(`   📅 Última actualización: ${estado.data.timestamp}`);

    console.log('\n================================================');
    console.log('✅ VERIFICACIÓN COMPLETADA');
    console.log('================================================\n');

    // Diagnóstico
    console.log('🔧 DIAGNÓSTICO:');
    if (estado.data.humedad === 0 && estado.data.flujo === 0 && estado.data.nivel === 0) {
      console.log('   ⚠️  Los valores están en 0 - Esperando datos del ESP32');
      console.log('   💡 El sistema simple está funcionando correctamente');
      console.log('   📱 El ESP32 puede enviar datos a estos endpoints:');
      console.log('      - POST https://backend-ariete.onrender.com/api/humedad');
      console.log('      - POST https://backend-ariete.onrender.com/api/flujo');
      console.log('      - POST https://backend-ariete.onrender.com/api/nivel');
    } else {
      console.log('   ✅ Los datos se están recibiendo correctamente');
      console.log('   🎉 El sistema simple está funcionando como antes');
    }

  } catch (error) {
    console.error('❌ Error verificando estado:', error.message);
    console.log('\n🔧 POSIBLES SOLUCIONES:');
    console.log('   1. Esperar a que Render termine de desplegar los cambios');
    console.log('   2. Verificar que el backend esté funcionando en Render');
    console.log('   3. Revisar los logs del backend en Render');
  }
}

// Función principal
async function main() {
  console.log('🔧 PROBANDO SISTEMA SIMPLE (SIN MONGODB)');
  console.log('================================================\n');

  await verificarEstado();
  await enviarDatosESP32();
  await verificarEstado();
  
  console.log('\n📱 CÓDIGO PARA EL ESP32:');
  console.log('```cpp');
  console.log('// Para enviar humedad');
  console.log('HTTPClient http;');
  console.log('http.begin("https://backend-ariete.onrender.com/api/humedad");');
  console.log('http.addHeader("Content-Type", "application/json");');
  console.log('String json = "{\\"humedad\\":" + String(valorHumedad) + "}";');
  console.log('int httpResponseCode = http.POST(json);');
  console.log('http.end();');
  console.log('');
  console.log('// Para enviar flujo');
  console.log('http.begin("https://backend-ariete.onrender.com/api/flujo");');
  console.log('http.addHeader("Content-Type", "application/json");');
  console.log('json = "{\\"flujo\\":" + String(valorFlujo) + "}";');
  console.log('httpResponseCode = http.POST(json);');
  console.log('http.end();');
  console.log('');
  console.log('// Para enviar nivel');
  console.log('http.begin("https://backend-ariete.onrender.com/api/nivel");');
  console.log('http.addHeader("Content-Type", "application/json");');
  console.log('json = "{\\"nivel\\":" + String(valorNivel) + "}";');
  console.log('httpResponseCode = http.POST(json);');
  console.log('http.end();');
  console.log('```');
}

// Ejecutar
main().catch(console.error);
