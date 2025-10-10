import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Sensores', path: '/sensores', icon: '🌡️' },
    { name: 'Usuarios', path: '/usuarios', icon: '👥' },
    { name: 'Alertas', path: '/alertas', icon: '⚠️' },
    { name: 'Reportes', path: '/reportes', icon: '📈' },
    { name: 'Configuración', path: '/configuracion', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">Ariete Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Sistema de Monitoreo Hidráulico</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
