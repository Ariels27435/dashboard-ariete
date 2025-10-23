# 🔒 BACKUP CONFIGURACIÓN FUNCIONAL - ARIETE HIDRÁULICO

**Fecha:** 16 de Octubre, 2025  
**Estado:** ✅ FUNCIONANDO CORRECTAMENTE  
**Última verificación:** Dashboard muestra datos del ESP32 (Humedad: 40%)  

---

## 📋 CONFIGURACIÓN ACTUAL QUE FUNCIONA

### **Backend (Render.com):**
- **URL:** https://backend-ariete.onrender.com
- **Servidor:** `server-ultra-simple.js` (SIN MongoDB)
- **Puerto:** 10000 (automático de Render)
- **Estado:** ✅ FUNCIONANDO

### **Frontend (Vercel):**
- **URL:** https://dashboard-ariete-ju4obxqbz-ariel-celico-lopez-de-leons-projects.vercel.app
- **Framework:** React + Vite
- **Estado:** ✅ FUNCIONANDO

### **Endpoints que funcionan:**
- ✅ `GET /api/health` - Verificación del servidor
- ✅ `GET /api/estado` - Datos del dashboard
- ✅ `POST /api/humedad` - Recibe datos de humedad
- ✅ `POST /api/flujo` - Recibe datos de flujo
- ✅ `POST /api/nivel` - Recibe datos de nivel

---

## 📱 CÓDIGO ESP32 QUE FUNCIONA

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <Ticker.h>

const char* ssid = "S23 Ultra de Ariels";
const char* pass = "54nsuwfq4e8ms77";
const char* serverURL = "https://backend-ariete.onrender.com";

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
    Serial.println("Enviado a " + url + ": " + json + " → Código: " + String(code));
  } else {
    Serial.println("WiFi no conectado");
  }
}

void enviarSensores() {
  // 🌫️ Humedad
  int valor = analogRead(pinHumedad);
  int humedad = map(valor, 4095, 0, 0, 100);
  humedad = constrain(humedad, 0, 100);
  enviarDato("/api/humedad", "{\"humedad\":" + String(humedad) + "}");

  // 💧 Flujo
  float flujo_Lmin = (contadorPulsos / 7.5);
  contadorPulsos = 0;
  enviarDato("/api/flujo", "{\"flujo\":" + String(flujo_Lmin) + "}");

  // 🛢️ Nivel
  int estado = digitalRead(pinNivel);
  int nivel = (estado == LOW) ? 0 : 100;
  enviarDato("/api/nivel", "{\"nivel\":" + String(nivel) + "}");
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
  
  timer.attach(5, enviarSensores);
}

void loop() {
  // Nada aquí, todo se maneja por interrupciones y temporizador
}
```

---

## 🛠️ CONFIGURACIÓN DEL BACKEND

### **Archivo: `backend/server-ultra-simple.js`**
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let datos = {
  humedad: 0,
  flujo: 0,
  nivel: 0
};

app.post('/api/humedad', (req, res) => {
  const { humedad, valor } = req.body;
  const valorHumedad = humedad !== undefined ? humedad : valor;
  datos.humedad = valorHumedad || 0;
  console.log(`🌫️ Humedad: ${datos.humedad}%`);
  res.json({ 
    message: 'Humedad recibida correctamente',
    valor: datos.humedad,
    unidad: '%'
  });
});

app.post('/api/flujo', (req, res) => {
  const { flujo, valor } = req.body;
  const valorFlujo = flujo !== undefined ? flujo : valor;
  datos.flujo = valorFlujo || 0;
  console.log(`💧 Flujo: ${datos.flujo} L/min`);
  res.json({ 
    message: 'Flujo recibido correctamente',
    valor: datos.flujo,
    unidad: 'L/min'
  });
});

app.post('/api/nivel', (req, res) => {
  const { nivel, valor } = req.body;
  const valorNivel = nivel !== undefined ? nivel : valor;
  datos.nivel = valorNivel || 0;
  console.log(`🛢️ Nivel: ${datos.nivel}%`);
  res.json({ 
    message: 'Nivel recibido correctamente',
    valor: datos.nivel,
    unidad: '%'
  });
});

app.get('/api/estado', (req, res) => {
  res.json({
    humedad: datos.humedad,
    flujo: datos.flujo,
    nivel: datos.nivel,
    timestamp: new Date()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Funcionando' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ULTRA-SIMPLE ejecutándose en puerto ${PORT}`);
  console.log(`🔥 Sistema ULTRA-SIMPLE activo - Sin MongoDB, datos en memoria`);
  console.log(`📊 Dashboard disponible en: http://localhost:${PORT}`);
  console.log(`✅ CORS configurado para permitir todos los orígenes`);
});
```

### **Archivo: `backend/package.json`**
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node backend/server-ultra-simple.js",
    "dev": "nodemon server-ultra-simple.js",
    "dev-mock": "nodemon server-mock.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

---

## 🚨 INSTRUCCIONES DE EMERGENCIA

### **Si algo se rompe en el futuro:**

1. **NO TOCAR** los archivos `server-ultra-simple.js` y `package.json`
2. **Usar este backup** para restaurar la configuración
3. **Verificar** que Render esté usando `server-ultra-simple.js`
4. **Probar** con el código ESP32 de este backup

### **Para agregar nuevas funcionalidades:**

1. **Crear una copia** de `server-ultra-simple.js` como `server-v2.js`
2. **Hacer cambios** en la copia
3. **Probar** antes de reemplazar el original
4. **Mantener** el original como respaldo

---

## 📊 ESTADO ACTUAL DEL SISTEMA

- ✅ **Backend funcionando:** https://backend-ariete.onrender.com
- ✅ **Frontend funcionando:** https://dashboard-ariete-ju4obxqbz-ariel-celico-lopez-de-leons-projects.vercel.app
- ✅ **ESP32 enviando datos:** Humedad detectada (40%)
- ✅ **Dashboard mostrando datos:** Actualización en tiempo real
- ✅ **Sin MongoDB requerido:** Sistema ultra-simple funcionando

---

**¡ESTA CONFIGURACIÓN ESTÁ FUNCIONANDO PERFECTAMENTE - NO LA CAMBIES!** 🔒



