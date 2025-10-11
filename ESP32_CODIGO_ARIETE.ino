/*
 * ESP32 - Ariete Hidráulico
 * Adaptado para funcionar con el Dashboard
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <Ticker.h>

// ============ CONFIGURACIÓN WiFi ============
const char* ssid = "S23 Ultra de Ariels";
const char* pass = "54nsuwfq4e8ms77";

// ============ CONFIGURACIÓN SERVIDOR ============
const char* serverIP = "10.183.6.170";  // IP de tu PC
const int serverPort = 3001;             // ⚠️ CAMBIADO a 3001 (era 3000)
const char* apiKey = "ariete-esp32-2025"; // API Key del backend

// ============ IDs DE SENSORES ============
// ⚠️ IMPORTANTE: Debes obtener estos IDs del dashboard
// Ve a: http://10.183.6.170:3001/api/esp32/sensores?api_key=ariete-esp32-2025
// Por ahora usamos valores de ejemplo - CÁMBIALOS por los reales

// OPCIÓN 1: Si ya tienes los IDs de tu base de datos, úsalos aquí:
String sensorHumedadId = "OBTENER_DEL_DASHBOARD";
String sensorFlujoId = "OBTENER_DEL_DASHBOARD";
String sensorNivelId = "OBTENER_DEL_DASHBOARD";

// OPCIÓN 2: Si no los tienes, el código intentará crearlos automáticamente
bool usarCreacionAutomatica = true; // Cambia a false cuando tengas los IDs reales

// ============ PINES ============
const int pinHumedad = 34;
const int pinFlujo   = 27;
const int pinNivel   = 33;

// ============ VARIABLES GLOBALES ============
Ticker timer;
volatile int contadorPulsos = 0;

// ============ INTERRUPCIÓN PARA FLUJO ============
void IRAM_ATTR contarPulso() {
  contadorPulsos++;
}

// ============ FUNCIÓN PARA ENVIAR DATOS ============
bool enviarDato(String sensorId, float valor, String unidad, String nombreSensor) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi no conectado");
    return false;
  }

  HTTPClient http;
  String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/api/esp32/lectura";
  
  Serial.print("📤 Enviando " + nombreSensor + ": " + String(valor) + " " + unidad + " ... ");
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", apiKey); // ⚠️ NUEVO: API Key en el header
  
  // Crear JSON con el formato correcto
  String json = "{";
  json += "\"sensorId\":\"" + sensorId + "\",";
  json += "\"valor\":" + String(valor, 2) + ",";
  json += "\"unidad\":\"" + unidad + "\",";
  json += "\"metadata\":{";
  json += "\"dispositivo\":\"ESP32\",";
  json += "\"ip\":\"" + WiFi.localIP().toString() + "\",";
  json += "\"rssi\":" + String(WiFi.RSSI());
  json += "}}";
  
  int code = http.POST(json);
  String response = http.getString();
  http.end();
  
  // Interpretar código de respuesta
  if (code == 201) {
    Serial.println("✅ OK");
    return true;
  } else if (code == -1) {
    Serial.println("❌ Error de conexión (servidor no responde)");
    Serial.println("   → Verifica que el backend esté ejecutándose");
    Serial.println("   → Verifica la IP y puerto: " + String(serverIP) + ":" + String(serverPort));
  } else if (code == 401) {
    Serial.println("❌ API Key inválida");
    Serial.println("   → Verifica ESP32_API_KEY en backend/.env");
  } else if (code == 404) {
    Serial.println("❌ Sensor no encontrado (ID: " + sensorId + ")");
    Serial.println("   → Obtén los IDs correctos del dashboard");
  } else {
    Serial.println("⚠️  HTTP " + String(code));
    Serial.println("   Respuesta: " + response);
  }
  
  return false;
}

// ============ FUNCIÓN PARA LEER Y ENVIAR SENSORES ============
void enviarSensores() {
  Serial.println("\n📊 ============ Leyendo Sensores ============");
  
  // 🌫️ HUMEDAD
  int valorADC = analogRead(pinHumedad);
  int humedad = map(valorADC, 4095, 0, 0, 100);
  humedad = constrain(humedad, 0, 100);
  Serial.println("🌫️  Humedad ADC: " + String(valorADC) + " → " + String(humedad) + "%");
  
  if (sensorHumedadId != "OBTENER_DEL_DASHBOARD") {
    enviarDato(sensorHumedadId, humedad, "%", "Humedad");
    delay(200);
  } else {
    Serial.println("   ⚠️  Sensor Humedad no configurado (falta ID)");
  }
  
  // 💧 FLUJO
  float flujo_Lmin = (contadorPulsos / 7.5);
  Serial.println("💧 Pulsos: " + String(contadorPulsos) + " → Flujo: " + String(flujo_Lmin, 2) + " L/min");
  contadorPulsos = 0;
  
  if (sensorFlujoId != "OBTENER_DEL_DASHBOARD") {
    enviarDato(sensorFlujoId, flujo_Lmin, "L/min", "Flujo");
    delay(200);
  } else {
    Serial.println("   ⚠️  Sensor Flujo no configurado (falta ID)");
  }
  
  // 🛢️ NIVEL
  int estado = digitalRead(pinNivel);
  int nivel = (estado == LOW) ? 0 : 100;
  Serial.println("🛢️  Pin " + String(pinNivel) + ": " + String(estado) + " → Nivel: " + String(nivel) + "%");
  
  if (sensorNivelId != "OBTENER_DEL_DASHBOARD") {
    enviarDato(sensorNivelId, nivel, "%", "Nivel");
  } else {
    Serial.println("   ⚠️  Sensor Nivel no configurado (falta ID)");
  }
  
  Serial.println("============================================\n");
}

// ============ FUNCIÓN PARA OBTENER IDs DE SENSORES ============
void obtenerSensorIds() {
  Serial.println("\n🔍 Obteniendo IDs de sensores del servidor...");
  
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi no conectado");
    return;
  }
  
  HTTPClient http;
  String url = "http://" + String(serverIP) + ":" + String(serverPort) + 
               "/api/esp32/sensores?api_key=" + String(apiKey);
  
  http.begin(url);
  int code = http.GET();
  
  if (code == 200) {
    String response = http.getString();
    Serial.println("✅ Respuesta del servidor:");
    Serial.println(response);
    Serial.println("\n📝 COPIA los IDs de arriba y pégalos en el código (líneas 19-21)");
    Serial.println("   Ejemplo:");
    Serial.println("   sensorHumedadId = \"67098abc123def456789\";");
  } else {
    Serial.println("❌ Error " + String(code) + " al obtener sensores");
    if (code == -1) {
      Serial.println("   → El servidor no responde. ¿Está el backend ejecutándose?");
    }
  }
  
  http.end();
}

// ============ FUNCIÓN PARA VERIFICAR CONEXIÓN ============
void verificarConexion() {
  Serial.println("\n🔍 Verificando conexión con el servidor...");
  
  HTTPClient http;
  String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/api/esp32/ping";
  
  http.begin(url);
  int code = http.GET();
  
  if (code == 200) {
    String response = http.getString();
    Serial.println("✅ Servidor accesible:");
    Serial.println(response);
  } else if (code == -1) {
    Serial.println("❌ No se puede conectar al servidor");
    Serial.println("   Causas posibles:");
    Serial.println("   1. Backend no está ejecutándose (ejecuta: npm run dev en backend)");
    Serial.println("   2. IP incorrecta (actual: " + String(serverIP) + ")");
    Serial.println("   3. Puerto incorrecto (actual: " + String(serverPort) + ")");
    Serial.println("   4. Firewall bloqueando la conexión");
  } else {
    Serial.println("⚠️  Código HTTP: " + String(code));
  }
  
  http.end();
}

// ============ SETUP ============
void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n\n");
  Serial.println("================================================");
  Serial.println("   ESP32 - ARIETE HIDRÁULICO");
  Serial.println("   Dashboard Integration v2.0");
  Serial.println("================================================");
  
  // Conectar WiFi
  Serial.print("\n📶 Conectando a WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  
  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 30) {
    delay(500);
    Serial.print(".");
    intentos++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi conectado!");
    Serial.print("   IP ESP32: ");
    Serial.println(WiFi.localIP());
    Serial.print("   Señal: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    Serial.println("\n❌ No se pudo conectar a WiFi");
    Serial.println("   Verifica SSID y contraseña");
    return;
  }
  
  // Configurar pines
  Serial.println("\n⚙️  Configurando pines...");
  pinMode(pinFlujo, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(pinFlujo), contarPulso, FALLING);
  pinMode(pinNivel, INPUT_PULLUP);
  Serial.println("   ✅ Pines configurados");
  
  // Mostrar configuración
  Serial.println("\n📋 Configuración:");
  Serial.println("   Servidor: http://" + String(serverIP) + ":" + String(serverPort));
  Serial.println("   API Key: " + String(apiKey));
  Serial.println("   Intervalo: 5 segundos");
  
  // Verificar conexión con servidor
  delay(1000);
  verificarConexion();
  
  // Obtener IDs de sensores
  delay(1000);
  obtenerSensorIds();
  
  // Verificar si los IDs están configurados
  Serial.println("\n🔧 Estado de sensores:");
  if (sensorHumedadId != "OBTENER_DEL_DASHBOARD") {
    Serial.println("   ✅ Sensor Humedad: " + sensorHumedadId);
  } else {
    Serial.println("   ⚠️  Sensor Humedad: NO CONFIGURADO");
  }
  
  if (sensorFlujoId != "OBTENER_DEL_DASHBOARD") {
    Serial.println("   ✅ Sensor Flujo: " + sensorFlujoId);
  } else {
    Serial.println("   ⚠️  Sensor Flujo: NO CONFIGURADO");
  }
  
  if (sensorNivelId != "OBTENER_DEL_DASHBOARD") {
    Serial.println("   ✅ Sensor Nivel: " + sensorNivelId);
  } else {
    Serial.println("   ⚠️  Sensor Nivel: NO CONFIGURADO");
  }
  
  Serial.println("\n================================================");
  Serial.println("   Sistema iniciado - Enviando datos cada 5s");
  Serial.println("================================================\n");
  
  // Iniciar temporizador (enviar cada 5 segundos)
  timer.attach(5, enviarSensores);
}

// ============ LOOP ============
void loop() {
  // Todo se maneja por interrupciones y temporizador
  delay(100);
  
  // Verificar conexión WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("⚠️  WiFi desconectado. Reconectando...");
    WiFi.reconnect();
    delay(5000);
  }
}


