@echo off
echo ========================================
echo  ARREGLAR PACKAGE.JSON PARA FRONTEND
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Arreglando package.json para frontend...
git add package.json
git commit -m "Fix package.json: Scripts correctos para frontend de Vercel"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Vercel deberia poder hacer build correctamente
echo.
pause

