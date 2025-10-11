import axios from 'axios';

// Configuración base de la API
// En producción, Vite reemplaza import.meta.env.VITE_API_URL con el valor de la variable de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Servicios de sensores
export const sensorService = {
  getAll: async () => {
    const response = await api.get('/sensores');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/sensores/${id}`);
    return response.data;
  },

  getReadings: async (sensorId, params = {}) => {
    const response = await api.get(`/sensores/${sensorId}/lecturas`, { params });
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/sensores/${id}/status`, { status });
    return response.data;
  }
};

// Servicios de alertas
export const alertService = {
  getAll: async (params = {}) => {
    const response = await api.get('/alertas', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/alertas/${id}`);
    return response.data;
  },

  markAsResolved: async (id) => {
    const response = await api.patch(`/alertas/${id}/resolve`);
    return response.data;
  },

  create: async (alertData) => {
    const response = await api.post('/alertas', alertData);
    return response.data;
  }
};

// Servicios de usuarios
export const userService = {
  getAll: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post('/usuarios', userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  }
};

// Servicios de reportes
export const reportService = {
  getDashboardData: async () => {
    const response = await api.get('/reportes/dashboard');
    return response.data;
  },

  getSensorData: async (params = {}) => {
    const response = await api.get('/reportes/sensores', { params });
    return response.data;
  },

  getConsumptionReport: async (params = {}) => {
    const response = await api.get('/reportes/consumo', { params });
    return response.data;
  },

  exportReport: async (type, params = {}) => {
    const response = await api.get(`/reportes/export/${type}`, { 
      params,
      responseType: 'blob'
    });
    return response.data;
  }
};

// Servicios de configuración
export const configService = {
  get: async () => {
    const response = await api.get('/configuracion');
    return response.data;
  },

  update: async (configData) => {
    const response = await api.put('/configuracion', configData);
    return response.data;
  },

  reset: async () => {
    const response = await api.post('/configuracion/reset');
    return response.data;
  }
};

export default api;
