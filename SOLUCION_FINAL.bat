@echo off
echo ========================================
echo    SOLUCION FINAL - FORZAR DATOS
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
echo Enviando humedad: 45
curl -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":45}"
echo.

echo Enviando flujo: 2.5
curl -X POST http://localhost:3001/api/flujo -H "Content-Type: application/json" -d "{\"flujo\":2.5}"
echo.

echo Enviando nivel: 75
curl -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":75}"
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
pause


