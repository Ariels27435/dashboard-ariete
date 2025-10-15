@echo off
echo ========================================
echo  RESTAURAR COMMIT QUE FUNCIONABA
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

if "%1"=="" (
    echo ERROR: Debes proporcionar el hash del commit
    echo.
    echo Uso: RESTAURAR_COMMIT.bat [hash]
    echo Ejemplo: RESTAURAR_COMMIT.bat a1b2c3d
    echo.
    pause
    exit /b 1
)

echo Restaurando commit %1...
echo.

echo Paso 1: Resetear al commit que funcionaba
git reset --hard %1

echo.
echo Paso 2: Forzar subida a GitHub
git push origin main --force

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia usar el commit que funcionaba
echo.
echo IMPORTANTE: Tambien necesitas restaurar la configuracion de Render:
echo - Root Directory: (vacio)
echo - Build Command: npm install
echo - Start Command: npm start
echo.
pause

