# 🔌 Guía de Integración ESP32 con Dashboard

Esta guía te ayudará a conectar tu ESP32 al dashboard para que envíe datos reales de los sensores del ariete hidráulico.

---

## 📋 Requisitos

### Hardware:
- ✅ ESP32 (cualquier modelo)
- ✅ Sensores de tu ariete hidráulico:
  - Sensor de temperatura
  - Sensor de presión
  - Sensor de caudal
  - Sensor de nivel (opcional)
- ✅ Fuente de alimentación para el ESP32
- ✅ Cables y conexiones

### Software:
- ✅ Arduino IDE (con soporte para ESP32)
- ✅ Librería ArduinoJson (Instalar desde el Library Manager)
- ✅ Backend del dashboard ejecutándose

---

## 🚀 Paso 1: Configurar el Backend

### 1.1 Agregar Variable de Entorno

Edita tu archivo `backend/.env` y agrega:
```
ESP32_API_KEY=ariete-esp32-2025
```

💡 **Tip**: Cambia esto por una clave más segura en producción

### 1.2 Reiniciar el Backend

```bash
cd backend
npm run dev
```

### 1.3 Verificar que la API del ESP32 Funciona

Abre en tu navegador:
```
http://localhost:3001/api/esp32/ping
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "ESP32 API funcionando",
  "timestamp": "2025-10-11T...",
  "server": "Ariete Hidráulico v1.0"
}
```

✅ Si ves esto, ¡la API está lista!

---

## 🔍 Paso 2: Obtener los IDs de los Sensores

### Opción A: Desde el Navegador

Abre esta URL (reemplaza con tu API Key):
```
http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025
```

Verás algo como:
```json
{
  "sensores": [
    {
      "id": "67098abc123def456789",
      "nombre": "Sensor Temperatura Principal",
      "tipo": "temperatura",
      "unidad": "°C",
      "ubicacion": "Entrada del sistema"
    },
    {
      "id": "67098def456ghi789012",
      "nombre": "Sensor Presión 1",
      "tipo": "presion",
      "unidad": "bar",
      "ubicacion": "Tubería principal"
    }
  ]
}
```

**COPIA los IDs** de los sensores que quieres monitorear.

### Opción B: Desde MongoDB (si tienes acceso)

```javascript
// En MongoDB Compass o mongo shell
db.sensores.find({}, {nombre: 1, tipo: 1})
```

---

## 💻 Paso 3: Configurar el Código del ESP32

### 3.1 Abrir el Código

1. Abre `ESP32_CODIGO_EJEMPLO.ino` con Arduino IDE
2. Modifica estos valores:

```cpp
// Tu red WiFi
const char* ssid = "TU_RED_WIFI";
const char* password = "TU_PASSWORD_WIFI";

// URL del servidor
// Para desarrollo local, usa la IP de tu PC:
const char* serverUrl = "http://192.168.1.100:3001/api/esp32/lectura";

// API Key (debe coincidir con backend/.env)
const char* apiKey = "ariete-esp32-2025";

// IDs de sensores (obtenidos en el Paso 2)
const char* sensorTemperaturaId = "67098abc123def456789";
const char* sensorPresionId = "67098def456ghi789012";
const char* sensorCaudalId = "67098ghi789jkl012345";
```

### 3.2 Obtener la IP de tu PC

**Windows (PowerShell):**
```powershell
ipconfig
```
Busca "Dirección IPv4" en tu adaptador de red WiFi

**Linux/Mac:**
```bash
ifconfig
# o
ip addr show
```

Ejemplo de IP: `192.168.1.100`

### 3.3 Ajustar Funciones de Lectura de Sensores

El código incluye funciones de ejemplo que simulan lecturas. Debes reemplazarlas con el código real de tus sensores:

```cpp
float leerTemperatura() {
  // REEMPLAZA esto con tu sensor real
  // Ejemplo para DHT22:
  // return dht.readTemperature();
  
  // Ejemplo para DS18B20:
  // sensors.requestTemperatures();
  // return sensors.getTempCByIndex(0);
  
  // Por ahora usa simulación para pruebas
  return 20.0 + random(0, 1000) / 100.0;
}
```

---

## 📤 Paso 4: Subir el Código al ESP32

### 4.1 Instalar Librerías

En Arduino IDE:
1. `Sketch` → `Include Library` → `Manage Libraries`
2. Buscar e instalar:
   - **ArduinoJson** (by Benoit Blanchon)
   - **WiFi** (ya incluida con ESP32)

