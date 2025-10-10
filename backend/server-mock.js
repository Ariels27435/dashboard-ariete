const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Datos simulados
const mockData = {
  usuarios: [
    {
      id: 1,
      nombre: 'Administrador',
      email: 'admin@ariete.com',
      rol: 'admin',
      estado: 'activo',
      ultimoAcceso: new Date()
    }
  ],
  sensores: [
    {
      id: 1,
      nombre: 'Temperatura Principal',
      tipo: 'temperatura',
      ubicacion: 'Tanque Principal',
      unidad: '°C',
      estado: 'activo',
      ultimaLectura: { valor: 24.5, timestamp: new Date() }
    },
    {
      id: 2,
      nombre: 'Presión Sistema',
      tipo: 'presion',
      ubicacion: 'Línea Principal',
      unidad: 'bar',
      estado: 'activo',
      ultimaLectura: { valor: 2.3, timestamp: new Date() }
    },
    {
      id: 3,
      nombre: 'Caudal Principal',
      tipo: 'caudal',
      ubicacion: 'Entrada Principal',
      unidad: 'L/min',
      estado: 'activo',
      ultimaLectura: { valor: 15.8, timestamp: new Date() }
    },
    {
      id: 4,
      nombre: 'Nivel Tanque 1',
      tipo: 'nivel',
      ubicacion: 'Tanque de Almacenamiento',
      unidad: '%',
      estado: 'activo',
      ultimaLectura: { valor: 85, timestamp: new Date() }
    }
  ],
  alertas: [
    {
      id: 1,
      tipo: 'warning',
      titulo: 'Presión Elevada',
      mensaje: 'La presión del sistema está por encima del umbral recomendado',
      prioridad: 'media',
      estado: 'activa',
      timestamp: new Date()
    },
    {
      id: 2,
      tipo: 'info',
      titulo: 'Mantenimiento Programado',
      mensaje: 'Revisión de válvulas programada para el próximo martes',
      prioridad: 'baja',
      estado: 'activa',
      timestamp: new Date()
    }
  ]
};

// Rutas simuladas
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@ariete.com' && password === 'admin123') {
    res.json({
      message: 'Login exitoso',
      token: 'mock-jwt-token',
      usuario: mockData.usuarios[0]
    });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

app.get('/api/sensores', (req, res) => {
  res.json(mockData.sensores);
});

app.get('/api/alertas', (req, res) => {
  res.json(mockData.alertas);
});

app.get('/api/usuarios', (req, res) => {
  res.json(mockData.usuarios);
});

app.get('/api/reportes/dashboard', (req, res) => {
  res.json({
    sensores: mockData.sensores.map(sensor => ({
      sensor: sensor.nombre,
      tipo: sensor.tipo,
      valor: sensor.ultimaLectura.valor,
      unidad: sensor.unidad,
      timestamp: sensor.ultimaLectura.timestamp
    })),
    alertas: {
      activas: mockData.alertas.filter(a => a.estado === 'activa').length,
      hoy: mockData.alertas.length
    },
    timestamp: new Date()
  });
});

app.get('/api/configuracion', (req, res) => {
  res.json({
    nombreSistema: 'Ariete Hidráulico',
    limites: {
      temperatura: { minima: 15, maxima: 30 },
      presion: { minima: 1.5, maxima: 3.0 },
      caudal: { minimo: 5, maximo: 20 },
      nivel: { minimo: 20, maximo: 95 }
    }
  });
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente (Modo Simulado)',
    timestamp: new Date().toISOString(),
    mode: 'MOCK_DATA'
  });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor MOCK ejecutándose en puerto ${PORT}`);
  console.log(`📊 Dashboard disponible en: http://localhost:${PORT}`);
  console.log(`🔧 Modo: Datos simulados (sin MongoDB)`);
  console.log(`\n🌐 Enlaces de acceso:`);
  console.log(`   Frontend: http://localhost:5173`);
  console.log(`   Backend:  http://localhost:${PORT}`);
  console.log(`   Health:   http://localhost:${PORT}/api/health`);
  console.log(`\n🔑 Credenciales:`);
  console.log(`   Email: admin@ariete.com`);
  console.log(`   Password: admin123`);
});
