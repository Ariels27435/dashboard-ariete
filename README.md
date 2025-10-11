# 🚰 Dashboard Ariete Hidráulico

Un sistema completo de monitoreo y control para sistemas hidráulicos industriales, desarrollado con React, Node.js, Express y MongoDB.

## 🚀 Características

### Frontend (React + Vite)
- **Dashboard en tiempo real** con gráficas interactivas
- **Monitoreo de sensores** (temperatura, presión, caudal, nivel)
- **Gestión de alertas** con diferentes niveles de prioridad
- **Control de válvulas** con estado visual
- **Reportes y análisis** de datos históricos
- **Gestión de usuarios** con roles y permisos
- **Configuración del sistema** personalizable
- **Diseño responsive** con Tailwind CSS

### Backend (Node.js + Express)
- **API RESTful** completa
- **Autenticación JWT** segura
- **Base de datos MongoDB** con Mongoose
- **Middleware de seguridad** y validación
- **Sistema de roles** (admin, supervisor, operador, técnico)
- **Alertas automáticas** basadas en umbrales
- **Datos de ejemplo** para pruebas

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 19
- Vite
- Tailwind CSS
- Recharts (gráficas)
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- CORS

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (v20.19.0 o superior)
- MongoDB (local o MongoDB Atlas)
- Git

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd dashboard-ariete
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 4. Configurar MongoDB
Asegúrate de que MongoDB esté ejecutándose en tu sistema:
```bash
# MongoDB local
mongod

# O usar MongoDB Atlas (recomendado para producción)
```

### 5. Inicializar datos de ejemplo
```bash
cd backend
npm run init-data
```

### 6. Iniciar el servidor backend
```bash
npm run dev
```

### 7. Iniciar el frontend (en otra terminal)
```bash
cd ..
npm run dev
```

## 🌐 Acceso al Sistema

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

### Credenciales de Prueba
- **Administrador**: admin@ariete.com / admin123
- **Operador**: juan.perez@ariete.com / operador123
- **Supervisor**: maria.garcia@ariete.com / supervisor123

## 📁 Estructura del Proyecto

```
dashboard-ariete/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Vistas principales
│   ├── services/          # Servicios API
│   ├── hooks/             # Hooks personalizados
│   ├── utils/             # Utilidades
│   └── assets/            # Recursos estáticos
├── backend/               # Backend Node.js
│   ├── models/            # Modelos MongoDB
│   ├── routes/            # Rutas API
│   ├── controllers/       # Controladores
│   ├── middleware/        # Middleware personalizado
│   └── scripts/           # Scripts de utilidad
└── README.md
```

## 🔧 Configuración de Variables de Entorno

### Backend (backend/.env)
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ariete_db
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
CORS_ORIGIN=http://localhost:5173
JWT_EXPIRES_IN=7d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

**Nota**: Los archivos `.env` están en `.gitignore` por seguridad. Usa `env.example` como referencia.

## 🚀 Despliegue en Producción

Para desplegar tu aplicación en la web y que sea accesible globalmente, **sigue la guía completa**:

👉 **[GUIA_DESPLIEGUE.md](./GUIA_DESPLIEGUE.md)** 👈

La guía incluye:
- ✅ Configuración de MongoDB Atlas (base de datos en la nube - GRATIS)
- ✅ Despliegue del backend en Render (GRATIS)
- ✅ Despliegue del frontend en Vercel (GRATIS)
- ✅ Configuración de variables de entorno
- ✅ Solución de problemas comunes
- ✅ Instrucciones paso a paso con capturas

### Resumen Rápido:
1. **MongoDB Atlas** → Base de datos en la nube
2. **Render** → Backend API (Node.js/Express)
3. **Vercel** → Frontend (React)
4. Conectar todo con variables de entorno
5. ¡Listo! Tu app estará en la web 🌍

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil
- `POST /api/auth/logout` - Cerrar sesión

### Sensores
- `GET /api/sensores` - Listar sensores
- `GET /api/sensores/:id` - Obtener sensor
- `GET /api/sensores/:id/lecturas` - Obtener lecturas
- `POST /api/sensores/:id/lecturas` - Crear lectura
- `PATCH /api/sensores/:id/status` - Actualizar estado

### Alertas
- `GET /api/alertas` - Listar alertas
- `GET /api/alertas/:id` - Obtener alerta
- `POST /api/alertas` - Crear alerta
- `PATCH /api/alertas/:id/resolve` - Resolver alerta

### Usuarios
- `GET /api/usuarios` - Listar usuarios (admin)
- `POST /api/usuarios` - Crear usuario (admin)
- `PUT /api/usuarios/:id` - Actualizar usuario (admin)
- `DELETE /api/usuarios/:id` - Eliminar usuario (admin)

### Reportes
- `GET /api/reportes/dashboard` - Datos del dashboard
- `GET /api/reportes/sensores` - Datos de sensores
- `GET /api/reportes/consumo` - Reporte de consumo

### Configuración
- `GET /api/configuracion` - Obtener configuración
- `PUT /api/configuracion` - Actualizar configuración (admin)
- `POST /api/configuracion/reset` - Restaurar configuración (admin)

## 🔒 Seguridad

- Autenticación JWT con expiración
- Contraseñas hasheadas con bcrypt
- Middleware de autorización por roles
- Validación de datos de entrada
- CORS configurado
- Headers de seguridad

## 🧪 Testing

```bash
# Frontend
npm run test

# Backend
cd backend
npm test
```

## 📈 Monitoreo

El sistema incluye:
- Monitoreo en tiempo real de sensores
- Alertas automáticas por umbrales
- Historial de lecturas
- Reportes de rendimiento
- Logs de actividad

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Desarrollador Principal** - [Tu Nombre](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- React Team por el excelente framework
- Tailwind CSS por el sistema de diseño
- MongoDB por la base de datos
- La comunidad de desarrolladores

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo
- Revisa la documentación de la API

---

**¡Gracias por usar Dashboard Ariete Hidráulico! 🚰✨**