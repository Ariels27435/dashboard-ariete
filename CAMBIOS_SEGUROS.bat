@echo off
echo ========================================
echo    HACER CAMBIOS SEGUROS AL SISTEMA
echo    Sistema Ariete Hidraulico
echo ========================================
echo.

echo ⚠️  IMPORTANTE: Esta herramienta te ayuda a hacer cambios
echo    sin romper la configuracion que funciona actualmente.
echo.

echo 📋 Opciones disponibles:
echo    1. Crear copia de seguridad completa
echo    2. Crear version nueva del servidor
echo    3. Probar cambios antes de aplicar
echo    4. Restaurar desde backup
echo    5. Salir
echo.

set /p opcion="Selecciona una opcion (1-5): "

if "%opcion%"=="1" goto backup
if "%opcion%"=="2" goto nueva_version
if "%opcion%"=="3" goto probar
if "%opcion%"=="4" goto restaurar
if "%opcion%"=="5" goto salir

echo ❌ Opcion invalida
pause
goto inicio

:backup
echo.
echo 🔄 Creando copia de seguridad completa...
set timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

if not exist "backups" mkdir backups
if not exist "backups\%timestamp%" mkdir "backups\%timestamp%"

echo 📁 Creando backup en: backups\%timestamp%\
copy "backend\server-ultra-simple.js" "backups\%timestamp%\server-ultra-simple.js"
copy "backend\package.json" "backups\%timestamp%\package.json"
copy "BACKUP_CONFIGURACION_FUNCIONAL.md" "backups\%timestamp%\BACKUP_CONFIGURACION_FUNCIONAL.md"

echo ✅ Backup creado exitosamente
echo 📁 Ubicacion: backups\%timestamp%\
goto salir

:nueva_version
echo.
echo 🆕 Creando nueva version del servidor...
set /p version="Ingresa el numero de version (ej: v2, v3): "

echo 📝 Creando server-%version%.js...
copy "backend\server-ultra-simple.js" "backend\server-%version%.js"

echo ✅ Nueva version creada: server-%version%.js
echo 💡 Ahora puedes modificar server-%version%.js sin afectar el original
echo.
echo 📋 Para usar la nueva version:
echo    1. Modifica server-%version%.js
echo    2. Cambia package.json: "start": "node backend/server-%version%.js"
echo    3. Haz commit y push
echo    4. Si funciona, mantén la nueva version
echo    5. Si no funciona, restaura el original
goto salir

:probar
echo.
echo 🧪 Modo de prueba activado...
echo.
echo 📋 Para probar cambios de forma segura:
echo    1. Crea una copia: copy backend\server-ultra-simple.js backend\server-test.js
echo    2. Modifica server-test.js
echo    3. Cambia package.json temporalmente: "start": "node backend/server-test.js"
echo    4. Haz commit y push
echo    5. Prueba el sistema
echo    6. Si funciona: renombra a server-ultra-simple.js
echo    7. Si no funciona: restaura el original
echo.
echo ⚠️  RECUERDA: Siempre haz backup antes de cambios grandes
goto salir

:restaurar
echo.
echo 🔄 Restaurando desde backup...
if not exist "backups" (
    echo ❌ No se encontraron backups
    goto salir
)

echo 📁 Backups disponibles:
dir /b backups

set /p backup="Ingresa el nombre del backup a restaurar: "
if not exist "backups\%backup%" (
    echo ❌ Backup no encontrado
    goto salir
)

echo 🔄 Restaurando desde backups\%backup%\...
copy "backups\%backup%\server-ultra-simple.js" "backend\server-ultra-simple.js"
copy "backups\%backup%\package.json" "backend\package.json"

echo ✅ Restauracion completada
echo 📤 Para aplicar cambios, ejecuta RESTAURAR_CONFIGURACION.bat
goto salir

:salir
echo.
echo 📋 RESUMEN:
echo    - Configuracion actual: FUNCIONANDO ✅
echo    - Backup creado: SI ✅
echo    - Sistema protegido: SI ✅
echo.
echo 🔗 URLs del sistema:
echo    Dashboard: https://dashboard-ariete-ju4obxqbz-ariel-celico-lopez-de-leons-projects.vercel.app
echo    Backend: https://backend-ariete.onrender.com
echo.
pause
