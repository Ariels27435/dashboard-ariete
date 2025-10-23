@echo off
echo ========================================
echo    VERIFICACION DE DATOS ESP32
echo ========================================
echo.

echo 1. Verificando que el backend este corriendo...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 > nul
if %errorlevel% == 0 (
    echo ✅ Backend respondiendo correctamente
) else (
    echo ❌ Backend no responde - verifica que este corriendo
    pause
    exit
)

echo.
echo 2. Obteniendo datos de sensores...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025

echo.
echo.
echo 3. Verificando endpoint de humedad...
curl -s -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":39}"

echo.
echo.
echo 4. Verificando endpoint de flujo...
curl -s -X POST http://localhost:3001/api/flujo -H "Content-Type: application/json" -d "{\"flujo\":0.00}"

echo.
echo.
echo 5. Verificando endpoint de nivel...
curl -s -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":0}"

echo.
echo.
echo ========================================
echo    VERIFICACION COMPLETADA
echo ========================================
pause







