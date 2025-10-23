@echo off
echo ========================================
echo  AGREGAR DEPENDENCIAS FALTANTES
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Agregando dependencias faltantes del backend...
git add package.json
git commit -m "Fix package.json: Agregar jsonwebtoken y bcryptjs"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia tener todas las dependencias
echo.
pause





