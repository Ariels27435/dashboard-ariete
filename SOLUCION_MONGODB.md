# 🔧 Solución de Problemas con MongoDB

## ❌ Error Actual
```
(node:6236) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option
(node:6236) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option
```

## ✅ Solución Aplicada

### 1. **Warnings Eliminados**
He actualizado la configuración de MongoDB para eliminar las opciones deprecadas:
- ❌ `useNewUrlParser: true` (eliminado)
- ❌ `useUnifiedTopology: true` (eliminado)

### 2. **Verificación de MongoDB**

#### Opción A: Usar MongoDB Compass (Recomendado)
1. **Abrir MongoDB Compass**
2. **Conectar a**: `mongodb://localhost:27017`
3. **Crear base de datos**: `ariete_db`
4. **Verificar conexión**

#### Opción B: Usar MongoDB desde línea de comandos
1. **Abrir terminal como administrador**
2. **Ejecutar**: `mongod`
3. **Verificar que esté ejecutándose en puerto 27017**

### 3. **Verificar Conexión**
```bash
cd backend
npm run check-mongo
```

### 4. **Inicializar Datos**
```bash
npm run init-data
```

### 5. **Iniciar Servidor**
```bash
npm run dev
```

## 🚀 Pasos Completos para Iniciar

### Paso 1: Verificar MongoDB
```bash
# En la carpeta backend
npm run check-mongo
```

### Paso 2: Si MongoDB no está ejecutándose
- **Opción A**: Abrir MongoDB Compass y conectar
- **Opción B**: Ejecutar `mongod` en terminal

### Paso 3: Inicializar datos
```bash
npm run init-data
```

### Paso 4: Iniciar backend
```bash
npm run dev
```

### Paso 5: Iniciar frontend (en otra terminal)
```bash
cd ..
npm run dev
```

## 🌐 Acceso al Sistema
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Credenciales**: admin@ariete.com / admin123

## 🔍 Verificación de Funcionamiento

### Backend funcionando correctamente:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en puerto 3001
📊 Dashboard disponible en: http://localhost:3001
```

### Frontend funcionando correctamente:
```
  VITE v7.1.5  ready in 500 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## ❗ Si Persisten los Problemas

### 1. Verificar que MongoDB esté ejecutándose
```bash
# Verificar procesos de MongoDB
tasklist | findstr mongod
```

### 2. Verificar puerto 27017
```bash
# Verificar si el puerto está en uso
netstat -an | findstr 27017
```

### 3. Reiniciar MongoDB
- Cerrar MongoDB Compass
- Abrir nuevamente y conectar
- O reiniciar el servicio `mongod`

### 4. Verificar logs del servidor
```bash
npm run dev
# Buscar mensajes de error en la consola
```

## 📞 Soporte Adicional

Si el problema persiste:
1. Verifica que MongoDB Compass esté ejecutándose
2. Asegúrate de que el puerto 27017 no esté bloqueado
3. Revisa los logs del servidor para más detalles
4. Intenta reiniciar MongoDB Compass

---

**¡El sistema debería funcionar correctamente ahora! 🎉**
