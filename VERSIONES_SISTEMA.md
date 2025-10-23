# 📊 CONTROL DE VERSIONES - SISTEMA ARIETE HIDRÁULICO

## 🎯 VERSIÓN ACTUAL: v1.0-FUNCIONAL

**Fecha:** 16 de Octubre, 2025  
**Estado:** ✅ FUNCIONANDO PERFECTAMENTE  
**Descripción:** Sistema básico sin MongoDB, datos en memoria  

### **Características:**
- ✅ ESP32 enviando datos correctamente
- ✅ Dashboard mostrando datos en tiempo real
- ✅ Backend ultra-simple funcionando
- ✅ Sin dependencias de MongoDB
- ✅ Desplegado en Render + Vercel

### **Archivos clave:**
- `backend/server-ultra-simple.js` ← **NO TOCAR**
- `backend/package.json` ← **NO TOCAR**
- Código ESP32 funcional ← **RESPALDAR**

---

## 📋 HISTORIAL DE VERSIONES

### **v1.0-FUNCIONAL** (16/10/2025) ✅
- **Estado:** FUNCIONANDO
- **Cambios:** Sistema ultra-simple sin MongoDB
- **Resultado:** Dashboard muestra datos del ESP32
- **Backup:** `BACKUP_CONFIGURACION_FUNCIONAL.md`

### **v0.9-EXPERIMENTAL** (16/10/2025) ❌
- **Estado:** FALLÓ
- **Problema:** Servidor con MongoDB no conectaba
- **Lección:** Sistema simple funciona mejor

### **v0.8-INICIAL** (15/10/2025) ❌
- **Estado:** FALLÓ
- **Problema:** Configuración compleja innecesaria

---

## 🚨 REGLAS DE VERSIONADO

### **ANTES de hacer cambios:**
1. ✅ **HACER BACKUP** de la versión actual
2. ✅ **CREAR NUEVA VERSIÓN** (v1.1, v1.2, etc.)
3. ✅ **PROBAR** antes de reemplazar
4. ✅ **DOCUMENTAR** todos los cambios

### **ESTRUCTURA de versiones:**
```
v1.0-FUNCIONAL    ← VERSIÓN ESTABLE (actual)
v1.1-NUEVA-FEAT   ← Nueva funcionalidad
v1.2-BUGFIX       ← Corrección de errores
v2.0-MAJOR        ← Cambio mayor
```

### **NOMBRES de archivos:**
```
server-ultra-simple.js     ← VERSIÓN ESTABLE
server-v1.1-nueva-feat.js  ← Nueva versión
server-v1.2-bugfix.js      ← Corrección
```

---

## 🛠️ PROCESO PARA AGREGAR FUNCIONALIDADES

### **Paso 1: Preparación**
```bash
# 1. Hacer backup completo
CAMBIOS_SEGUROS.bat → Opción 1

# 2. Crear nueva versión
CAMBIOS_SEGUROS.bat → Opción 2
```

### **Paso 2: Desarrollo**
```bash
# 1. Modificar server-v1.1-nueva-feat.js
# 2. NO tocar server-ultra-simple.js
# 3. Probar localmente si es posible
```

### **Paso 3: Pruebas**
```bash
# 1. Cambiar package.json temporalmente
"start": "node backend/server-v1.1-nueva-feat.js"

# 2. Hacer commit y push
git add .
git commit -m "FEAT: Nueva funcionalidad v1.1"
git push origin main

# 3. Probar en Render (2-3 minutos)
# 4. Verificar que todo funciona
```

### **Paso 4: Aplicación**
```bash
# Si funciona:
# 1. Renombrar server-v1.1-nueva-feat.js → server-ultra-simple.js
# 2. Actualizar package.json
# 3. Hacer commit final

# Si NO funciona:
# 1. Restaurar desde backup
# 2. Analizar el problema
# 3. Corregir y repetir
```

---

## 🔒 ARCHIVOS PROTEGIDOS

### **NUNCA MODIFICAR DIRECTAMENTE:**
- ❌ `backend/server-ultra-simple.js`
- ❌ `backend/package.json` (scripts de start)

### **SIEMPRE HACER BACKUP:**
- ✅ Código ESP32 funcional
- ✅ Configuración de WiFi
- ✅ URLs del sistema

---

## 📱 CÓDIGO ESP32 ESTABLE

### **Versión v1.0-FUNCIONAL:**
```cpp
const char* serverURL = "https://backend-ariete.onrender.com";
// Resto del código en BACKUP_CONFIGURACION_FUNCIONAL.md
```

### **Si cambias URLs:**
1. Actualizar `serverURL` en ESP32
2. Verificar que el endpoint existe
3. Probar antes de desplegar

---

## 🆘 RECUPERACIÓN DE EMERGENCIAS

### **Si el sistema se rompe:**
1. **Ejecutar:** `RESTAURAR_CONFIGURACION.bat`
2. **Esperar:** 2-3 minutos para deploy
3. **Verificar:** Dashboard funcionando
4. **Probar:** ESP32 enviando datos

### **Si no tienes backups:**
1. **Usar:** `BACKUP_CONFIGURACION_FUNCIONAL.md`
2. **Copiar:** Código del backup
3. **Restaurar:** Archivos manualmente
4. **Verificar:** Que funciona antes de continuar

---

## 📊 MÉTRICAS DE ÉXITO

### **Sistema funcionando correctamente:**
- ✅ Dashboard muestra datos > 0
- ✅ ESP32 envía datos cada 5 segundos
- ✅ Backend responde códigos 200
- ✅ Sin errores en logs de Render

### **Sistema roto:**
- ❌ Dashboard muestra solo 0s
- ❌ ESP32 no puede conectar
- ❌ Backend devuelve errores
- ❌ Logs muestran fallos

---

**¡MANTÉN ESTA CONFIGURACIÓN FUNCIONAL SIEMPRE PROTEGIDA!** 🔒



