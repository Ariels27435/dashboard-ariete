@echo off
echo ========================================
echo  VER HISTORIAL DE COMMITS
echo ========================================
echo.

cd /d "C:\Arieter hidraulico\dashboard-ariete"

echo Mostrando ultimos 15 commits:
git log --oneline -15

echo.
echo ========================================
echo  BUSCAR COMMIT QUE FUNCIONABA
echo ========================================
echo.
echo Busca un commit que diga algo como:
echo - "Dashboard funcional"
echo - "Backend funcionando"
echo - "Sistema completo"
echo - O cualquier commit de hace varios dias
echo.
echo Cuando encuentres el commit que funcionaba,
echo copia su hash (las primeras 7 letras/numeros)
echo y ejecuta: RESTAURAR_COMMIT.bat [hash]
echo.
pause





