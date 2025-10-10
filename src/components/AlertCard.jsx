import React from 'react';

const AlertCard = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '🚨';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'warning': return 'text-yellow-800';
      case 'error': return 'text-red-800';
      case 'info': return 'text-blue-800';
      default: return 'text-gray-800';
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas del Sistema</h3>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <span className="text-4xl mb-2 block">✅</span>
            <p>No hay alertas activas</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-xl">{getAlertIcon(alert.type)}</span>
                <div className="flex-1">
                  <p className={`font-medium ${getTextColor(alert.type)}`}>
                    {alert.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertCard;
