@echo off
echo ========================================
echo    FORZANDO ACTUALIZACION DE SENSORES
echo ========================================
echo.

echo 1. Enviando datos de prueba...
echo Enviando humedad: 45
curl -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":45}"
echo.

echo Enviando flujo: 3.5
curl -X POST http://localhost:3001/api/flujo -H "Content-Type: application/json" -d "{\"flujo\":3.5}"
echo.

echo Enviando nivel: 80
curl -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":80}"
echo.

echo.
echo 2. Verificando sensores actualizados...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 | findstr "ultimaLectura"

echo.
echo.
echo 3. Verificando sensores específicos del Ariete...
curl -s http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025 | findstr "Sensor.*Ariete"

echo.
echo.
echo ========================================
echo    VERIFICACION COMPLETADA
echo ========================================
pause




