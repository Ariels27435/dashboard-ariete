import React from 'react';
import Chart from '../components/Chart';

const Reportes = () => {
  const reportData = [
    { time: '00:00', temperatura: 22.1, presion: 2.1, caudal: 12.5 },
    { time: '04:00', temperatura: 21.8, presion: 2.0, caudal: 8.2 },
    { time: '08:00', temperatura: 23.2, presion: 2.2, caudal: 15.3 },
    { time: '12:00', temperatura: 25.1, presion: 2.4, caudal: 18.7 },
    { time: '16:00', temperatura: 24.8, presion: 2.3, caudal: 16.1 },
    { time: '20:00', temperatura: 23.9, presion: 2.2, caudal: 14.2 },
    { time: '24:00', temperatura: 22.5, presion: 2.1, caudal: 10.8 }
  ];

  const monthlyData = [
    { mes: 'Ene', consumo: 1200, eficiencia: 85 },
    { mes: 'Feb', consumo: 1350, eficiencia: 88 },
    { mes: 'Mar', consumo: 1180, eficiencia: 82 },
    { mes: 'Abr', consumo: 1420, eficiencia: 90 },
    { mes: 'May', consumo: 1380, eficiencia: 87 },
    { mes: 'Jun', consumo: 1500, eficiencia: 92 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
        <p className="text-gray-600 mt-2">Análisis detallado del rendimiento del sistema</p>
      </div>

      {/* Filtros de fecha */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros de Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
            <input type="date" className="input-field" defaultValue="2024-01-01" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
            <input type="date" className="input-field" defaultValue="2024-01-15" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Reporte</label>
            <select className="input-field">
              <option>Diario</option>
              <option>Semanal</option>
              <option>Mensual</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn-primary w-full">Generar Reporte</button>
          </div>
        </div>
      </div>

      {/* Gráficas de tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          data={reportData}
          type="line"
          title="Tendencia de Temperatura (24h)"
          dataKey="temperatura"
          color="#ef4444"
        />
        <Chart
          data={reportData}
          type="line"
          title="Tendencia de Presión (24h)"
          dataKey="presion"
          color="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          data={reportData}
          type="area"
          title="Consumo de Agua (24h)"
          dataKey="caudal"
          color="#3b82f6"
        />
        <Chart
          data={monthlyData}
          type="line"
          title="Eficiencia Mensual"
          dataKey="eficiencia"
          color="#10b981"
        />
      </div>

      {/* Resumen de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consumo Total</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">1,420 L</p>
            <p className="text-sm text-gray-500 mt-2">Últimas 24 horas</p>
            <div className="mt-4">
              <span className="text-green-600 text-sm">↗️ +5.2%</span>
              <span className="text-gray-500 text-sm ml-2">vs día anterior</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Eficiencia Promedio</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">87.3%</p>
            <p className="text-sm text-gray-500 mt-2">Último mes</p>
            <div className="mt-4">
              <span className="text-green-600 text-sm">↗️ +2.1%</span>
              <span className="text-gray-500 text-sm ml-2">vs mes anterior</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas Generadas</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">12</p>
            <p className="text-sm text-gray-500 mt-2">Última semana</p>
            <div className="mt-4">
              <span className="text-red-600 text-sm">↘️ -15%</span>
              <span className="text-gray-500 text-sm ml-2">vs semana anterior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de datos detallados */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos Detallados</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperatura (°C)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Presión (bar)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Caudal (L/min)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.temperatura}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.presion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.caudal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Normal
                    </span>
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

export default Reportes;