### 4.2 Configurar la Placa

1. `Tools` → `Board` → `ESP32 Arduino` → Selecciona tu modelo (ej: "ESP32 Dev Module")
2. `Tools` → `Port` → Selecciona el puerto COM de tu ESP32

### 4.3 Compilar y Subir

1. Click en ✓ (Verify) para compilar
2. Click en → (Upload) para subir al ESP32
3. Abre el Monitor Serie (`Tools` → `Serial Monitor`)
4. Configura la velocidad a **115200 baud**

---

## 📊 Paso 5: Verificar que los Datos Lleguen

### 5.1 Monitor Serie del ESP32

Deberías ver algo como:

```
============================================
Dashboard Ariete Hidráulico - ESP32
============================================

Conectando a WiFi: Mi_Red_WiFi
..........
✅ WiFi conectado!
IP: 192.168.1.105

--- Configuración ---
Servidor: http://192.168.1.100:3001/api/esp32/lectura
API Key: ariete-esp32-2025
---------------------

📊 Lecturas de Sensores:
  🌡️  Temperatura: 24.53 °C
  📈 Presión: 2.15 bar
  💧 Caudal: 62.34 L/min

📤 Enviando Temperatura: 24.53 °C ... ✅ OK
📤 Enviando Presión: 2.15 bar ... ✅ OK
📤 Enviando Caudal: 62.34 L/min ... ✅ OK
```

✅ Si ves "✅ OK", los datos se están enviando correctamente!

### 5.2 Logs del Backend

En la terminal donde corre el backend, verás:
```
POST /api/esp32/lectura 201 - 45.123 ms
POST /api/esp32/lectura 201 - 42.456 ms
POST /api/esp32/lectura 201 - 38.789 ms
```

El código `201` significa que las lecturas se guardaron exitosamente.

### 5.3 Ver Datos en el Dashboard

1. Abre el dashboard: http://localhost:5173
2. Inicia sesión: `admin@ariete.com` / `admin123`
3. En la página principal verás:
   - Las tarjetas de sensores con los **valores más recientes**
   - Gráficas que se actualizan automáticamente
   - Las lecturas del ESP32 aparecerán en tiempo real

### 5.4 Ver Datos en la Base de Datos

**Usando MongoDB Compass:**
```javascript
// Ver las últimas lecturas
db.lecturas.find().sort({timestamp: -1}).limit(10)

// Filtrar por sensor específico
db.lecturas.find({sensor: ObjectId("67098abc123def456789")})
```

**Usando la API:**
```
# Ver todas las lecturas de un sensor
http://localhost:3001/api/sensores/67098abc123def456789/lecturas

# Necesitas token JWT (obtenerlo del localStorage después de login)
```

---

## 🔍 Verificar que los Datos son Reales

### Método 1: Comparar con Mediciones Manuales

1. Toma una medición manual con un termómetro/manómetro
2. Compara con el valor en el dashboard
3. Si coinciden (±2%), ¡son datos reales! ✅

### Método 2: Prueba de Cambio

1. Provoca un cambio físico (ej: calentar el sensor de temperatura)
2. Observa si el dashboard refleja ese cambio
3. Si cambia acorde, ¡funcionan! ✅

### Método 3: Revisar Metadata

En MongoDB, las lecturas del ESP32 tienen metadata:
```json
{
  "valor": 24.53,
  "sensor": "...",
  "timestamp": "2025-10-11T...",
  "metadata": {
    "fuente": "ESP32",
    "dispositivo": "ESP32",
    "ip": "192.168.1.105",
    "rssi": -65
  }
}
```

Si ves `"fuente": "ESP32"`, esos datos vienen del ESP32 real.

---

## 🌐 Usar con Backend en la Nube (Producción)

Una vez que despliegues el backend en Render:

### Cambiar la URL en el ESP32:

```cpp
// ANTES (desarrollo local):
// const char* serverUrl = "http://192.168.1.100:3001/api/esp32/lectura";

// DESPUÉS (producción):
const char* serverUrl = "https://tu-backend.onrender.com/api/esp32/lectura";
```

⚠️ **IMPORTANTE**: 
- Cambia `http://` por `https://` en producción
- Puede que necesites agregar certificados SSL para HTTPS

---

