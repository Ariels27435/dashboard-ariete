@echo off
echo ========================================
echo  AGREGAR DEPENDENCIAS DEL BACKEND
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Agregando dependencias del backend...
git add package.json
git commit -m "Fix package.json: Agregar dependencias del backend (express, cors, mongoose)"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia poder instalar todas las dependencias
echo.
pause


