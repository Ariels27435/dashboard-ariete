const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS ULTRA SIMPLE - PERMITE TODO
app.use(cors());
app.use(express.json());

// Datos en memoria
let datos = {
  humedad: 0,
  flujo: 0,
  nivel: 0
};

// 🆕 HISTORIAL de datos (últimas 1000 lecturas por sensor)
let historial = {
  humedad: [],
  flujo: [],
  nivel: []
};

// Función para agregar al historial
function agregarAlHistorial(tipo, valor) {
  const lectura = {
    valor: valor,
    timestamp: new Date(),
    id: Date.now() + Math.random()
  };
  
  historial[tipo].push(lectura);
  
  // Mantener solo las últimas 1000 lecturas
  if (historial[tipo].length > 1000) {
    historial[tipo] = historial[tipo].slice(-1000);
  }
}

// Rutas ESP32 (compatible con formato del ESP32)
app.post('/api/humedad', (req, res) => {
  const { humedad, valor } = req.body;
  const valorHumedad = humedad !== undefined ? humedad : valor;
  datos.humedad = valorHumedad || 0;
  
  // 🆕 Agregar al historial
  agregarAlHistorial('humedad', datos.humedad);
  
  console.log(`🌫️ Humedad: ${datos.humedad}%`);
  res.json({ 
    message: 'Humedad recibida correctamente',
    valor: datos.humedad,
    unidad: '%',
    historial: historial.humedad.length + ' lecturas guardadas'
  });
});

app.post('/api/flujo', (req, res) => {
  const { flujo, valor } = req.body;
  const valorFlujo = flujo !== undefined ? flujo : valor;
  datos.flujo = valorFlujo || 0;
  
  // 🆕 Agregar al historial
  agregarAlHistorial('flujo', datos.flujo);
  
  console.log(`💧 Flujo: ${datos.flujo} L/min`);
  res.json({ 
    message: 'Flujo recibido correctamente',
    valor: datos.flujo,
    unidad: 'L/min',
    historial: historial.flujo.length + ' lecturas guardadas'
  });
});

app.post('/api/nivel', (req, res) => {
  const { nivel, valor } = req.body;
  const valorNivel = nivel !== undefined ? nivel : valor;
  datos.nivel = valorNivel || 0;
  
  // 🆕 Agregar al historial
  agregarAlHistorial('nivel', datos.nivel);
  
  console.log(`🛢️ Nivel: ${datos.nivel}%`);
  res.json({ 
    message: 'Nivel recibido correctamente',
    valor: datos.nivel,
    unidad: '%',
    historial: historial.nivel.length + ' lecturas guardadas'
  });
});

// Ruta para obtener datos
app.get('/api/estado', (req, res) => {
  res.json({
    humedad: datos.humedad,
    flujo: datos.flujo,
    nivel: datos.nivel,
    timestamp: new Date()
  });
});

// 🆕 NUEVA RUTA: Obtener historial de un sensor específico
app.get('/api/historial/:sensor', (req, res) => {
  const { sensor } = req.params;
  const { limite = 50, horas = 24 } = req.query;
  
  if (!historial[sensor]) {
    return res.status(404).json({ 
      error: 'Sensor no encontrado',
      sensores_disponibles: ['humedad', 'flujo', 'nivel']
    });
  }
  
  // Filtrar por horas si se especifica
  const ahora = new Date();
  const limiteTiempo = new Date(ahora.getTime() - (horas * 60 * 60 * 1000));
  
  let datosFiltrados = historial[sensor].filter(lectura => 
    new Date(lectura.timestamp) >= limiteTiempo
  );
  
  // Limitar cantidad de resultados
  const limiteNum = parseInt(limite);
  if (limiteNum > 0) {
    datosFiltrados = datosFiltrados.slice(-limiteNum);
  }
  
  res.json({
    sensor: sensor,
    total_lecturas: historial[sensor].length,
    lecturas_filtradas: datosFiltrados.length,
    periodo_horas: horas,
    limite_resultados: limite,
    datos: datosFiltrados,
    timestamp: ahora
  });
});

// 🆕 NUEVA RUTA: Obtener estadísticas de un sensor
app.get('/api/estadisticas/:sensor', (req, res) => {
  const { sensor } = req.params;
  const { horas = 24 } = req.query;
  
  if (!historial[sensor]) {
    return res.status(404).json({ error: 'Sensor no encontrado' });
  }
  
  const ahora = new Date();
  const limiteTiempo = new Date(ahora.getTime() - (horas * 60 * 60 * 1000));
  
  const datosFiltrados = historial[sensor].filter(lectura => 
    new Date(lectura.timestamp) >= limiteTiempo
  );
  
  if (datosFiltrados.length === 0) {
    return res.json({
      sensor: sensor,
      periodo_horas: horas,
      total_lecturas: 0,
      estadisticas: {
        valor_actual: datos[sensor],
        valor_minimo: null,
        valor_maximo: null,
        valor_promedio: null,
        tendencia: 'sin_datos'
      }
    });
  }
  
  const valores = datosFiltrados.map(d => d.valor);
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
  
  // Calcular tendencia
  const primerosValores = valores.slice(0, Math.floor(valores.length / 2));
  const ultimosValores = valores.slice(Math.floor(valores.length / 2));
  const promedioPrimeros = primerosValores.reduce((a, b) => a + b, 0) / primerosValores.length;
  const promedioUltimos = ultimosValores.reduce((a, b) => a + b, 0) / ultimosValores.length;
  
  let tendencia = 'estable';
  if (promedioUltimos > promedioPrimeros * 1.1) tendencia = 'ascendente';
  if (promedioUltimos < promedioPrimeros * 0.9) tendencia = 'descendente';
  
  res.json({
    sensor: sensor,
    periodo_horas: horas,
    total_lecturas: datosFiltrados.length,
    estadisticas: {
      valor_actual: datos[sensor],
      valor_minimo: min,
      valor_maximo: max,
      valor_promedio: Math.round(promedio * 100) / 100,
      tendencia: tendencia
    },
    timestamp: ahora
  });
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor con historial funcionando',
    version: '2.0-historial',
    sensores: Object.keys(historial),
    total_lecturas: {
      humedad: historial.humedad.length,
      flujo: historial.flujo.length,
      nivel: historial.nivel.length
    }
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ULTRA-SIMPLE ejecutándose en puerto ${PORT}`);
  console.log(`🔥 Sistema ULTRA-SIMPLE activo - Sin MongoDB, datos en memoria`);
  console.log(`📊 Dashboard disponible en: http://localhost:${PORT}`);
  console.log(`✅ CORS configurado para permitir todos los orígenes`);
});


