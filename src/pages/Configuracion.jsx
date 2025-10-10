import React, { useState } from 'react';

const Configuracion = () => {
  const [settings, setSettings] = useState({
    systemName: 'Ariete Hidráulico',
    maxTemperature: 30,
    minTemperature: 15,
    maxPressure: 3.0,
    minPressure: 1.5,
    alertEmail: 'admin@ariete.com',
    dataRetention: 30,
    autoBackup: true,
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    // Aquí se guardarían los cambios en la API
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
        <p className="text-gray-600 mt-2">Ajusta los parámetros y configuraciones del sistema</p>
      </div>

      {/* Configuración General */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuración General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Sistema
            </label>
            <input
              type="text"
              value={settings.systemName}
              onChange={(e) => handleInputChange('systemName', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email de Alertas
            </label>
            <input
              type="email"
              value={settings.alertEmail}
              onChange={(e) => handleInputChange('alertEmail', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retención de Datos (días)
            </label>
            <input
              type="number"
              value={settings.dataRetention}
              onChange={(e) => handleInputChange('dataRetention', parseInt(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoBackup"
              checked={settings.autoBackup}
              onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="autoBackup" className="ml-2 block text-sm text-gray-900">
              Respaldo Automático
            </label>
          </div>
        </div>
      </div>

      {/* Límites del Sistema */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Límites del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">Temperatura</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Máxima (°C)
                </label>
                <input
                  type="number"
                  value={settings.maxTemperature}
                  onChange={(e) => handleInputChange('maxTemperature', parseFloat(e.target.value))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mínima (°C)
                </label>
                <input
                  type="number"
                  value={settings.minTemperature}
                  onChange={(e) => handleInputChange('minTemperature', parseFloat(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">Presión</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Máxima (bar)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.maxPressure}
                  onChange={(e) => handleInputChange('maxPressure', parseFloat(e.target.value))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mínima (bar)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.minPressure}
                  onChange={(e) => handleInputChange('minPressure', parseFloat(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuración de Notificaciones</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Notificaciones por Email</h4>
              <p className="text-sm text-gray-500">Recibir alertas por correo electrónico</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => handleNotificationChange('email', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Notificaciones SMS</h4>
              <p className="text-sm text-gray-500">Recibir alertas por mensaje de texto</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.sms}
              onChange={(e) => handleNotificationChange('sms', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Notificaciones Push</h4>
              <p className="text-sm text-gray-500">Recibir notificaciones en el navegador</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) => handleNotificationChange('push', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Información del Sistema */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Información del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Versión del Software</h4>
            <p className="text-sm text-gray-900">v1.0.0</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Última Actualización</h4>
            <p className="text-sm text-gray-900">15 de Enero, 2024</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Estado del Servidor</h4>
            <p className="text-sm text-green-600">🟢 En Línea</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Uptime</h4>
            <p className="text-sm text-gray-900">15 días, 3 horas</p>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4">
        <button className="btn-secondary">
          Restaurar Valores por Defecto
        </button>
        <button onClick={handleSave} className="btn-primary">
          Guardar Configuración
        </button>
      </div>
    </div>
  );
};

export default Configuracion;
