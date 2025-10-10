#!/bin/bash

echo "🚀 Iniciando Dashboard Ariete Hidráulico..."
echo

echo "📦 Instalando dependencias del frontend..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del frontend"
    exit 1
fi

echo
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del backend"
    exit 1
fi

echo
echo "🗄️ Inicializando datos de ejemplo..."
npm run init-data
if [ $? -ne 0 ]; then
    echo "⚠️ Advertencia: No se pudieron inicializar los datos de ejemplo"
    echo "Asegúrate de que MongoDB esté ejecutándose"
fi

echo
echo "✅ Instalación completada!"
echo
echo "🚀 Para iniciar el sistema:"
echo "   1. Inicia MongoDB (mongod)"
echo "   2. Ejecuta: npm run dev (en esta terminal)"
echo "   3. Ejecuta: cd backend && npm run dev (en otra terminal)"
echo
echo "🌐 Acceso:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo
echo "📋 Credenciales:"
echo "   Admin: admin@ariete.com / admin123"
echo
