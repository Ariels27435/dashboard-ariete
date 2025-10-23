@echo off
echo ========================================
echo  PROBAR BACKEND CON DATOS SIMULADOS
echo ========================================
echo.

echo Enviando datos de prueba al backend...
echo.

echo Enviando humedad: 75%...
curl -X POST https://backend-ariete.onrender.com/api/humedad -H "Content-Type: application/json" -d "{\"valor\": 75}"

echo.
echo Enviando flujo: 12 L/min...
curl -X POST https://backend-ariete.onrender.com/api/flujo -H "Content-Type: application/json" -d "{\"valor\": 12}"

echo.
echo Enviando nivel: 85%...
curl -X POST https://backend-ariete.onrender.com/api/nivel -H "Content-Type: application/json" -d "{\"valor\": 85}"

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora ve a tu dashboard y deberías ver:
echo - Humedad: 75%
echo - Flujo: 12 L/min
echo - Nivel: 85%
echo.
echo Si ves estos valores, el sistema funciona correctamente.
echo El problema está en el ESP32, no en el backend/frontend.
echo.
pause





