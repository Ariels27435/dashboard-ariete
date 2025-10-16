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
      setHistorialData({ loading: true });
      setHistorialVisible(sensor);
      
      const response = await fetch(`https://backend-ariete.onrender.com/api/historial/${sensor}?limite=50&horas=24`);
      const data = await response.json();
      setHistorialData(data);
    } catch (error) {
      console.error('Error al obtener historial:', error);
      setHistorialData({ error: error.message });
    }
  };

  // Función para obtener estadísticas
  const obtenerEstadisticas = async (sensor) => {
    try {
      const response = await fetch(`https://backend-ariete.onrender.com/api/estadisticas/${sensor}?horas=24`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      return null;
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
              className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📊 Historial
            </button>
          </div>
        ))}
      </div>

      {/* Botón principal de historial */}
      <div className="text-center mt-8">
        <button
          onClick={() => obtenerHistorial('humedad')}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          📊 Ver Historial Completo del Sistema
        </button>
      </div>

      {/* Modal de historial mejorado */}
      {historialVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">
                    📊 Historial Completo - Sensor {historialVisible.charAt(0).toUpperCase() + historialVisible.slice(1)}
                  </h2>
                  <p className="text-blue-100 mt-1">Datos históricos del sistema Ariete Hidráulico</p>
                </div>
                <button
                  onClick={cerrarHistorial}
                  className="text-white hover:text-gray-200 text-3xl font-bold bg-black bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {historialData?.loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                  <p className="text-xl text-gray-600">Cargando historial...</p>
                </div>
              ) : historialData?.error ? (
                <div className="text-center py-12">
                  <div className="text-red-500 text-6xl mb-4">❌</div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">Error al cargar historial</h3>
                  <p className="text-gray-600">{historialData.error}</p>
                </div>
              ) : historialData ? (
                <>
                  {/* Estadísticas principales */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{historialData.total_lecturas}</div>
                      <div className="text-blue-100 text-sm">Total Lecturas</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{historialData.periodo_horas}h</div>
                      <div className="text-green-100 text-sm">Período</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{historialData.lecturas_filtradas}</div>
                      <div className="text-purple-100 text-sm">Mostrando</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
                      <div className="text-sm font-bold">
                        {new Date(historialData.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-orange-100 text-sm">Actualizado</div>
                    </div>
                  </div>

                  {/* Lista de lecturas */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      📋 Últimas Lecturas ({historialData.datos?.length || 0} registros)
                    </h3>
                    
                    {historialData.datos && historialData.datos.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {historialData.datos.slice(-20).reverse().map((lectura, index) => {
                          const unidad = historialData.sensor === 'flujo' ? ' L/min' : ' %';
                          const esPar = index % 2 === 0;
                          const bgColor = esPar ? 'bg-white' : 'bg-gray-50';
                          
                          return (
                            <div key={lectura.id} className={`${bgColor} p-4 border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                  <div className="text-2xl font-bold text-blue-600">
                                    {lectura.valor}{unidad}
                                  </div>
                                  <div className="text-gray-600">
                                    Lectura #{historialData.datos.length - index}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {new Date(lectura.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-xl">No hay datos históricos disponibles</p>
                      </div>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={cerrarHistorial}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Cerrar Historial
                    </button>
                    <button
                      onClick={() => obtenerHistorial(historialVisible)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      🔄 Actualizar
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

