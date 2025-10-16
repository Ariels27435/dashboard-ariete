import React, { useEffect, useState } from 'react';
import SensorCard from '../components/SensorCard';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const intervalo = setInterval(() => {
     fetch('https://backend-ariete.onrender.com/api/estado')
        .then(res => res.json())
        .then(data => {
          setSensorData([
            {
              title: 'Humedad',
              value: data.humedad ?? '--',
              unit: '%',
              status: data.humedad < 30 ? 'warning' : 'normal',
              icon: '🌫️',
              trend: 'none',
              color: data.humedad < 30 ? 'yellow' : 'green'
            },
            {
              title: 'Caudal de Agua',
              value: data.flujo ?? '--',
              unit: 'L/min',
              status: 'normal',
              icon: '💧',
              trend: 'none',
              color: 'blue'
            },
            {
              title: 'Nivel de Agua',
              value: data.nivel ?? '--',
              unit: '%',
              status: data.nivel < 20 ? 'warning' : 'normal',
              icon: '🏊',
              trend: 'none',
              color: data.nivel < 20 ? 'red' : 'green'
            }
          ]);
        })
        .catch(err => console.error("Error al obtener datos:", err));
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">DASHBOARD ARIETE INTELIGENTE</h1>
        <p className="text-blue-100">Monitoreo en tiempo real del sistema hidráulico</p>
      </div>

      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          {/* Tarjetas de sensores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sensorData.map((sensor, index) => (
              <div key={index} className="flex justify-center">
                <SensorCard {...sensor} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>Última actualización: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Dashboard;

