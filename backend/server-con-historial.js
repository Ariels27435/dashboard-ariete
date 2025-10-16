const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configurado
app.use(cors());
app.use(express.json());

// Datos actuales en memoria
let datosActuales = {
  humedad: 0,
  flujo: 0,
  nivel: 0,
  timestamp: new Date()
};

// Historial de datos (últimas 1000 lecturas por sensor)
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
    id: Date.now() + Math.random() // ID único
  };
  
  historial[tipo].push(lectura);
  
  // Mantener solo las últimas 1000 lecturas
  if (historial[tipo].length > 1000) {
    historial[tipo] = historial[tipo].slice(-1000);
  }
  
  // Actualizar datos actuales
  datosActuales[tipo] = valor;
  datosActuales.timestamp = lectura.timestamp;
}

// Rutas ESP32 (compatible con formato del ESP32)
app.post('/api/humedad', (req, res) => {
  const { humedad, valor } = req.body;
  const valorHumedad = humedad !== undefined ? humedad : valor;
  const humedadFinal = valorHumedad || 0;
  
  agregarAlHistorial('humedad', humedadFinal);
  
  console.log(`🌫️ Humedad: ${humedadFinal}%`);
  res.json({ 
    message: 'Humedad recibida correctamente',
    valor: humedadFinal,
    unidad: '%',
    historial: historial.humedad.length + ' lecturas guardadas'
  });
});

app.post('/api/flujo', (req, res) => {
  const { flujo, valor } = req.body;
  const valorFlujo = flujo !== undefined ? flujo : valor;
  const flujoFinal = valorFlujo || 0;
  
  agregarAlHistorial('flujo', flujoFinal);
  
  console.log(`💧 Flujo: ${flujoFinal} L/min`);
  res.json({ 
    message: 'Flujo recibido correctamente',
    valor: flujoFinal,
    unidad: 'L/min',
    historial: historial.flujo.length + ' lecturas guardadas'
  });
});

app.post('/api/nivel', (req, res) => {
  const { nivel, valor } = req.body;
  const valorNivel = nivel !== undefined ? nivel : valor;
  const nivelFinal = valorNivel || 0;
  
  agregarAlHistorial('nivel', nivelFinal);
  
  console.log(`🛢️ Nivel: ${nivelFinal}%`);
  res.json({ 
    message: 'Nivel recibido correctamente',
    valor: nivelFinal,
    unidad: '%',
    historial: historial.nivel.length + ' lecturas guardadas'
  });
});

// Ruta para obtener datos actuales
app.get('/api/estado', (req, res) => {
  res.json({
    humedad: datosActuales.humedad,
    flujo: datosActuales.flujo,
    nivel: datosActuales.nivel,
    timestamp: datosActuales.timestamp,
    historial: {
      humedad: historial.humedad.length,
      flujo: historial.flujo.length,
      nivel: historial.nivel.length
    }
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
        valor_actual: datosActuales[sensor],
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
      valor_actual: datosActuales[sensor],
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
  console.log(`🚀 Servidor CON HISTORIAL ejecutándose en puerto ${PORT}`);
  console.log(`📊 Dashboard disponible en: http://localhost:${PORT}`);
  console.log(`✅ CORS configurado para permitir todos los orígenes`);
  console.log(`📈 Historial habilitado - Máximo 1000 lecturas por sensor`);
  console.log(`🆕 Nuevos endpoints:`);
  console.log(`   GET /api/historial/:sensor?limite=50&horas=24`);
  console.log(`   GET /api/estadisticas/:sensor?horas=24`);
});
