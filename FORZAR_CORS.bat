@echo off
echo ========================================
echo  VERIFICAR ESTADO DE GIT
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Verificando estado de Git:
git status

echo.
echo ========================================
echo  FORZAR CAMBIO DE CORS
echo ========================================
echo.

echo Forzando cambio de CORS...
git add -A
git commit -m "Fix CORS: Configuracion simple que funciona como antes"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia funcionar sin errores de CORS
echo.
pause


