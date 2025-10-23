@echo off
echo ========================================
echo  ARREGLAR FRONTEND PARA BACKEND SIMPLE
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Arreglando frontend para que funcione con backend ultra simple...
git add src/App.jsx
git commit -m "FIX FRONTEND: Conectar con backend ultra simple /api/estado"
git push origin main

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo El frontend ahora:
echo - Se conecta a /api/estado (backend ultra simple)
echo - Lee datos directamente: humedad, flujo, nivel
echo - Sin dependencias complejas
echo.
echo Vercel detectará el cambio y desplegará automáticamente.
echo ¡DASHBOARD FUNCIONARÁ EN 2 MINUTOS!
echo.
pause





