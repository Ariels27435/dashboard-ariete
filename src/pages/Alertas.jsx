import React from 'react';

const Alertas = () => {
  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Presión Crítica',
      message: 'La presión del sistema ha alcanzado niveles peligrosos. Se requiere intervención inmediata.',
      timestamp: '2024-01-15 14:30:25',
      sensor: 'Presión Sistema',
      priority: 'Alta',
      status: 'Activa'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Temperatura Elevada',
      message: 'La temperatura del sistema está por encima del rango normal recomendado.',
      timestamp: '2024-01-15 13:45:12',
      sensor: 'Temperatura Principal',
      priority: 'Media',
      status: 'Activa'
    },
    {
      id: 3,
      type: 'info',
      title: 'Mantenimiento Programado',
      message: 'Revisión de válvulas programada para el próximo martes a las 9:00 AM.',
      timestamp: '2024-01-15 10:15:30',
      sensor: 'Sistema General',
      priority: 'Baja',
      status: 'Pendiente'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Nivel de Agua Bajo',
      message: 'El nivel del tanque principal está por debajo del 20%. Considerar recarga.',
      timestamp: '2024-01-15 09:20:45',
      sensor: 'Nivel Tanque 1',
      priority: 'Media',
      status: 'Resuelta'
    },
    {
      id: 5,
      type: 'error',
      title: 'Falla de Válvula',
      message: 'La válvula principal no responde a los comandos de apertura.',
      timestamp: '2024-01-14 16:30:15',
      sensor: 'Válvula Principal',
      priority: 'Alta',
      status: 'Resuelta'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activa': return 'bg-red-100 text-red-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Resuelta': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'Activa');
  const highPriorityAlerts = alerts.filter(alert => alert.priority === 'Alta');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Centro de Alertas</h1>
        <p className="text-gray-600 mt-2">Monitoreo y gestión de alertas del sistema</p>
      </div>

      {/* Estadísticas de alertas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚨</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Alertas Activas</p>
              <p className="text-2xl font-bold text-red-600">{activeAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Alta Prioridad</p>
              <p className="text-2xl font-bold text-yellow-600">{highPriorityAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resueltas Hoy</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Alertas</p>
              <p className="text-2xl font-bold text-blue-600">{alerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de alertas */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(alert.priority)}`}>
                      {alert.priority}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📡 {alert.sensor}</span>
                    <span>🕒 {alert.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {alert.status === 'Activa' && (
                  <button className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-md hover:bg-green-200">
                    Resolver
                  </button>
                )}
                <button className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alertas;
