import React from 'react';
import SensorCard from '../components/SensorCard';
import Chart from '../components/Chart';

const Sensores = () => {
  const sensorData = [
    {
      title: 'Temperatura Principal',
      value: 24.5,
      unit: '°C',
      status: 'normal',
      icon: '🌡️',
      trend: 2.1,
      color: 'red'
    },
    {
      title: 'Temperatura Secundaria',
      value: 22.1,
      unit: '°C',
      status: 'normal',
      icon: '🌡️',
      trend: -0.3,
      color: 'red'
    },
    {
      title: 'Caudal Principal',
      value: 15.8,
      unit: 'L/min',
      status: 'normal',
      icon: '💧',
      trend: -0.5,
      color: 'blue'
    },
    {
      title: 'Caudal Secundario',
      value: 8.2,
      unit: 'L/min',
      status: 'normal',
      icon: '💧',
      trend: 1.2,
      color: 'blue'
    },
    {
      title: 'Presión Sistema',
      value: 2.3,
      unit: 'bar',
      status: 'warning',
      icon: '📊',
      trend: 5.2,
      color: 'yellow'
    },
    {
      title: 'Presión Reserva',
      value: 1.8,
      unit: 'bar',
      status: 'normal',
      icon: '📊',
      trend: -1.1,
      color: 'yellow'
    },
    {
      title: 'Nivel Tanque 1',
      value: 85,
      unit: '%',
      status: 'normal',
      icon: '🏊',
      trend: 1.2,
      color: 'green'
    },
    {
      title: 'Nivel Tanque 2',
      value: 72,
      unit: '%',
      status: 'normal',
      icon: '🏊',
      trend: -0.8,
      color: 'green'
    }
  ];

  const temperatureData = [
    { time: '00:00', value: 22.1 },
    { time: '04:00', value: 21.8 },
    { time: '08:00', value: 23.2 },
    { time: '12:00', value: 25.1 },
    { time: '16:00', value: 24.8 },
    { time: '20:00', value: 23.9 },
    { time: '24:00', value: 22.5 }
  ];

  const pressureData = [
    { time: '00:00', value: 2.1 },
    { time: '04:00', value: 2.0 },
    { time: '08:00', value: 2.2 },
    { time: '12:00', value: 2.4 },
    { time: '16:00', value: 2.3 },
    { time: '20:00', value: 2.2 },
    { time: '24:00', value: 2.1 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sensores del Sistema</h1>
        <p className="text-gray-600 mt-2">Monitoreo detallado de todos los sensores</p>
      </div>

      {/* Tarjetas de sensores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sensorData.map((sensor, index) => (
          <SensorCard key={index} {...sensor} />
        ))}
      </div>

      {/* Gráficas de tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          data={temperatureData}
          type="area"
          title="Tendencia de Temperatura"
          dataKey="value"
          color="#ef4444"
        />
        <Chart
          data={pressureData}
          type="line"
          title="Tendencia de Presión"
          dataKey="value"
          color="#f59e0b"
        />
      </div>

      {/* Tabla de datos históricos */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos Históricos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sensor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Actualización
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sensorData.map((sensor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{sensor.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{sensor.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {sensor.value} {sensor.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sensor.status === 'normal' ? 'bg-green-100 text-green-800' :
                      sensor.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sensor.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Hace 2 minutos
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sensores;
