@echo off
echo ========================================
echo    SOLUCION DEFINITIVA ESP32 -> DASHBOARD
echo ========================================
echo.

echo 1. Verificando backend...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 > nul
if %errorlevel% == 0 (
    echo ✅ Backend funcionando
) else (
    echo ❌ Backend no responde
    pause
    exit
)

echo.
echo 2. Enviando datos de prueba con valores reales...
echo Enviando humedad: 39
curl -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":39}"
echo.

echo Enviando flujo: 0.00
curl -X POST http://localhost:3001/api/flujo -H "Content-Type: application/json" -d "{\"flujo\":0.00}"
echo.

echo Enviando nivel: 100
curl -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":100}"
echo.

echo.
echo 3. Verificando sensores actualizados...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 | findstr "ultimaLectura"

echo.
echo.
echo ========================================
echo    SOLUCION COMPLETADA
echo ========================================
echo.
echo Si ves "ultimaLectura" arriba, los datos se guardaron correctamente.
echo Si no ves "ultimaLectura", hay un problema en el backend.
echo.
echo 4. Refresca el dashboard ahora para ver los datos actualizados.
echo.
pause



