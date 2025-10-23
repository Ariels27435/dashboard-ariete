@echo off
echo ========================================
echo  SUBIR CAMBIO DE CORS
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Agregando cambio de CORS...
git add backend/server.js

echo.
echo Haciendo commit...
git commit -m "Fix CORS: Configuracion simple que funciona como antes"

echo.
echo Subiendo a GitHub...
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia funcionar sin errores de CORS
echo.
pause





