# ⚡ Instrucciones Rápidas - Hacer tu App Visible en Internet

## 🎯 Objetivo
Hacer que tu Dashboard del Ariete Hidráulico sea accesible desde cualquier computadora en el mundo, no solo desde tu PC local.

## 📝 Lo que necesitas (TODO GRATIS)

1. **Cuenta en GitHub** ✅ (ya la tienes)
2. **Cuenta en Vercel** → [vercel.com](https://vercel.com) (regístrate con GitHub)
3. **Cuenta en Render** → [render.com](https://render.com) (regístrate con GitHub)
4. **Cuenta en MongoDB Atlas** → [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

---

## 🚀 Pasos Principales

### 📦 PASO 1: Base de Datos (MongoDB Atlas)
**Tiempo estimado: 10 minutos**

1. Entra a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster GRATUITO (M0)
3. Crea un usuario de base de datos
4. Permite acceso desde cualquier IP (0.0.0.0/0)
5. Obtén tu **connection string** (la URL de conexión)
   - Se ve así: `mongodb+srv://usuario:password@cluster.mongodb.net/ariete_db`

---

### 🖥️ PASO 2: Backend (Render)
**Tiempo estimado: 15 minutos**

#### 2.1 Preparar el código
En tu terminal:
```bash
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
git init
git add .
git commit -m "Backend listo para despliegue"
```

#### 2.2 Subir a GitHub
1. Crea un nuevo repositorio en GitHub llamado `ariete-backend`
2. Ejecuta:
```bash
git remote add origin https://github.com/TU-USUARIO/ariete-backend.git
git branch -M main
git push -u origin main
```

#### 2.3 Desplegar en Render
1. Entra a [Render](https://render.com)
2. Click en **New +** → **Web Service**
3. Conecta tu repo `ariete-backend`
4. Configuración:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Agrega estas variables de entorno**:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
   - `MONGODB_URI` = (pega tu connection string de MongoDB Atlas)
   - `JWT_SECRET` = (genera uno ejecutando en tu terminal: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
   - `CORS_ORIGIN` = (lo agregarás después, déjalo vacío por ahora)

6. Click en **Create Web Service** y espera 5 minutos
7. **COPIA LA URL** que te da Render (ej: `https://ariete-backend.onrender.com`)

---

### 🌐 PASO 3: Frontend (Vercel)
**Tiempo estimado: 10 minutos**

#### 3.1 Crear archivo de configuración
1. Crea un archivo llamado `.env.production` en la carpeta `dashboard-ariete` con:
```
VITE_API_URL=https://TU-BACKEND-DE-RENDER.onrender.com/api
```
⚠️ Reemplaza con tu URL real de Render

#### 3.2 Subir cambios a GitHub
```bash
cd "C:\Arieter hidraulico\dashboard-ariete"
git add .
git commit -m "Configurado para producción"
git push origin main
```

#### 3.3 Desplegar en Vercel
1. Entra a [Vercel](https://vercel.com)
2. Click en **Add New...** → **Project**
3. Selecciona tu repositorio `dashboard-ariete`
4. Configuración:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Agrega esta variable de entorno**:
   - `VITE_API_URL` = `https://TU-BACKEND-DE-RENDER.onrender.com/api`

6. Click en **Deploy** y espera 3 minutos
7. **COPIA LA URL** que te da Vercel (ej: `https://dashboard-ariete.vercel.app`)

---

### 🔗 PASO 4: Conectar Todo
**Tiempo estimado: 5 minutos**

#### 4.1 Actualizar CORS en el Backend
1. Vuelve a Render
2. Ve a tu servicio de backend → **Environment**
3. Edita `CORS_ORIGIN` y pon la URL de Vercel:
   ```
   https://dashboard-ariete.vercel.app
   ```
4. Click en **Save Changes**

#### 4.2 Probar que todo funciona
1. Abre en tu navegador: `https://TU-BACKEND.onrender.com/api/health`
   - Deberías ver: `{"status": "OK", ...}`
2. Abre tu app: `https://dashboard-ariete.vercel.app`
3. Intenta hacer login con: `admin@ariete.com` / `admin123`

---

## ✅ ¡Listo!

Si todo funcionó, **¡FELICIDADES!** 🎉

Tu aplicación ahora está en internet y puedes acceder desde cualquier dispositivo.

### URLs de tu app:
- **Tu Dashboard**: `https://dashboard-ariete.vercel.app`
- **Tu API**: `https://ariete-backend.onrender.com`

---

## 🆘 Problemas Comunes

### ❌ "Error de CORS"
**Solución**: Verifica que la URL en `CORS_ORIGIN` (Render) sea exactamente igual a la URL de Vercel

### ❌ "Cannot connect to backend"
**Solución**: Verifica que `VITE_API_URL` en Vercel tenga la URL correcta del backend y termine en `/api`

### ❌ "Error conectando a MongoDB"
**Solución**: 
- Verifica que la contraseña en el connection string sea correcta
- Asegúrate de permitir acceso desde cualquier IP en MongoDB Atlas

### ❌ El backend se apaga
**Solución**: Es normal en el plan gratuito de Render. Se reactiva automáticamente cuando alguien entra (tarda 30-60 segundos la primera vez)

---

## 📖 Guía Completa

Si necesitas más detalles o tienes problemas, consulta la guía completa:
👉 **[GUIA_DESPLIEGUE.md](./GUIA_DESPLIEGUE.md)**

---

## 🔄 Para Actualizar tu App

### Actualizar Frontend:
```bash
cd "C:\Arieter hidraulico\dashboard-ariete"
git add .
git commit -m "Descripción de cambios"
git push origin main
```
Vercel lo desplegará automáticamente en 2-3 minutos.

### Actualizar Backend:
```bash
cd "C:\Arieter hidraulico\dashboard-ariete\backend"
git add .
git commit -m "Descripción de cambios"
git push origin main
```
Render lo desplegará automáticamente en 3-5 minutos.

---

**¡Tu proyecto ahora está en la nube! 🚀☁️**








