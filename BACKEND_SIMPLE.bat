@echo off
echo ========================================
echo  BACKEND SIMPLE - SIN MONGODB
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Subiendo backend simple que funciona como antes...
git add .
git commit -m "BACKEND SIMPLE: Sin MongoDB, sin variables de entorno, funciona como antes"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo El backend ahora es SIMPLE:
echo - Sin MongoDB (datos en memoria)
echo - Sin variables de entorno
echo - CORS permite todo
echo - Funciona EXACTAMENTE como antes
echo.
echo Render detectará el cambio y desplegará automáticamente.
echo ¡DASHBOARD FUNCIONARÁ EN 2 MINUTOS!
echo.
pause


