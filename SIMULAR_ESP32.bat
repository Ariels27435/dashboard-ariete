@echo off
echo ========================================
echo    SIMULANDO DATOS DEL ESP32
echo ========================================
echo.

echo Enviando datos de humedad...
curl -X POST http://localhost:3001/api/humedad -H "Content-Type: application/json" -d "{\"humedad\":39}"
echo.

echo Enviando datos de flujo...
curl -X POST http://localhost:3001/api/flujo -H "Content-Type: application/json" -d "{\"flujo\":2.5}"
echo.

echo Enviando datos de nivel...
curl -X POST http://localhost:3001/api/nivel -H "Content-Type: application/json" -d "{\"nivel\":75}"
echo.

echo.
echo ========================================
echo    DATOS ENVIADOS
echo ========================================
pause




