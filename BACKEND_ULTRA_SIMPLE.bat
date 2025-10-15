@echo off
echo ========================================
echo  BACKEND ULTRA SIMPLE
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Subiendo backend ULTRA SIMPLE...
git add .
git commit -m "BACKEND ULTRA SIMPLE: Solo rutas ESP32, sin dependencias complejas"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora haz DEPLOY MANUAL en Render:
echo 1. Ve a: https://dashboard.render.com
echo 2. Selecciona "backend-ariete"
echo 3. Haz clic en "Manual Deploy"
echo 4. Selecciona "Deploy latest commit"
echo 5. Haz clic en "Deploy"
echo.
echo Este backend es ULTRA SIMPLE:
echo - Solo 50 líneas de código
echo - Solo rutas del ESP32
echo - Sin dependencias complejas
echo - CORS completamente abierto
echo.
pause

