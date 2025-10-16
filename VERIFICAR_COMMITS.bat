@echo off
echo ========================================
echo  VERIFICAR COMMITS RECIENTES
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Mostrando ultimos 3 commits:
git log --oneline -3

echo.
echo ========================================
echo  VERIFICAR EN GITHUB
echo ========================================
echo.
echo Ve a: https://github.com/Ariels27435/dashboard-ariete
echo.
echo Verifica que el commit mas reciente sea:
echo "0680b71 Fix package.json: JSON valido para Vercel"
echo.
echo Si NO es ese commit, ejecuta: FORZAR_REDEPLOY.bat
echo.
pause


