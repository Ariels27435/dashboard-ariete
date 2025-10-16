# ⚡ Solución Rápida - Error Código -1 ESP32

## 🔴 Tu Problema

Tu ESP32 está enviando:
```
Enviado a /api/humedad: {"humedad":40} → Código: -1
Enviado a /api/flujo: {"flujo":0.00} → Código: -1
Enviado a /api/nivel: {"nivel":0} → Código: -1
```

**Código -1 = El servidor no responde** (conexión fallida)

---

## ✅ SOLUCIÓN EN 5 PASOS

### PASO 1: Cambiar el Puerto (3000 → 3001)

Tu código usa puerto **3000** pero el backend del dashboard está en **3001**.

**En tu código ESP32, cambia:**
```cpp
// ❌ ANTES (incorrecto):
const int serverPort = 3000;

// ✅ DESPUÉS (correcto):
const int serverPort = 3001;
```

---

### PASO 2: Verificar que el Backend Esté Ejecutándose

Abre una terminal en Windows:
```bash
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
npm run dev
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en puerto 3001
```

Si ves esto, ¡el backend está funcionando! ✅

---

### PASO 3: Crear los Sensores en la Base de Datos

Abre **OTRA terminal** (deja la anterior ejecutándose):
```bash
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
npm run init-ariete
```

Este script creará 3 sensores:
- Sensor Humedad Ariete
- Sensor Flujo Ariete  
- Sensor Nivel Ariete

Y te mostrará los **IDs** que necesitas copiar. Ejemplo:
```
String sensorHumedadId = "67098abc123def456789";
String sensorFlujoId = "67098def456ghi789012";
String sensorNivelId = "67098ghi789jkl012345";
```

**COPIA ESOS IDs** ⚠️

---

### PASO 4: Usar el Nuevo Código ESP32

1. Abre el archivo: `ESP32_CODIGO_ARIETE.ino`
2. **PEGA los IDs** que copiaste del paso anterior (líneas 19-21):

```cpp
String sensorHumedadId = "67098abc123def456789"; // ← Pega tu ID real aquí
String sensorFlujoId = "67098def456ghi789012";   // ← Pega tu ID real aquí
String sensorNivelId = "67098ghi789jkl012345";   // ← Pega tu ID real aquí
```

3. Verifica que el puerto sea **3001**:
```cpp
const int serverPort = 3001; // ✅ Debe ser 3001
```

4. Sube el código al ESP32

---

### PASO 5: Verificar que Funcione

Abre el **Monitor Serie** (115200 baud) y deberías ver:

```
================================================
   ESP32 - ARIETE HIDRÁULICO
   Dashboard Integration v2.0
================================================

📶 Conectando a WiFi: S23 Ultra de Ariels
....
✅ WiFi conectado!
   IP ESP32: 192.168.1.105

✅ Servidor accesible:
{"status":"OK","message":"ESP32 API funcionando"}

📊 ============ Leyendo Sensores ============
🌫️  Humedad ADC: 2048 → 40%
📤 Enviando Humedad: 40 % ... ✅ OK

💧 Pulsos: 0 → Flujo: 0.00 L/min
📤 Enviando Flujo: 0.00 L/min ... ✅ OK

🛢️  Pin 33: 0 → Nivel: 0%
📤 Enviando Nivel: 0 % ... ✅ OK
============================================
```

**Si ves "✅ OK"**, ¡funciona perfectamente! 🎉

---

## 🔍 Verificación Adicional

### Ver Datos en el Dashboard

1. Abre: http://localhost:5173
2. Login: `admin@ariete.com` / `admin123`
3. Verás los sensores con datos actualizados cada 5 segundos

### Ver Datos en la API

Abre en tu navegador:
```
http://10.183.6.170:3001/api/esp32/sensores?api_key=ariete-esp32-2025
```

Deberías ver tus 3 sensores listados.

---

## ❌ Si Aún Tienes Problemas

### Problema: "Servidor no responde"

**Solución:**
1. Verifica la IP de tu PC:
   ```powershell
   ipconfig
   ```
   Busca "Dirección IPv4" (ej: 192.168.1.100)

2. En el código ESP32, actualiza la IP:
   ```cpp
   const char* serverIP = "TU_IP_REAL_AQUI";
   ```

### Problema: "API Key inválida"

**Solución:**
Crea o edita el archivo `backend/.env` y agrega:
```
ESP32_API_KEY=ariete-esp32-2025
```

Reinicia el backend después de esto.

### Problema: "Sensor no encontrado"

**Solución:**
Ejecuta de nuevo:
```bash
npm run init-ariete
```

Y copia los IDs correctos al código ESP32.

---

## 📊 Resumen de Cambios Necesarios

| Qué Cambiar | Valor Anterior | Valor Correcto |
|-------------|---------------|----------------|
| Puerto | `3000` | `3001` |
| Ruta | `/api/humedad` | `/api/esp32/lectura` |
| Formato | `{"humedad":40}` | `{"sensorId":"...", "valor":40}` |
| Autenticación | Ninguna | API Key en header |

---

## 🎯 Checklist

- [ ] Backend ejecutándose en puerto 3001
- [ ] Sensores creados con `npm run init-ariete`
- [ ] IDs copiados al código ESP32
- [ ] Código `ESP32_CODIGO_ARIETE.ino` subido al ESP32
- [ ] Monitor Serie muestra "✅ OK"
- [ ] Dashboard muestra los datos

---

**¡Con estos cambios, tu ESP32 debería funcionar perfectamente! 🚀📊**

Si sigues teniendo problemas, revisa:
- Que no haya un firewall bloqueando el puerto 3001
- Que el ESP32 y tu PC estén en la misma red WiFi
- Los logs del backend para ver errores





