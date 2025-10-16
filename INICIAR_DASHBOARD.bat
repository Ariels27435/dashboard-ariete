@echo off
echo ========================================
echo   DASHBOARD ARIETE HIDRAULICO
echo ========================================
echo.

echo [1] Verificando que MongoDB este corriendo...
echo    Si no tienes MongoDB, descarga MongoDB Community Server
echo.

echo [2] Iniciando Backend...
start "Backend - Puerto 3001" cmd /k "cd /d "%~dp0backend" && npm run dev"
echo    Backend iniciado en nueva ventana
echo.

echo [3] Esperando 3 segundos...
timeout /t 3 /nobreak > nul

echo [4] Iniciando Frontend...
start "Frontend - Puerto 5173" cmd /k "cd /d "%~dp0" && npm run dev"
echo    Frontend iniciado en nueva ventana
echo.

echo ========================================
echo   SISTEMA INICIADO
echo ========================================
echo.
echo Abre tu navegador en:
echo    http://localhost:5173
echo.
echo Login:
echo    Usuario: admin@ariete.com
echo    Password: admin123
echo.
echo Para detener el sistema:
echo    Cierra las ventanas del Backend y Frontend
echo.
pause




