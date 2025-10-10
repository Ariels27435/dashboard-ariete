@echo off
echo 🚀 Iniciando Dashboard con Datos Simulados...
echo.

echo 🚀 Iniciando Backend Mock...
start "Backend Mock" cmd /k "cd /d %CD%\backend && npm run dev-mock"

echo.
echo ⏳ Esperando 3 segundos...
timeout 3

echo.
echo 🚀 Iniciando Frontend...
start "Frontend" cmd /k "cd /d %CD% && npm run dev"

echo.
echo ✅ Sistema iniciado con datos simulados!
echo.
echo 🌐 Enlaces de acceso:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:3001
echo.
echo 🔑 Credenciales:
echo    Email: admin@ariete.com
echo    Password: admin123
echo.
echo ⏳ Espera unos segundos y luego abre http://localhost:5173
echo.
pause
