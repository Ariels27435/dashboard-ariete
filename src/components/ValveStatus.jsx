import React from 'react';

const ValveStatus = ({ valves }) => {
  const getValveStatus = (isOpen) => {
    return isOpen ? 'Abierta' : 'Cerrada';
  };

  const getValveColor = (isOpen) => {
    return isOpen ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getValveIcon = (isOpen) => {
    return isOpen ? '🔓' : '🔒';
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Válvulas</h3>
      <div className="space-y-3">
        {valves.map((valve, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-xl">{getValveIcon(valve.isOpen)}</span>
              <div>
                <p className="font-medium text-gray-900">{valve.name}</p>
                <p className="text-sm text-gray-500">{valve.location}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getValveColor(valve.isOpen)}`}>
              {getValveStatus(valve.isOpen)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValveStatus;
