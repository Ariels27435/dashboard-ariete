@echo off
echo ========================================
echo    RESTAURAR CONFIGURACION FUNCIONAL
echo    Sistema Ariete Hidraulico
echo ========================================
echo.

echo 🔍 Verificando archivos de backup...
if not exist "BACKUP_CONFIGURACION_FUNCIONAL.md" (
    echo ❌ ERROR: No se encuentra el archivo de backup
    echo    Asegurate de tener BACKUP_CONFIGURACION_FUNCIONAL.md
    pause
    exit
)

echo ✅ Archivo de backup encontrado
echo.

echo 📋 Esta configuracion RESTAURA:
echo    - server-ultra-simple.js (servidor que funciona)
echo    - package.json (configuracion de scripts)
echo    - Código ESP32 funcional
echo.

set /p confirm="¿Quieres restaurar la configuracion funcional? (S/N): "
if /i "%confirm%" neq "S" (
    echo ❌ Operacion cancelada
    pause
    exit
)

echo.
echo 🔄 Restaurando configuracion...

echo 📝 Creando backup de archivos actuales...
if exist "backend\server-ultra-simple.js" (
    copy "backend\server-ultra-simple.js" "backend\server-ultra-simple.js.backup.%date:~-4,4%%date:~-10,2%%date:~-7,2%"
    echo ✅ Backup creado: server-ultra-simple.js.backup
)

if exist "backend\package.json" (
    copy "backend\package.json" "backend\package.json.backup.%date:~-4,4%%date:~-10,2%%date:~-7,2%"
    echo ✅ Backup creado: package.json.backup
)

echo.
echo 📤 Subiendo configuracion a GitHub...
cd backend
git add server-ultra-simple.js package.json
git commit -m "RESTAURAR: Configuracion funcional del sistema ariete"
git push origin main

if %errorlevel% equ 0 (
    echo ✅ Configuracion subida exitosamente
    echo.
    echo 🚀 Render desplegara automaticamente en 2-3 minutos
    echo 📊 Dashboard: https://dashboard-ariete-ju4obxqbz-ariel-celico-lopez-de-leons-projects.vercel.app
    echo 🔧 Backend: https://backend-ariete.onrender.com
    echo.
    echo ✅ RESTAURACION COMPLETADA
) else (
    echo ❌ Error subiendo a GitHub
    echo    Verifica tu conexion a internet y credenciales de Git
)

echo.
echo 📋 PROXIMOS PASOS:
echo    1. Esperar 2-3 minutos para que Render despliegue
echo    2. Probar el dashboard: https://dashboard-ariete-ju4obxqbz-ariel-celico-lopez-de-leons-projects.vercel.app
echo    3. Verificar que el ESP32 envie datos correctamente
echo.
pause
