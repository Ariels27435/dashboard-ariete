# 🚀 Guía de Despliegue - Dashboard Ariete Hidráulico

Esta guía te ayudará a desplegar tu aplicación en la web para que sea accesible globalmente.

## 📋 Requisitos Previos

1. Cuenta en [GitHub](https://github.com) (ya la tienes ✅)
2. Cuenta en [Vercel](https://vercel.com) - Para el frontend (GRATIS)
3. Cuenta en [Render](https://render.com) - Para el backend (GRATIS)
4. Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Para la base de datos (GRATIS)

---

## 🗄️ PASO 1: Configurar MongoDB Atlas

### 1.1 Crear Base de Datos en la Nube

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Inicia sesión o crea una cuenta gratuita
3. Crea un nuevo cluster (selecciona el plan GRATUITO M0)
4. Espera a que el cluster se cree (puede tardar 3-5 minutos)

### 1.2 Configurar Acceso

1. Ve a **Database Access** (en el menú lateral)
2. Click en **Add New Database User**
   - Username: `ariete_user` (o el que prefieras)
   - Password: Genera una contraseña segura (guárdala, la necesitarás)
   - Database User Privileges: `Read and write to any database`
3. Click en **Add User**

### 1.3 Configurar Network Access

1. Ve a **Network Access** (en el menú lateral)
2. Click en **Add IP Address**
3. Click en **Allow Access from Anywhere** (0.0.0.0/0)
4. Click en **Confirm**

### 1.4 Obtener Connection String

1. Ve a **Database** (en el menú lateral)
2. Click en **Connect** en tu cluster
3. Selecciona **Connect your application**
4. Copia la connection string, se verá así:
   ```
   mongodb+srv://ariete_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANTE**: Reemplaza `<password>` con la contraseña real del usuario que creaste
6. Agrega el nombre de la base de datos antes del `?`:
   ```
   mongodb+srv://ariete_user:tu_password@cluster0.xxxxx.mongodb.net/ariete_db?retryWrites=true&w=majority
   ```

---

## 🖥️ PASO 2: Desplegar el Backend en Render

### 2.1 Preparar Repositorio

1. Abre una terminal en la carpeta `backend`
2. Si no has inicializado git en el backend, ejecuta:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Configuración inicial del backend"
   ```
3. Crea un nuevo repositorio en GitHub llamado `ariete-backend`
4. Sube el código:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/ariete-backend.git
   git branch -M main
   git push -u origin main
   ```

### 2.2 Crear Web Service en Render

1. Ve a [Render](https://render.com) e inicia sesión con GitHub
2. Click en **New +** → **Web Service**
3. Conecta tu repositorio `ariete-backend`
4. Configura el servicio:
   - **Name**: `ariete-backend` (o el que prefieras)
   - **Region**: Selecciona la más cercana a ti
   - **Branch**: `main`
   - **Root Directory**: (dejar vacío)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.3 Configurar Variables de Entorno

En la sección **Environment Variables**, agrega las siguientes variables:

| Variable | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `MONGODB_URI` | Tu connection string de MongoDB Atlas |
| `JWT_SECRET` | Genera uno con: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `CORS_ORIGIN` | `https://tu-proyecto.vercel.app` (lo agregarás después de desplegar el frontend) |

5. Click en **Create Web Service**
6. Espera a que se complete el despliegue (3-5 minutos)
7. **GUARDA LA URL** de tu backend, será algo como: `https://ariete-backend.onrender.com`

---

## 🌐 PASO 3: Desplegar el Frontend en Vercel

### 3.1 Preparar el Frontend

1. Abre una terminal en la carpeta raíz del proyecto `dashboard-ariete`
2. Crea un archivo `.env.production` con el siguiente contenido:
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api
   ```
   ⚠️ **IMPORTANTE**: Reemplaza `https://tu-backend.onrender.com` con la URL real de tu backend de Render

3. Si no has subido el frontend a GitHub, hazlo ahora:
   ```bash
   git add .
   git commit -m "Configuración para despliegue en producción"
   git push origin main
   ```

### 3.2 Desplegar en Vercel

1. Ve a [Vercel](https://vercel.com) e inicia sesión con GitHub
2. Click en **Add New...** → **Project**
3. Importa tu repositorio del dashboard
4. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (dejar como está)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Configurar Variables de Entorno en Vercel

En la sección **Environment Variables**, agrega:

| Variable | Valor |
|----------|-------|
| `VITE_API_URL` | `https://tu-backend.onrender.com/api` |

5. Click en **Deploy**
6. Espera a que se complete el despliegue (2-3 minutos)
7. **GUARDA LA URL** de tu frontend, será algo como: `https://dashboard-ariete.vercel.app`

---

## 🔗 PASO 4: Conectar Frontend y Backend

### 4.1 Actualizar CORS en el Backend

1. Ve a tu servicio de backend en Render
2. Ve a **Environment** en el menú lateral
3. Edita la variable `CORS_ORIGIN` y agrega la URL de tu frontend de Vercel:
   ```
   https://dashboard-ariete.vercel.app
   ```
4. Si quieres permitir múltiples orígenes, sepáralos por comas:
   ```
   http://localhost:5173,https://dashboard-ariete.vercel.app
   ```
5. Click en **Save Changes**
6. El servicio se reiniciará automáticamente

---

## ✅ PASO 5: Verificar el Despliegue

### 5.1 Probar el Backend

1. Abre tu navegador y ve a: `https://tu-backend.onrender.com/api/health`
2. Deberías ver un JSON con el estado del servidor:
   ```json
   {
     "status": "OK",
     "message": "Servidor funcionando correctamente",
     "timestamp": "2025-10-11T..."
   }
   ```

### 5.2 Probar el Frontend

1. Abre tu navegador y ve a tu URL de Vercel: `https://dashboard-ariete.vercel.app`
2. Deberías ver la página de login
3. Intenta iniciar sesión
4. Si todo funciona, ¡felicidades! 🎉

---

## 🔧 Solución de Problemas Comunes

### ❌ Error de CORS

**Síntoma**: Error en la consola del navegador: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solución**:
1. Verifica que la variable `CORS_ORIGIN` en Render incluya la URL exacta de tu frontend de Vercel
2. Asegúrate de que NO haya espacios en la variable
3. Reinicia el servicio en Render después de cambiar la variable

### ❌ Error de conexión a MongoDB

**Síntoma**: El backend no inicia o muestra errores de conexión a la base de datos

**Solución**:
1. Verifica que la `MONGODB_URI` sea correcta
2. Asegúrate de haber reemplazado `<password>` con tu contraseña real
3. Verifica que en MongoDB Atlas hayas permitido el acceso desde cualquier IP (0.0.0.0/0)
4. Revisa los logs en Render para ver el error específico

### ❌ El frontend no se conecta al backend

**Síntoma**: El frontend carga pero no muestra datos, errores de red en la consola

**Solución**:
1. Verifica que la variable `VITE_API_URL` en Vercel tenga la URL correcta del backend
2. Asegúrate de que la URL termine en `/api`
3. Verifica que el backend esté funcionando correctamente
4. Haz un nuevo deploy del frontend después de cambiar las variables

### ❌ Error 503 o el backend se apaga

**Síntoma**: El backend funciona al principio pero luego se detiene

**Solución**:
- Render Free Tier se apaga después de 15 minutos de inactividad
- Se reactivará automáticamente cuando reciba una petición (puede tardar 30-60 segundos)
- Es normal en el plan gratuito, considera upgradearlo si necesitas disponibilidad 24/7

---

## 📱 URLs de tu Aplicación

Una vez completado el despliegue, guarda estas URLs:

- **Frontend (Dashboard)**: `https://tu-proyecto.vercel.app`
- **Backend (API)**: `https://tu-backend.onrender.com`
- **MongoDB Atlas**: Panel de control en [cloud.mongodb.com](https://cloud.mongodb.com)

---

## 🔄 Actualizaciones Futuras

### Para actualizar el frontend:
```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```
Vercel desplegará automáticamente los cambios.

### Para actualizar el backend:
```bash
cd backend
git add .
git commit -m "Descripción de los cambios"
git push origin main
```
Render desplegará automáticamente los cambios.

---

## 📊 Inicializar Datos de Prueba

Si necesitas agregar datos de prueba a tu base de datos en producción:

1. Actualiza el script `backend/scripts/initData.js` para usar `process.env.MONGODB_URI`
2. Ejecuta el script desde tu máquina local con las variables de entorno correctas:
   ```bash
   cd backend
   MONGODB_URI="tu_connection_string" node scripts/initData.js
   ```

---

## 🆘 Necesitas Ayuda?

Si tienes problemas durante el despliegue:

1. Revisa los logs en Render (pestaña "Logs")
2. Revisa los logs en Vercel (pestaña "Deployments" → click en el deployment → "View Function Logs")
3. Verifica la consola del navegador para errores del frontend (F12)
4. Asegúrate de que todas las variables de entorno estén configuradas correctamente

---

## 🎯 Resumen Rápido

1. ✅ MongoDB Atlas → Base de datos en la nube
2. ✅ Render → Backend API (Node.js/Express)
3. ✅ Vercel → Frontend (React)
4. ✅ Conectar todo con variables de entorno
5. ✅ Disfrutar de tu aplicación en la web! 🚀

---

**¡Felicidades! Tu dashboard del ariete hidráulico ahora está accesible desde cualquier parte del mundo! 🌍**



