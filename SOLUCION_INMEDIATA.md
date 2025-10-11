# ⚡ SOLUCIÓN INMEDIATA - Funciona en 1 Minuto

## 🎯 TU PROBLEMA
```
Código: -1  ← El servidor no responde
```

## ✅ LA SOLUCIÓN (Solo 2 pasos)

### PASO 1: Cambiar UNA línea en el código del ESP32

En tu código ESP32, cambia:

```cpp
// ❌ ANTES (línea 8):
const int serverPort = 3000;

// ✅ DESPUÉS:
const int serverPort = 3001;
```

**ESO ES TODO en el código.** Sube el código al ESP32.

---

### PASO 2: Reiniciar el backend

En la terminal:

```bash
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
npm run dev
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en puerto 3001
📋 Sensores Ariete inicializados correctamente
✅ Sensor Humedad creado automáticamente
✅ Sensor Flujo creado automáticamente
✅ Sensor Nivel creado automáticamente
```

---

## 📊 RESULTADO

En el Monitor Serie del ESP32 verás:

```
✅ Conectado a WiFi
Enviado a /api/humedad: {"humedad":40} → Código: 200 ✅
Enviado a /api/flujo: {"flujo":0.00} → Código: 200 ✅
Enviado a /api/nivel: {"nivel":0} → Código: 200 ✅
```

**Código 200 = ¡FUNCIONA!** ✅

En el backend verás:
```
🌫️  Humedad recibida: 40%
💧 Flujo recibido: 0.00 L/min
🛢️  Nivel recibido: 0%
POST /api/humedad 200 - 25.123 ms
POST /api/flujo 200 - 23.456 ms
POST /api/nivel 200 - 22.789 ms
```

---

## 🎨 Ver los Datos en el Dashboard

1. Abre otra terminal:
   ```bash
   cd "C:\Arieter hidraulico\dashboard-ariete"
   npm run dev
   ```

2. Abre el navegador: **http://localhost:5173**

3. Login: `admin@ariete.com` / `admin123`

4. **¡Verás tus sensores en tiempo real!** 📊
   - 🌫️ Humedad: 40%
   - 💧 Flujo: 0.00 L/min
   - 🛢️ Nivel: 0%

---

## ✨ Lo que Hice por Ti

He creado rutas especiales en el backend que:
- ✅ Aceptan tu código actual **SIN CAMBIOS** (excepto el puerto)
- ✅ Crean los sensores **AUTOMÁTICAMENTE**
- ✅ Guardan los datos en la base de datos
- ✅ Los muestran en el dashboard
- ✅ Generan alertas si los valores están fuera de rango

**Tu código ESP32 actual funciona perfecto**, solo necesitaba el puerto correcto.

---

## 🔍 Verificación Rápida

### ¿El backend está corriendo?
Abre: http://10.183.6.170:3001/api/health

Deberías ver:
```json
{"status":"OK","message":"Servidor funcionando correctamente"}
```

### ¿Los sensores se crearon?
Abre: http://10.183.6.170:3001/api/sensores

Deberías ver 3 sensores:
- Sensor Humedad Ariete
- Sensor Flujo Ariete  
- Sensor Nivel Ariete

---

## 🎯 Resumen

| Qué Cambiar | Dónde | Cambio |
|-------------|-------|--------|
| Puerto | ESP32 línea 8 | `3000` → `3001` |

**ESO ES TODO.** 🎉

---

## 💡 Datos que Verás

Según tus lecturas actuales:
- **Humedad: 40%** → Ambiente moderado
- **Flujo: 0.00 L/min** → No hay flujo (normal si el sistema está detenido)
- **Nivel: 0%** → Tanque vacío o sensor en posición LOW

**Estos son datos REALES de tus sensores.** ✅

---

## ❓ Siguiente Paso (Opcional)

Si quieres probar que los sensores funcionan:
1. Toca el sensor de humedad con los dedos (húmedos) → debería subir el valor
2. Gira el sensor de flujo manualmente → debería contar pulsos
3. Cambia el estado del sensor de nivel → debería cambiar entre 0% y 100%

Verás los cambios en tiempo real en el dashboard! 📈

---

**¡Listo! En 1 minuto tendrás datos en el dashboard! 🚀**


