@echo off
echo ========================================
echo  VER COMMITS MAS ANTIGUOS
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Mostrando commits mas antiguos (los que funcionaban):
git log --oneline -30

echo.
echo ========================================
echo  BUSCAR COMMITS ANTIGUOS
echo ========================================
echo.
echo Busca commits que digan:
echo - "Primer commit"
echo - "Dashboard inicial"
echo - "Backend inicial"
echo - "Sistema completo"
echo - O cualquier commit de hace mas de 1 semana
echo.
echo Cuando encuentres el commit que funcionaba,
echo copia su hash y ejecuta: RESTAURAR_COMMIT.bat [hash]
echo.
pause





