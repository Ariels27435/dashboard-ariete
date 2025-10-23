@echo off
echo ========================================
echo    DEBUG COMPLETO ESP32 -> DASHBOARD
echo ========================================
echo.

echo 1. Verificando que el backend responda...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 > nul
if %errorlevel% == 0 (
    echo ✅ Backend respondiendo correctamente
) else (
    echo ❌ Backend no responde - verifica que este corriendo
    pause
    exit
)

echo.
echo 2. Enviando datos como el ESP32...
echo Enviando humedad: 39
curl -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":39}"
echo.

echo Enviando flujo: 0.00
curl -X POST http://localhost:3001/api/flujo -H "Content-Type: application/json" -d "{\"flujo\":0.00}"
echo.

echo Enviando nivel: 0
curl -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":0}"
echo.

echo.
echo 3. Verificando sensores despues del envio...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025

echo.
echo.
echo ========================================
echo    DEBUG COMPLETADO
echo ========================================
pause







