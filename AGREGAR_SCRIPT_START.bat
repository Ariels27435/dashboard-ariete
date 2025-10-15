@echo off
echo ========================================
echo  AGREGAR SCRIPT START AL PACKAGE.JSON
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Agregando script start para backend...
git add package.json
git commit -m "Fix package.json: Agregar script start para backend"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia poder ejecutar npm start
echo.
pause

