@echo off
echo ========================================
echo  ARREGLAR TODO DE UNA VEZ
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Agregando TODAS las dependencias del backend...
git add package.json
git commit -m "FIX COMPLETO: Agregar todas las dependencias del backend de una vez"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Render deberia tener TODAS las dependencias:
echo - express
echo - cors  
echo - mongoose
echo - dotenv
echo - jsonwebtoken
echo - bcryptjs
echo.
echo El backend deberia funcionar completamente.
echo.
pause

