@echo off
echo ========================================
echo  AGREGAR SCRIPT START AL COMMIT RESTAURADO
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Agregando script start al commit restaurado...
git add package.json
git commit -m "Fix: Agregar script start al commit que funcionaba"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia poder ejecutar npm start
echo.
pause





