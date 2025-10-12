@echo off
echo ========================================
echo    VERIFICACION ESP32 -> BACKEND
echo ========================================
echo.

echo 1. Verificando sensores antes del envio...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 | findstr "ultimaLectura"

echo.
echo 2. Enviando datos como el ESP32...
echo Enviando humedad: 39
curl -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":39}"
echo.

echo Enviando flujo: 2.5
curl -X POST http://localhost:3001/api/flujo -H "Content-Type: application/json" -d "{\"flujo\":2.5}"
echo.

echo Enviando nivel: 75
curl -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":75}"
echo.

echo.
echo 3. Verificando sensores despues del envio...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 | findstr "ultimaLectura"

echo.
echo.
echo ========================================
echo    VERIFICACION COMPLETADA
echo ========================================
pause



