import React, { useEffect, useState } from 'react';
import SensorCard from '../components/SensorCard';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [showVideosModal, setShowVideosModal] = useState(false);

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Principal</h1>
          <p className="text-gray-600 mt-2">Monitoreo en tiempo real del sistema hidráulico</p>
        </div>
        <button 
          onClick={() => setShowVideosModal(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🎬 Videos Proyecto
        </button>
      </div>

      {/* Tarjetas de sensores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sensorData.map((sensor, index) => (
          <div key={index}>
            <SensorCard {...sensor} />
          </div>
        ))}
      </div>

      {/* Modal de Videos */}
      {showVideosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">🎬 Videos del Proyecto Ariete Hidráulico</h2>
              <button 
                onClick={() => setShowVideosModal(false)}
                className="text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video 1 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">📹 Video 1</h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/BoG2kIU95rA" 
                    title="Video 1 - Ariete Hidráulico"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video 2 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">📹 Video 2</h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/miF423qD6Fw" 
                    title="Video 2 - Ariete Hidráulico"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video 3 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">📹 Video 3</h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/eP96GPZNkTY" 
                    title="Video 3 - Ariete Hidráulico"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video 4 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">📹 Video 4</h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/Ieg70Yz6O_g" 
                    title="Video 4 - Ariete Hidráulico"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button 
                onClick={() => setShowVideosModal(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-bold transition-colors"
              >
                Cerrar Videos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

