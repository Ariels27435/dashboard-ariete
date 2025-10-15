@echo off
echo ========================================
echo  CREAR CONFIGURACION QUE FUNCIONE
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Creando package.json en la raiz...
echo {
echo   "name": "dashboard-ariete",
echo   "version": "1.0.0",
echo   "description": "Dashboard Ariete Hidraulico",
echo   "main": "backend/server.js",
echo   "scripts": {
echo     "start": "node backend/server.js",
echo     "dev": "node backend/server.js"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "cors": "^2.8.5",
echo     "mongoose": "^7.5.0",
echo     "dotenv": "^16.3.1"
echo   }
echo } > package.json

echo.
echo Subiendo configuracion...
git add package.json
git commit -m "Configuracion que funciona: package.json en raiz"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora en Render cambia:
echo - Root Directory: (vacio)
echo - Build Command: npm install
echo - Start Command: npm start
echo.
pause

