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
git commit -m "Fix CORS: Permitir dashboard-ariete.vercel.app"

echo.
echo Subiendo a GitHub...
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora configura las variables de entorno en Render
echo.
pause


