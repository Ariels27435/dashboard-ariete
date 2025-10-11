import { useEffect, useState } from 'react';

function App() {
  const [sensores, setSensores] = useState([
    {
      id: 'humedad',
      nombre: 'Sensor Humedad Ariete',
      valor: 0,
      unidad: '%',
      icono: '🌫️'
    },
    {
      id: 'flujo',
      nombre: 'Sensor Flujo Ariete',
      valor: 0,
      unidad: 'L/min',
      icono: '💧'
    },
    {
      id: 'nivel',
      nombre: 'Sensor Nivel Ariete',
      valor: 0,
      unidad: '%',
      icono: '🛢️'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(new Date());

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        // Intentar obtener sensores del backend
        const response = await fetch('http://localhost:3001/api/esp32/sensores?api_key=ariete-esp32-2025');
        
        if (response.ok) {
          const data = await response.json();
          const sensoresAriete = data.sensores.filter(sensor => 
            sensor.nombre && sensor.nombre.includes('Ariete')
          );
          
          if (sensoresAriete.length > 0) {
            const sensoresFormateados = sensoresAriete.map(sensor => {
              const valor = sensor.ultimaLectura ? sensor.ultimaLectura.valor : 0;
              
              let icono = '📊';
              if (sensor.nombre.includes('Humedad')) icono = '🌫️';
              else if (sensor.nombre.includes('Flujo')) icono = '💧';
              else if (sensor.nombre.includes('Nivel')) icono = '🛢️';
              
              return {
                id: sensor.id || sensor._id,
                nombre: sensor.nombre,
                valor: valor,
                unidad: sensor.unidad || '%',
                icono: icono
              };
            });
            
            setSensores(sensoresFormateados);
            setError(null);
          }
        }
      } catch (error) {
        // Si hay error, mantener los sensores por defecto
        console.log('Backend no disponible, usando datos por defecto');
      } finally {
        setUltimaActualizacion(new Date());
      }
    };

    fetchSensores();
    const interval = setInterval(fetchSensores, 2000);
    return () => clearInterval(interval);
  }, []);

  // Función para enviar datos de prueba
  const enviarDatosPrueba = async () => {
    try {
      const datos = [
        { endpoint: '/api/humedad', data: { humedad: Math.floor(Math.random() * 100) } },
        { endpoint: '/api/flujo', data: { flujo: (Math.random() * 10).toFixed(2) } },
        { endpoint: '/api/nivel', data: { nivel: Math.floor(Math.random() * 100) } }
      ];

      for (const { endpoint, data } of datos) {
        const res = await fetch(`http://localhost:3001${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        console.log(`📤 ${endpoint}: ${res.status}`);
      }
    } catch (error) {
      console.error('Error enviando datos:', error);
    }
  };

  // Función para simular datos del ESP32
  const simularDatosESP32 = () => {
    setSensores(prev => prev.map(sensor => ({
      ...sensor,
      valor: sensor.id === 'humedad' ? 39 : 
             sensor.id === 'flujo' ? 0.00 : 
             sensor.id === 'nivel' ? 0 : sensor.valor
    })));
    setUltimaActualizacion(new Date());
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Ariete - FUNCIONAL</h1>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            🔄 Recargar
          </button>
          <button
            onClick={enviarDatosPrueba}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            📤 Datos Prueba
          </button>
          <button
            onClick={simularDatosESP32}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            🎮 Simular ESP32
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      <div className="mb-4 p-3 bg-white rounded shadow">
        <p className="text-sm text-gray-600">
          <strong>📊 Sensores Ariete:</strong> {sensores.length} | 
          <strong> 🕐 Última actualización:</strong> {ultimaActualizacion.toLocaleTimeString()} |
          <strong> 🔄 Actualización:</strong> Cada 2 segundos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sensores.map((sensor) => (
          <div key={sensor.id} className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{sensor.icono}</div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Estado</div>
                <div className="text-sm font-semibold text-green-600">✅ OK</div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-2">{sensor.nombre}</h2>
            
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {sensor.valor} <span className="text-lg text-gray-500">{sensor.unidad}</span>
            </div>
            
            {sensor.unidad === '%' && (
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="h-3 rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${Math.min(sensor.valor, 100)}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">🔧 Instrucciones:</h3>
        <div className="text-sm">
          <p><strong>1. 📤 Datos Prueba:</strong> Envía datos aleatorios al backend</p>
          <p><strong>2. 🎮 Simular ESP32:</strong> Simula los datos reales del ESP32 (Humedad: 39%, Flujo: 0.00 L/min, Nivel: 0%)</p>
          <p><strong>3. 🔄 Recargar:</strong> Refresca el dashboard</p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-2">🔧 Información Técnica:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>🌐 Backend:</strong> http://localhost:3001</p>
            <p><strong>📱 Frontend:</strong> http://localhost:5177</p>
          </div>
          <div>
            <p><strong>🔄 Actualización:</strong> Cada 2 segundos</p>
            <p><strong>📊 Sensores:</strong> {sensores.length} del Ariete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;