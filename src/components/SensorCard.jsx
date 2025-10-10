import React from 'react';

const SensorCard = ({ title, value, unit, status, icon, trend, color }) => {
  const statusColor = status === 'warning' ? 'border-yellow-400 bg-yellow-50' : 'border-green-400 bg-white';
  const textColor = status === 'warning' ? 'text-yellow-600' : 'text-green-600';

  return (
    <div
      className={`p-4 rounded-xl shadow-md border-l-4 ${statusColor} transition-all duration-300 hover:shadow-lg`}
      title={`Última lectura: ${value} ${unit}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-4xl">{icon}</div>
        <div className={`text-sm font-semibold ${textColor}`}>{status.toUpperCase()}</div>
      </div>

      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-3xl font-semibold text-gray-900">
        {value} <span className="text-lg text-gray-500">{unit}</span>
      </p>

      {/* Barra de progreso para valores porcentuales */}
      {unit === '%' && typeof value === 'number' && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className={`h-2 rounded-full bg-${color}-500`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SensorCard;