## 📈 Endpoints Disponibles para el ESP32

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/esp32/ping` | Verificar conexión |
| `GET` | `/api/esp32/sensores` | Obtener lista de sensores |
| `POST` | `/api/esp32/lectura` | Enviar UNA lectura |
| `POST` | `/api/esp32/lecturas` | Enviar MÚLTIPLES lecturas |

### Ejemplo de JSON para una lectura:
```json
{
  "sensorId": "67098abc123def456789",
  "valor": 24.5,
  "unidad": "°C",
  "metadata": {
    "dispositivo": "ESP32",
    "ip": "192.168.1.105"
  }
}
```

### Ejemplo de JSON para múltiples lecturas:
```json
{
  "lecturas": [
    { "sensorId": "67098abc123def456789", "valor": 24.5 },
    { "sensorId": "67098def456ghi789012", "valor": 2.1 },
    { "sensorId": "67098ghi789jkl012345", "valor": 62.3 }
  ]
}
```

---

## ⚙️ Configuración Avanzada

### Cambiar Intervalo de Envío

```cpp
// En el código del ESP32
const unsigned long intervaloEnvio = 5000; // 5 segundos

// Prueba con:
// 1000 = 1 segundo (más datos, más tráfico)
// 10000 = 10 segundos
// 60000 = 1 minuto (ahorra ancho de banda)
```

### Envío por Lote (Más Eficiente)

En lugar de enviar cada lectura por separado, envía todas juntas:

```cpp
void loop() {
  if (millis() - ultimoEnvio >= intervaloEnvio) {
    float temp = leerTemperatura();
    float pres = leerPresion();
    float caudal = leerCaudal();
    
    // Enviar todas de una vez
    enviarMultiplesLecturas(temp, pres, caudal);
    
    ultimoEnvio = millis();
  }
}
```

### Modo Sleep para Ahorrar Energía

```cpp
#include <esp_sleep.h>

void modoSleep() {
  // Despertar cada 30 segundos
  esp_sleep_enable_timer_wakeup(30 * 1000000);
  
  // Leer y enviar datos
  // ...
  
  // Dormir
  esp_deep_sleep_start();
}
```

---

## ❌ Solución de Problemas

### Error: "API Key inválida"
**Causa**: La API Key del ESP32 no coincide con la del backend
**Solución**: Verifica que `ESP32_API_KEY` en `backend/.env` sea igual a `apiKey` en el ESP32

### Error: "Sensor no encontrado"
**Causa**: El ID del sensor no existe en la base de datos
**Solución**: 
1. Verifica los IDs con `/api/esp32/sensores`
2. Ejecuta `npm run init-data` en el backend para crear sensores de prueba

### Error: "WiFi desconectado"
**Causa**: Red WiFi inestable o fuera de rango
**Solución**: 
- Acerca el ESP32 al router
- Verifica SSID y contraseña
- Revisa que la red sea 2.4 GHz (ESP32 no soporta 5 GHz en algunos modelos)

### No se ven datos en el dashboard
**Causa**: Varias posibles
**Solución**:
1. Verifica que el ESP32 muestre "✅ OK" en el Monitor Serie
2. Verifica que el backend esté corriendo
3. Refresca el dashboard (F5)
4. Revisa la consola del navegador (F12) para errores

### Los datos no parecen reales
**Causa**: Estás usando las funciones de simulación
**Solución**: Reemplaza las funciones `leerTemperatura()`, `leerPresion()`, etc. con el código real de tus sensores

---

## 📚 Recursos Adicionales

### Librerías para Sensores Comunes:

- **Temperatura**:
  - DHT22: `DHT sensor library` by Adafruit
  - DS18B20: `DallasTemperature` by Miles Burton
  
- **Presión**:
  - BMP280: `Adafruit BMP280 Library`
  - MPX5700: Lectura analógica directa
  
- **Caudal**:
  - YF-S201: Contador de pulsos con interrupciones

### Ejemplos de Código:

Ver carpeta `ejemplos/` (crear si necesitas más ejemplos específicos)

---

## ✅ Checklist Final

- [ ] Backend configurado con `ESP32_API_KEY`
- [ ] IDs de sensores obtenidos
- [ ] Código del ESP32 configurado con WiFi y URL correcta
- [ ] Librerías instaladas (ArduinoJson)
- [ ] Código subido al ESP32
- [ ] Monitor Serie muestra "✅ OK"
- [ ] Dashboard muestra datos actualizados
- [ ] Datos corresponden con la realidad

---

**¡Felicidades! Tu ESP32 ahora envía datos reales al dashboard! 🎉🔌📊**



