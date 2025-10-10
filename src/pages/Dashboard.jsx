import React, { useEffect, useState } from 'react';
import SensorCard from '../components/SensorCard';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      fetch('http://10.183.6.170:3000/api/estado')
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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Principal</h1>
        <p className="text-gray-600 mt-2">Monitoreo en tiempo real del sistema hidráulico</p>
      </div>

      {/* Tarjetas de sensores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sensorData.map((sensor, index) => (
          <SensorCard key={index} {...sensor} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

