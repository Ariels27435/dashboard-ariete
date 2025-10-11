/*
 * CÓDIGO DE EJEMPLO PARA ESP32
 * Dashboard Ariete Hidráulico
 * 
 * Este código envía datos de sensores al dashboard
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ============ CONFIGURACIÓN - MODIFICA ESTOS VALORES ============

// Configuración WiFi
const char* ssid = "TU_RED_WIFI";           // Cambia por tu red WiFi
const char* password = "TU_PASSWORD_WIFI";   // Cambia por tu contraseña

// Configuración del Servidor
// DESARROLLO LOCAL (cuando el backend está en tu PC):
const char* serverUrl = "http://192.168.1.100:3001/api/esp32/lectura";

// PRODUCCIÓN (cuando el backend está en Render):
// const char* serverUrl = "https://tu-backend.onrender.com/api/esp32/lectura";

// API Key (debe coincidir con ESP32_API_KEY en el backend)
const char* apiKey = "ariete-esp32-2025";

// IDs de los sensores (obtenlos desde el dashboard o la base de datos)
// Ejemplo: Ve a http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025
const char* sensorTemperaturaId = "AQUI_VA_EL_ID_DEL_SENSOR_TEMPERATURA";
const char* sensorPresionId = "AQUI_VA_EL_ID_DEL_SENSOR_PRESION";
const char* sensorCaudalId = "AQUI_VA_EL_ID_DEL_SENSOR_CAUDAL";

// Intervalo de envío (milisegundos)
const unsigned long intervaloEnvio = 5000; // 5 segundos

// ============ FIN CONFIGURACIÓN ============

// Pines de los sensores (ajusta según tu hardware)
#define SENSOR_TEMPERATURA_PIN 34
#define SENSOR_PRESION_PIN 35
#define SENSOR_CAUDAL_PIN 36

unsigned long ultimoEnvio = 0;

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n============================================");
  Serial.println("Dashboard Ariete Hidráulico - ESP32");
  Serial.println("============================================\n");
  
  // Configurar pines de sensores
  pinMode(SENSOR_TEMPERATURA_PIN, INPUT);
  pinMode(SENSOR_PRESION_PIN, INPUT);
  pinMode(SENSOR_CAUDAL_PIN, INPUT);
  
  // Conectar a WiFi
  conectarWiFi();
  
  // Mostrar configuración
  Serial.println("\n--- Configuración ---");
  Serial.print("Servidor: ");
  Serial.println(serverUrl);
  Serial.print("API Key: ");
  Serial.println(apiKey);
  Serial.println("---------------------\n");
}

void loop() {
  // Verificar conexión WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi desconectado. Reconectando...");
    conectarWiFi();
    return;
  }
  
  // Enviar datos cada X segundos
  if (millis() - ultimoEnvio >= intervaloEnvio) {
    // Leer sensores
    float temperatura = leerTemperatura();
    float presion = leerPresion();
    float caudal = leerCaudal();
    
    // Mostrar lecturas
    Serial.println("\n📊 Lecturas de Sensores:");
    Serial.printf("  🌡️  Temperatura: %.2f °C\n", temperatura);
    Serial.printf("  📈 Presión: %.2f bar\n", presion);
    Serial.printf("  💧 Caudal: %.2f L/min\n", caudal);
    
    // Enviar datos al servidor
    enviarDatosTemperatura(temperatura);
    delay(200); // Pequeña pausa entre envíos
    
    enviarDatosPresion(presion);
    delay(200);
    
    enviarDatosCaudal(caudal);
    
    ultimoEnvio = millis();
  }
  
  delay(100);
}

// ============ FUNCIONES DE CONEXIÓN ============

void conectarWiFi() {
  Serial.print("Conectando a WiFi: ");
  Serial.println(ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 30) {
    delay(500);
    Serial.print(".");
    intentos++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ No se pudo conectar a WiFi");
  }
}

// ============ FUNCIONES DE LECTURA DE SENSORES ============

float leerTemperatura() {
  // EJEMPLO: Lectura analógica y conversión
  // Ajusta según tu sensor real (DHT22, DS18B20, etc.)
  int valorADC = analogRead(SENSOR_TEMPERATURA_PIN);
  
  // Simulación para pruebas (elimina esto cuando uses un sensor real)
  // Genera valores aleatorios entre 20 y 30°C
  return 20.0 + random(0, 1000) / 100.0;
  
  // EJEMPLO para sensor LM35:
  // float voltaje = (valorADC / 4095.0) * 3.3;
  // float temperatura = voltaje * 100.0;
  // return temperatura;
}

float leerPresion() {
  // EJEMPLO: Ajusta según tu sensor de presión
  int valorADC = analogRead(SENSOR_PRESION_PIN);
  
  // Simulación para pruebas
  return 1.0 + random(0, 300) / 100.0; // 1.0 - 4.0 bar
  
  // EJEMPLO para sensor de presión 0-5V / 0-10 bar:
  // float voltaje = (valorADC / 4095.0) * 3.3;
  // float presion = (voltaje / 5.0) * 10.0;
  // return presion;
}

float leerCaudal() {
  // EJEMPLO: Ajusta según tu sensor de caudal
  int valorADC = analogRead(SENSOR_CAUDAL_PIN);
  
  // Simulación para pruebas
  return 50.0 + random(0, 2000) / 100.0; // 50 - 70 L/min
  
  // EJEMPLO para sensor de caudal YF-S201:
  // Implementa contador de pulsos
  // float caudal = (pulsos / 7.5) / tiempoEnSegundos;
  // return caudal;
}

// ============ FUNCIONES DE ENVÍO DE DATOS ============

void enviarDatosTemperatura(float valor) {
  enviarDato(sensorTemperaturaId, valor, "°C", "Temperatura");
}

void enviarDatosPresion(float valor) {
  enviarDato(sensorPresionId, valor, "bar", "Presión");
}

void enviarDatosCaudal(float valor) {
  enviarDato(sensorCaudalId, valor, "L/min", "Caudal");
}

void enviarDato(const char* sensorId, float valor, const char* unidad, const char* nombreSensor) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi no conectado");
    return;
  }
  
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", apiKey);
  
  // Crear JSON
  StaticJsonDocument<300> doc;
  doc["sensorId"] = sensorId;
  doc["valor"] = valor;
  doc["unidad"] = unidad;
  
  // Metadata adicional (opcional)
  JsonObject metadata = doc.createNestedObject("metadata");
  metadata["dispositivo"] = "ESP32";
  metadata["ip"] = WiFi.localIP().toString();
  metadata["rssi"] = WiFi.RSSI();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Enviar petición POST
  Serial.print("📤 Enviando ");
  Serial.print(nombreSensor);
  Serial.print(": ");
  Serial.print(valor);
  Serial.print(" ");
  Serial.print(unidad);
  Serial.print(" ... ");
  
  int httpCode = http.POST(jsonString);
  
  if (httpCode > 0) {
    if (httpCode == 201) {
      Serial.println("✅ OK");
    } else {
      Serial.printf("⚠️  HTTP %d\n", httpCode);
    }
    
    // Mostrar respuesta del servidor
    String respuesta = http.getString();
    if (respuesta.length() < 200) {
      Serial.print("   Respuesta: ");
      Serial.println(respuesta);
    }
  } else {
    Serial.print("❌ Error: ");
    Serial.println(http.errorToString(httpCode));
  }
  
  http.end();
}

// ============ FUNCIÓN PARA ENVÍO MÚLTIPLE (OPCIONAL) ============

void enviarMultiplesLecturas(float temp, float pres, float caudal) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi no conectado");
    return;
  }
  
  HTTPClient http;
  http.begin("http://192.168.1.100:3001/api/esp32/lecturas"); // Cambia la URL
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", apiKey);
  
  // Crear JSON con múltiples lecturas
  StaticJsonDocument<600> doc;
  JsonArray lecturas = doc.createNestedArray("lecturas");
  
  // Temperatura
  JsonObject lectura1 = lecturas.createNestedObject();
  lectura1["sensorId"] = sensorTemperaturaId;
  lectura1["valor"] = temp;
  
  // Presión
  JsonObject lectura2 = lecturas.createNestedObject();
  lectura2["sensorId"] = sensorPresionId;
  lectura2["valor"] = pres;
  
  // Caudal
  JsonObject lectura3 = lecturas.createNestedObject();
  lectura3["sensorId"] = sensorCaudalId;
  lectura3["valor"] = caudal;
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.println("📤 Enviando múltiples lecturas...");
  int httpCode = http.POST(jsonString);
  
  if (httpCode == 201) {
    Serial.println("✅ Todas las lecturas enviadas correctamente");
  } else {
    Serial.printf("❌ Error HTTP: %d\n", httpCode);
  }
  
  http.end();
}



