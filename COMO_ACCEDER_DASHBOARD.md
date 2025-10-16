# 🚀 Cómo Acceder al Dashboard - Guía Paso a Paso

## 🖥️ Acceso Local (En tu PC)

### Paso 1: Iniciar MongoDB
Asegúrate de que MongoDB esté corriendo en tu PC.

### Paso 2: Iniciar el Backend
Abre una terminal y ejecuta:
```bash
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
npm run dev
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en puerto 3001
```

### Paso 3: Iniciar el Frontend
Abre **OTRA terminal** (deja la anterior abierta) y ejecuta:
```bash
cd "C:\Arieter hidraulico\dashboard-ariete"
npm run dev
```

Verás algo como:
```
  VITE v5.x.x  ready in 500 ms
  
  ➜  Local:   http://localhost:5173/
```

### Paso 4: Abrir el Dashboard
1. Abre tu navegador (Chrome, Firefox, Edge)
2. Ve a: **http://localhost:5173**
3. Verás la pantalla de login

### Paso 5: Iniciar Sesión
Usa estas credenciales de prueba:

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin@ariete.com` | `admin123` | Administrador |
| `juan.perez@ariete.com` | `operador123` | Operador |
| `maria.garcia@ariete.com` | `supervisor123` | Supervisor |

---

## 🌐 Acceso Global (Desde Cualquier PC)

Una vez que hayas seguido la **GUIA_DESPLIEGUE.md**, tu app estará en:
- **Dashboard**: `https://tu-proyecto.vercel.app`
- Usa las mismas credenciales

---

## ✅ Verificar que Todo Funciona

### 1. Backend Funcionando
Abre en tu navegador: **http://localhost:3001/api/health**

Deberías ver:
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2025-10-11T..."
}
```

### 2. Frontend Funcionando
Si ves la página de login, ¡está funcionando! ✅

### 3. Datos Cargados
Después de iniciar sesión, deberías ver:
- Sensores activos
- Gráficas con datos
- Alertas (si las hay)

Si **NO ves datos**, ejecuta el script de inicialización:
```bash
cd backend
npm run init-data
```

---

## 🔍 Ver los Datos en Tiempo Real

### Opción 1: En el Dashboard
1. Inicia sesión
2. Ve a la página principal (Dashboard)
3. Verás las tarjetas de sensores con los últimos valores

### Opción 2: Desde la API (Para Desarrolladores)
```bash
# Ver todos los sensores
http://localhost:3001/api/sensores

# Ver lecturas de un sensor específico
http://localhost:3001/api/sensores/[ID_DEL_SENSOR]/lecturas
```

⚠️ **Nota**: Necesitas estar autenticado (con token JWT)

---

## 🛠️ Atajos Rápidos

### Usando los archivos .bat (Windows):

1. **iniciar-dashboard.bat** - Inicia backend y frontend automáticamente
2. **iniciar-mock.bat** - Inicia con datos simulados

Haz doble clic en cualquiera de estos archivos.

---

## 📱 Verificar que los Datos del ESP32 Lleguen

Ver la guía: **INTEGRACION_ESP32.md**

---

## ❌ Problemas Comunes

### "Cannot GET /"
**Problema**: El frontend no está iniciado
**Solución**: Ejecuta `npm run dev` en la carpeta raíz

### "Network Error" o "Failed to fetch"
**Problema**: El backend no está iniciado
**Solución**: Ejecuta `npm run dev` en la carpeta backend

### "Error conectando a MongoDB"
**Problema**: MongoDB no está ejecutándose
**Solución**: 
- Windows: Inicia el servicio de MongoDB
- O usa MongoDB Atlas (en la nube)

### Página en blanco después del login
**Problema**: No hay datos en la base de datos
**Solución**: 
```bash
cd backend
npm run init-data
```

### "Invalid credentials"
**Problema**: Usuario o contraseña incorrectos
**Solución**: Usa las credenciales correctas (ver Paso 5)

---

## 🎯 Resumen Rápido

```bash
# Terminal 1 - Backend
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
npm run dev

# Terminal 2 - Frontend (otra terminal)
cd "C:\Arieter hidraulico\dashboard-ariete"
npm run dev

# Navegador
http://localhost:5173

# Login
admin@ariete.com / admin123
```

---

**¡Listo! Ya puedes ver tu dashboard funcionando! 📊✨**





