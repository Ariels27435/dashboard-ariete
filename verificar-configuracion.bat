@echo off
echo ========================================
echo Verificando Configuracion del Proyecto
echo ========================================
echo.

echo [1] Verificando archivo .env del frontend...
if exist ".env" (
    echo    [OK] Archivo .env encontrado
) else (
    echo    [X] FALTA: .env
    echo    Crea el archivo .env en la raiz del proyecto
    echo    Ver: CREAR_ARCHIVOS_ENV.txt
)
echo.

echo [2] Verificando archivo .env del backend...
if exist "backend\.env" (
    echo    [OK] Archivo backend\.env encontrado
) else (
    echo    [X] FALTA: backend\.env
    echo    Crea el archivo .env en la carpeta backend
    echo    Ver: CREAR_ARCHIVOS_ENV.txt
)
echo.

echo [3] Verificando node_modules del frontend...
if exist "node_modules" (
    echo    [OK] Dependencias del frontend instaladas
) else (
    echo    [X] FALTA: node_modules
    echo    Ejecuta: npm install
)
echo.

echo [4] Verificando node_modules del backend...
if exist "backend\node_modules" (
    echo    [OK] Dependencias del backend instaladas
) else (
    echo    [X] FALTA: backend\node_modules
    echo    Ejecuta: cd backend ^&^& npm install
)
echo.

echo [5] Verificando archivos de configuracion...
if exist "vercel.json" (
    echo    [OK] vercel.json encontrado
) else (
    echo    [X] FALTA: vercel.json
)

if exist "backend\env.example" (
    echo    [OK] backend\env.example encontrado
) else (
    echo    [X] FALTA: backend\env.example
)
echo.

echo ========================================
echo Verificacion completada
echo ========================================
echo.
echo Para mas informacion, consulta:
echo - README.md
echo - GUIA_DESPLIEGUE.md
echo - INSTRUCCIONES_RAPIDAS.md
echo.
pause



