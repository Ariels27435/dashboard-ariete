@echo off
echo ========================================
echo    ACTIVAR FUNCIONALIDAD DE HISTORIAL
echo    Sistema Ariete Hidraulico
echo ========================================
echo.

echo 📋 Esta operacion:
echo    - Mantiene tu configuracion actual funcionando
echo    - Agrega funcionalidad de historial
echo    - NO requiere MongoDB
echo    - Mantiene compatibilidad con ESP32
echo.

set /p confirm="¿Quieres activar el historial? (S/N): "
if /i "%confirm%" neq "S" (
    echo ❌ Operacion cancelada
    pause
    exit
)

echo.
echo 🔄 Activando funcionalidad de historial...

echo 📝 Creando backup de la configuracion actual...
if exist "backend\server-ultra-simple.js" (
    copy "backend\server-ultra-simple.js" "backend\server-ultra-simple.js.backup.sin-historial"
    echo ✅ Backup creado: server-ultra-simple.js.backup.sin-historial
)

echo 📝 Actualizando package.json para usar servidor con historial...
cd backend

echo 📋 Cambiando start script a server-con-historial.js...
powershell -Command "(Get-Content package.json) -replace '\"start\": \"node backend/server-ultra-simple.js\"', '\"start\": \"node backend/server-con-historial.js\"' | Set-Content package.json"

echo ✅ Package.json actualizado

echo.
echo 📤 Subiendo cambios a GitHub...
git add server-con-historial.js package.json
git commit -m "FEAT: Agregar funcionalidad de historial sin MongoDB"
git push origin main

if %errorlevel% equ 0 (
    echo ✅ Cambios subidos exitosamente
    echo.
    echo 🚀 Render desplegara automaticamente en 2-3 minutos
    echo.
    echo 📋 NUEVAS FUNCIONALIDADES DISPONIBLES:
    echo    ✅ Historial de hasta 1000 lecturas por sensor
    echo    ✅ Estadisticas (min, max, promedio, tendencia)
    echo    ✅ Filtrado por horas y limite de resultados
    echo    ✅ Compatible con ESP32 existente
    echo    ✅ Sin necesidad de MongoDB
    echo.
    echo 🔗 NUEVOS ENDPOINTS:
    echo    GET /api/historial/humedad?limite=50^&horas=24
    echo    GET /api/historial/flujo?limite=50^&horas=24
    echo    GET /api/historial/nivel?limite=50^&horas=24
    echo    GET /api/estadisticas/humedad?horas=24
    echo.
    echo 📊 URLs del sistema:
    echo    Dashboard: https://dashboard-ariete.vercel.app
    echo    Backend: https://backend-ariete.onrender.com
    echo.
    echo ✅ HISTORIAL ACTIVADO EXITOSAMENTE
    echo.
    echo 📋 PROXIMOS PASOS:
    echo    1. Esperar 2-3 minutos para que Render despliegue
    echo    2. Probar: node PROBAR_HISTORIAL.js
    echo    3. Verificar que el ESP32 siga enviando datos
    echo    4. Los botones "Historial" funcionaran en el dashboard
) else (
    echo ❌ Error subiendo a GitHub
    echo    Verifica tu conexion a internet y credenciales de Git
)

echo.
echo 🔄 Si algo sale mal, puedes restaurar con:
echo    copy "backend\server-ultra-simple.js.backup.sin-historial" "backend\server-ultra-simple.js"
echo    [Cambiar package.json de vuelta]
echo    git add . ^&^& git commit -m "RESTORE: Servidor sin historial" ^&^& git push origin main
echo.
pause



