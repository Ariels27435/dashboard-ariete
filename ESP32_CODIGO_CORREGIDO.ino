#include <WiFi.h>
#include <HTTPClient.h>
#include <Ticker.h>

const char* ssid = "S23 Ultra de Ariels";
const char* pass = "54nsuwfq4e8ms77";
const char* serverURL = "https://backend-ariete.onrender.com"; // ← URL correcta de Render

const int pinHumedad = 34;
const int pinFlujo = 27;
const int pinNivel = 33;

Ticker timer;
volatile int contadorPulsos = 0;

void IRAM_ATTR contarPulso() {
  contadorPulsos++;
}

void enviarDato(String ruta, String json) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = serverURL + ruta;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    int code = http.POST(json);
    http.end();
    Serial.println("Enviado a " + ruta + ": " + json + " → Código: " + String(code));
  } else {
    Serial.println("WiFi no conectado");
  }
}

void enviarSensores() {
  // 🌫️ Humedad
  int valor = analogRead(pinHumedad);
  int humedad = map(valor, 4095, 0, 0, 100);
  humedad = constrain(humedad, 0, 100);
  enviarDato("/api/humedad", "{\"valor\":" + String(humedad) + "}");

  // 💧 Flujo
  float flujo_Lmin = (contadorPulsos / 7.5);
  contadorPulsos = 0;
  enviarDato("/api/flujo", "{\"valor\":" + String(flujo_Lmin) + "}");

  // 🛢️ Nivel
  int estado = digitalRead(pinNivel);
  int nivel = (estado == LOW) ? 0 : 100;
  enviarDato("/api/nivel", "{\"valor\":" + String(nivel) + "}");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Conectado a WiFi");
  
  pinMode(pinFlujo, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(pinFlujo), contarPulso, FALLING);
  pinMode(pinNivel, INPUT_PULLUP);
  
  // ⏱️ Ejecutar cada 5 segundos
  timer.attach(5, enviarSensores);
}

void loop() {
  // Nada aquí, todo se maneja por interrupciones y temporizador
}

