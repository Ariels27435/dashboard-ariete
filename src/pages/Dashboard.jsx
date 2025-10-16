import React, { useEffect, useState } from 'react';
import SensorCard from '../components/SensorCard';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [historialVisible, setHistorialVisible] = useState(null);
  const [historialData, setHistorialData] = useState(null);

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

  // Función para obtener historial
  const obtenerHistorial = async (sensor) => {
    try {
      const response = await fetch(`https://backend-ariete.onrender.com/api/historial/${sensor}?limite=20&horas=24`);
      const data = await response.json();
      setHistorialData(data);
      setHistorialVisible(sensor);
    } catch (error) {
      console.error('Error al obtener historial:', error);
      alert('Error al obtener historial del sensor');
    }
  };

  // Función para cerrar historial
  const cerrarHistorial = () => {
    setHistorialVisible(null);
    setHistorialData(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Principal</h1>
        <p className="text-gray-600 mt-2">Monitoreo en tiempo real del sistema hidráulico</p>
      </div>

      {/* Tarjetas de sensores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sensorData.map((sensor, index) => (
          <div key={index} className="relative">
            <SensorCard {...sensor} />
            <button
              onClick={() => obtenerHistorial(['humedad', 'flujo', 'nivel'][index])}
              className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Historial
            </button>
          </div>
        ))}
      </div>

      {/* Modal de historial */}
      {historialVisible && historialData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Historial - Sensor {historialData.sensor.charAt(0).toUpperCase() + historialData.sensor.slice(1)}
              </h2>
              <button
                onClick={cerrarHistorial}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-3 rounded">
                <div className="text-sm text-gray-600">Total Lecturas</div>
                <div className="text-xl font-bold">{historialData.total_lecturas}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <div className="text-sm text-gray-600">Período</div>
                <div className="text-xl font-bold">{historialData.periodo_horas}h</div>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <div className="text-sm text-gray-600">Mostrando</div>
                <div className="text-xl font-bold">{historialData.lecturas_filtradas}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <div className="text-sm text-gray-600">Actualizado</div>
                <div className="text-sm font-bold">
                  {new Date(historialData.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Últimas lecturas:</h3>
              <div className="max-h-64 overflow-y-auto">
                {historialData.datos.slice(-10).reverse().map((lectura, index) => (
                  <div key={lectura.id} className="flex justify-between items-center p-2 border-b border-gray-200">
                    <div>
                      <span className="font-medium">{lectura.valor}</span>
                      <span className="text-gray-500 ml-2">
                        {historialData.sensor === 'humedad' ? '%' : 
                         historialData.sensor === 'flujo' ? ' L/min' : ' %'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(lectura.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

