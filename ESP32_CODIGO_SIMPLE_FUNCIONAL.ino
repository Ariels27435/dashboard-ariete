/*
 * ESP32 - Ariete Hidráulico
 * CÓDIGO SIMPLE PARA FUNCIONAR CON EL SISTEMA ACTUAL
 * Compatible con server-simple.js (sin MongoDB)
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <Ticker.h>

// ============ CONFIGURACIÓN WiFi ============
const char* ssid = "S23 Ultra de Ariels";
const char* pass = "54nsuwfq4e8ms77";

// ============ CONFIGURACIÓN SERVIDOR ============
// ⚠️ CAMBIA ESTA URL por la de tu servidor en Render
const char* serverURL = "https://backend-ariete.onrender.com";

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
void enviarDato(String endpoint, String json) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi no conectado");
    return;
  }

  HTTPClient http;
  String url = serverURL + endpoint;
  
  Serial.print("📤 Enviando a " + endpoint + ": " + json + " ... ");
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int code = http.POST(json);
  String response = http.getString();
  http.end();
  
  if (code == 200) {
    Serial.println("✅ OK");
  } else {
    Serial.println("❌ Error " + String(code));
    Serial.println("   Respuesta: " + response);
  }
}

// ============ FUNCIÓN PARA LEER Y ENVIAR SENSORES ============
void enviarSensores() {
  Serial.println("\n📊 ============ Leyendo Sensores ============");
  
  // 🌫️ HUMEDAD
  int valorADC = analogRead(pinHumedad);
  int humedad = map(valorADC, 4095, 0, 0, 100);
  humedad = constrain(humedad, 0, 100);
  Serial.println("🌫️  Humedad ADC: " + String(valorADC) + " → " + String(humedad) + "%");
  enviarDato("/api/humedad", "{\"humedad\":" + String(humedad) + "}");
  delay(500);
  
  // 💧 FLUJO
  float flujo_Lmin = (contadorPulsos / 7.5);
  Serial.println("💧 Pulsos: " + String(contadorPulsos) + " → Flujo: " + String(flujo_Lmin, 2) + " L/min");
  contadorPulsos = 0;
  enviarDato("/api/flujo", "{\"flujo\":" + String(flujo_Lmin, 2) + "}");
  delay(500);
  
  // 🛢️ NIVEL
  int estado = digitalRead(pinNivel);
  int nivel = (estado == LOW) ? 0 : 100;
  Serial.println("🛢️  Pin " + String(pinNivel) + ": " + String(estado) + " → Nivel: " + String(nivel) + "%");
  enviarDato("/api/nivel", "{\"nivel\":" + String(nivel) + "}");
  
  Serial.println("============================================\n");
}

// ============ FUNCIÓN PARA VERIFICAR CONEXIÓN ============
void verificarConexion() {
  Serial.println("\n🔍 Verificando conexión con el servidor...");
  
  HTTPClient http;
  String url = serverURL + "/api/health";
  
  http.begin(url);
  int code = http.GET();
  
  if (code == 200) {
    String response = http.getString();
    Serial.println("✅ Servidor accesible:");
    Serial.println(response);
  } else if (code == -1) {
    Serial.println("❌ No se puede conectar al servidor");
    Serial.println("   Verifica que Render esté desplegado correctamente");
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
  Serial.println("   Sistema Simple (Sin MongoDB)");
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
  Serial.println("   Servidor: " + String(serverURL));
  Serial.println("   Intervalo: 5 segundos");
  
  // Verificar conexión con servidor
  delay(1000);
  verificarConexion();
  
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
