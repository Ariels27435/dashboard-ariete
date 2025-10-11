# 🚀 Guía de Despliegue a la Nube

## 📋 RESUMEN
Para desplegar el dashboard del Ariete y que sea accesible desde cualquier parte del mundo, necesitas:

1. **Frontend** → Vercel (gratis)
2. **Backend** → Render (gratis) 
3. **Base de datos** → MongoDB Atlas (gratis)

---

## 🌐 PASO 1: DESPLEGAR FRONTEND EN VERCEL

### 1.1 Preparar el proyecto
```bash
cd "C:\Arieter hidraulico\dashboard-ariete"
npm run build
```

### 1.2 Subir a GitHub
1. Ve a [GitHub.com](https://github.com)
2. Crea un nuevo repositorio: `dashboard-ariete`
3. Sube todos los archivos del proyecto

### 1.3 Desplegar en Vercel
1. Ve a [Vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Importa tu repositorio `dashboard-ariete`
5. En "Environment Variables", agrega:
   - `VITE_API_URL` = `https://tu-backend-en-render.onrender.com`
6. Haz clic en "Deploy"

---

## ⚙️ PASO 2: DESPLEGAR BACKEND EN RENDER

### 2.1 Preparar el backend
```bash
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
```

### 2.2 Subir a GitHub
1. Crea un nuevo repositorio: `dashboard-ariete-backend`
2. Sube todos los archivos de la carpeta `backend`

### 2.3 Desplegar en Render
1. Ve a [Render.com](https://render.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New +" → "Web Service"
4. Conecta tu repositorio `dashboard-ariete-backend`
5. Configuración:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. En "Environment Variables", agrega:
   - `MONGODB_URI` = `tu-url-de-mongodb-atlas`
   - `JWT_SECRET` = `tu-jwt-secret`
   - `CORS_ORIGIN` = `https://tu-frontend-en-vercel.vercel.app`
   - `ESP32_API_KEY` = `ariete-esp32-2025`
7. Haz clic en "Create Web Service"

---

## 🗄️ PASO 3: CONFIGURAR MONGODB ATLAS

### 3.1 Crear cuenta
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (gratis)

### 3.2 Configurar acceso
1. Ve a "Database Access"
2. Agrega un usuario con permisos de lectura/escritura
3. Ve a "Network Access"
4. Agrega `0.0.0.0/0` para permitir acceso desde cualquier IP

### 3.3 Obtener URL de conexión
1. Ve a "Database" → "Connect"
2. Selecciona "Connect your application"
3. Copia la URL de conexión
4. Reemplaza `<password>` con la contraseña del usuario

---

## 🔗 PASO 4: CONFIGURAR ESP32

### 4.1 Actualizar IP del servidor
En tu código del ESP32, cambia:
```cpp
const char* serverIP = "10.100.56.170"; // IP local
```

Por la URL de Render:
```cpp
const char* serverIP = "tu-backend-en-render.onrender.com";
const int serverPort = 443; // HTTPS
```

### 4.2 Actualizar rutas HTTPS
```cpp
void enviarDato(String ruta, String json) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "https://" + String(serverIP) + ruta; // HTTPS
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    int code = http.POST(json);
    http.end();
    Serial.println("Enviado a " + ruta + ": " + json + " → Código: " + String(code));
  }
}
```

---

## 🎯 RESULTADO FINAL

Una vez completado, tendrás:

- **Dashboard**: `https://tu-proyecto.vercel.app` (accesible desde cualquier lugar)
- **Backend**: `https://tu-backend.onrender.com` (API funcionando)
- **ESP32**: Enviando datos a la nube en tiempo real

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurado correctamente en Vercel
- Asegúrate de que el backend esté desplegado en Render

### Backend no se conecta a MongoDB
- Verifica que `MONGODB_URI` esté correcto
- Asegúrate de que la IP `0.0.0.0/0` esté permitida en MongoDB Atlas

### ESP32 no puede enviar datos
- Verifica que esté usando HTTPS (puerto 443)
- Asegúrate de que la URL del backend sea correcta

---

¡Con esto tendrás tu dashboard del Ariete funcionando en la nube! 🌐✨

