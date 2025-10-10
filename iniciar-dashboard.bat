@echo off
title Dashboard Ariete Hidráulico - Funcionando
echo.
echo ========================================
echo   DASHBOARD ARIETE HIDRÁULICO
echo   Iniciando desde carpetas correctas
echo ========================================
echo.

echo 🚀 Iniciando Backend desde carpeta correcta...
start "Backend - Puerto 3001" cmd /k "cd /d C:\Arieter hidraulico\dashboard-ariete\backend && echo Iniciando servidor backend... && node server.js"

echo.
echo ⏳ Esperando 5 segundos para que el backend se inicie...
timeout /t 5 /nobreak >nul

echo.
echo 🚀 Iniciando Frontend desde carpeta correcta...
start "Frontend - Puerto 5175" cmd /k "cd /d C:\Arieter hidraulico\dashboard-ariete && echo Iniciando servidor frontend... && npm run dev -- --port 5175"

echo.
echo ✅ Servicios iniciados correctamente!
echo.
echo 🌐 Enlaces de acceso:
echo    Frontend: http://localhost:5175
echo    Backend:  http://localhost:3001
echo.
echo 🔑 Credenciales de prueba:
echo    Email: admin@ariete.com
echo    Password: admin123
echo.
echo ⏳ Espera 10-15 segundos y luego abre: http://localhost:5175
echo.
echo 📝 Si hay problemas, revisa las ventanas del backend y frontend
echo.
pause