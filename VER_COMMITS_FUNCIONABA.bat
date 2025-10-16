@echo off
echo ========================================
echo  VER COMMITS ANTES DEL HISTORIAL
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Mostrando commits antes del historial (los que funcionaban):
git log --oneline -50

echo.
echo ========================================
echo  BUSCAR COMMIT QUE FUNCIONABA
echo ========================================
echo.
echo Busca commits que digan:
echo - "Dashboard funcional"
echo - "Backend funcionando"
echo - "Sistema completo"
echo - "Primer commit"
echo - O cualquier commit SIN la palabra "historial"
echo.
echo Cuando encuentres el commit que funcionaba,
echo copia su hash y ejecuta: RESTAURAR_COMMIT.bat [hash]
echo.
pause


