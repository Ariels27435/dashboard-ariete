@echo off
echo ========================================
echo  FORZAR NUEVO DEPLOY EN VERCEL
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Creando commit vacio para forzar nuevo deploy...
git commit --allow-empty -m "Forzar nuevo deploy en Vercel"

echo.
echo Subiendo a GitHub...
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Vercel deberia crear un nuevo deploy automaticamente
echo.
pause


