@echo off
echo ========================================
echo  CREAR BACKEND SIMPLE SIN MONGODB
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Creando server simple sin MongoDB...
echo const express = require('express');
echo const cors = require('cors');
echo.
echo const app = express();
echo const PORT = process.env.PORT ^|^| 3001;
echo.
echo // CORS simple que funciona
echo app.use(cors({
echo   origin: true, // Permitir todos los orígenes
echo   credentials: true
echo }));
echo.
echo app.use(express.json());
echo.
echo // Endpoints simples que funcionan
echo app.get('/api/estado', (req, res) =^> {
echo   res.json({
echo     humedad: 25,
echo     flujo: 0,
echo     nivel: 0,
echo     timestamp: new Date(),
echo     sensores: {
echo       humedad: { id: 'humedad', timestamp: new Date() },
echo       flujo: { id: 'flujo', timestamp: new Date() },
echo       nivel: { id: 'nivel', timestamp: new Date() }
echo     }
echo   });
echo });
echo.
echo app.get('/api/historial', (req, res) =^> {
echo   const historial = [];
echo   for (let i = 0; i ^< 50; i++) {
echo     historial.push({
echo       valor: 20 + Math.random() * 10,
echo       timestamp: new Date(Date.now() - i * 300000),
echo       time: new Date(Date.now() - i * 300000).toLocaleTimeString('es-ES', {
echo         hour: '2-digit',
echo         minute: '2-digit'
echo       })
echo     });
echo   }
echo   res.json({
echo     humedad: historial,
echo     flujo: historial.map(h =^> ({ ...h, valor: Math.random() * 5 })),
echo     nivel: historial.map(h =^> ({ ...h, valor: Math.random() * 100 }))
echo   });
echo });
echo.
echo app.listen(PORT, () =^> {
echo   console.log(`Servidor funcionando en puerto ${PORT}`);
echo }); > backend/server-simple.js

echo.
echo Subiendo server simple...
git add backend/server-simple.js
git commit -m "Backend simple sin MongoDB para funcionar como antes"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora en Render cambia Start Command a: node server-simple.js
echo.
pause





