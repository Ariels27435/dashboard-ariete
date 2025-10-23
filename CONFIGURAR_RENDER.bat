@echo off
echo ========================================
echo  CONFIGURAR VARIABLES DE ENTORNO EN RENDER
echo ========================================
echo.
echo INSTRUCCIONES PARA RENDER:
echo.
echo 1. Ve a: https://dashboard.render.com
echo 2. Selecciona tu servicio "backend-ariete"
echo 3. Ve a la pestaña "Environment"
echo 4. Agrega estas variables:
echo.
echo    NODE_ENV=production
echo    MONGODB_URI=mongodb://localhost:27017/ariete_db
echo    CORS_ORIGIN=https://dashboard-ariete.vercel.app
echo    ESP32_API_KEY=ariete-esp32-2025
echo.
echo 5. Guarda los cambios
echo 6. Render reiniciará automáticamente
echo.
echo ========================================
echo  DESPUÉS DE CONFIGURAR:
echo ========================================
echo.
echo - El backend se reiniciará
echo - MongoDB se conectará correctamente
echo - CORS permitirá el frontend
echo - ¡DASHBOARD FUNCIONARÁ COMPLETAMENTE!
echo.
pause





