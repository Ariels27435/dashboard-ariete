@echo off
echo ========================================
echo  FORZAR DEPLOY DEL COMMIT CORRECTO
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Creando commit vacio para forzar deploy...
git commit --allow-empty -m "Forzar deploy: Render debe usar commit con script start"

echo.
echo Subiendo a GitHub...
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia usar el commit mas reciente
echo.
pause

