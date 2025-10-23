@echo off
echo ========================================
echo  ARREGLAR PACKAGE.JSON
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Arreglando package.json...
git add package.json
git commit -m "Fix package.json: JSON valido para Vercel"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Vercel deberia poder hacer deploy correctamente
echo.
pause





