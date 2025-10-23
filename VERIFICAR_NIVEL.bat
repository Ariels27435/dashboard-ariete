@echo off
echo ========================================
echo    VERIFICANDO DATOS DE NIVEL
echo ========================================
echo.

echo 1. Verificando sensores antes del envio...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 | findstr "Sensor Nivel Ariete"

echo.
echo 2. Enviando dato de nivel como el ESP32...
echo Enviando nivel: 100
curl -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":100}"
echo.

echo.
echo 3. Verificando sensores despues del envio...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 | findstr "Sensor Nivel Ariete"

echo.
echo.
echo ========================================
echo    VERIFICACION COMPLETADA
echo ========================================
pause







