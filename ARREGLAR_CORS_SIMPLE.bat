@echo off
echo ========================================
echo  ARREGLAR CORS SIMPLE
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Arreglando CORS para que funcione como antes...
git add backend/server.js
git commit -m "Fix CORS: Configuracion simple que funciona como antes"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia funcionar sin errores de CORS
echo.
pause





