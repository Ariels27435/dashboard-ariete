@echo off
echo ========================================
echo  RESTAURAR COMMIT QUE FUNCIONABA
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Restaurando commit 8fb1517 que funcionaba...
git reset --hard 8fb1517

echo.
echo Forzando subida a GitHub...
git push origin main --force

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Vercel deberia usar el commit que funcionaba
echo.
pause





