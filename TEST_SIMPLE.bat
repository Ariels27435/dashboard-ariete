@echo off
echo ========================================
echo    TEST SIMPLE DEL BACKEND
echo ========================================
echo.

echo 1. Verificando que el backend responda...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025

echo.
echo.
echo 2. Enviando dato de humedad...
curl -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":39}" -v

echo.
echo.
echo 3. Verificando sensores después del envío...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025

echo.
echo.
echo ========================================
echo    TEST COMPLETADO
echo ========================================
pause



